import { ErrorResponse } from "../utils/errorResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, _, next) => {
   
    if (!req.user) {
        throw new ErrorResponse(401, "User authentication required");
    }

  
    if (req.user.role !== "admin") {
        throw new ErrorResponse(403, "Administrator privileges required");
    }

    next();
});