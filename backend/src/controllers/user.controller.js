import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { apiResponse } from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import fs from 'fs';


const isProduction = process.env.NODE_ENV === "production";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = jwt.sign(
            { _id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
        );

        const refreshToken = jwt.sign(
            { _id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
        );

        // Save refresh token to user document
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(`Token generation failed: ${error.message}`);
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { email, phoneNumber, fullname, password, role } = req.body;
    
    // Validate required fields
    if ([fullname, email, password, role, phoneNumber].some((field) => field?.trim() === "")) {
        throw new ErrorResponse(400, "All fields are required");
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ email }, { phoneNumber }]
    });

    if (existedUser) {
        throw new ErrorResponse(409, "User with same email or phone number already exists!");
    }

    // Create new user
    const user = await User.create({
        fullname,
        email,
        password,
        phoneNumber,
        role
    });

    // Return user data without sensitive information
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ErrorResponse(500, "Something went wrong while registering a user");
    }

    return res
        .status(201)
        .json(new apiResponse(201, createdUser, "User registered successfully"));
});




const loginUser = asyncHandler(async (req, res) => {
    const { email, phoneNumber, password } = req.body;
    
    // Validation
    if (!email && !phoneNumber) {
        throw new ErrorResponse(400, "Email or phone number is required");
    }
    
    if (!password) {
        throw new ErrorResponse(400, "Password is required");
    }
    
    // Find user
    const user = await User.findOne({
        $or: [{ phoneNumber }, { email }]
    }).select('+password'); // Include password field for verification

    if (!user) {
        throw new ErrorResponse(404, "User not found with provided credentials");
    }

    // Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ErrorResponse(401, "Invalid credentials");
    }

    try {
        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        
        // Get user without sensitive data
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        // Cookie options
        const isProduction = process.env.NODE_ENV === 'production';
        const options = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            domain: isProduction ? process.env.COOKIE_DOMAIN : undefined
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new apiResponse(200, { 
                    user: loggedInUser, 
                    accessToken, 
                    refreshToken 
                }, "User logged in successfully")
            );
    } catch (error) {
        throw new ErrorResponse(500, `Login failed: ${error.message}`);
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: isProduction,  
        sameSite: isProduction ? "lax" : "strict", 
        domain: isProduction ? ".satyamcodes.online" : undefined, 
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new apiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new apiResponse(200, req.user, "Current user fetched successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!incomingRefreshToken) {
        throw new ErrorResponse(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ErrorResponse(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ErrorResponse(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: isProduction,  
            sameSite: isProduction ? "lax" : "strict", 
            domain: isProduction ? ".satyamcodes.online" : undefined, 
        };

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);
        
        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new apiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        throw new ErrorResponse(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ErrorResponse(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new apiResponse(200, {}, "Password changed successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;

    if (!fullname || !email) {
        throw new ErrorResponse(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new apiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    
    if (!avatarLocalPath) {
        throw new ErrorResponse(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        fs.unlinkSync(avatarLocalPath);
        throw new ErrorResponse(400, "Error while uploading avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password");

    return res
        .status(200)
        .json(new apiResponse(200, user, "Avatar updated successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    changeCurrentPassword
};