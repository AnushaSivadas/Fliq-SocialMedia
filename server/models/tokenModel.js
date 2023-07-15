import mongoose from "mongoose";
var ObjectId=mongoose.ObjectId


const TokenSchema = new mongoose.Schema(
  {
   userId:{
    type:ObjectId,
    required:true,
    ref:"userModel",
    unique:true,
   },
   token:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:3600
   }
  },
//   {
//     timestamps: true,
//   }
);

const TokenModel = mongoose.model("Token", TokenSchema);
export default TokenModel;
