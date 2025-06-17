import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt  from "jsonwebtoken";

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'customer', 'seller'], 
        default: 'customer', 
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please use a valid phone number'],
      },
    password:{
        type: String,
        required: [true, "password is required"],
        minlength: 8,
    },   
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      },
    fullname:{
        type: String,
        trim: true, 
        index: true 
    },
    avatar:{
        type: String,
        required: true,
        default: "http://linkToUpdate"
    },
    orderHistory: [
     {
          type: Schema.Types.ObjectId,
          ref: "Order"
      }
  ], 
    refreshToken:{
        type: String,
    }
},
{
    timestamps: true
})


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
      } catch (err) {
        next(err); 
      }
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){

  return jwt.sign({
      _id:  this._id,
      email: this.email,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateRefreshToken = function(){

    return jwt.sign({
        _id:  this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      )
  }

export const User = mongoose.model("User", userSchema)