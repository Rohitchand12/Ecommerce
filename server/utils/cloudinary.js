import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pLimit from "p-limit";

dotenv.config();

const limit = pLimit(10);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export async function uploadMultipleOnCloudinary(localFilePaths) { // receiving multiple paths of images
  try {
    console.log("from cloudinary = ", localFilePaths);
    if (!localFilePaths){
      console.log("inside !localFilePaths");
      return null;
    } 

    const pathsToUpload = localFilePaths.map((path)=>{
      return limit(async()=>{
        let response;
        try{
          response = await cloudinary.uploader.upload(path,{resource_type:"auto"})
          fs.unlinkSync(path);
        }catch(e){
          console.log("error uploading images");
          console.log(e);
        }
        return response;
      })
    })
    const uploads = await Promise.all(pathsToUpload);
    console.log('files uploaded on cloudinary')
    return uploads
  } catch (e) {
    console.log("inside catch in cloudinary");
    localFilePaths.map(path=>fs.unlinkSync(path));
    return null;
  }
}

export async function uploadSingleOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;

    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto",
      }
    );
    fs.unlinkSync(localFilePath); //removes the locally saved temperory file 
    console.log('file uploaded on cloudinary')
    return response;
  } catch (e) {
    fs.unlinkSync(localFilePath); //removes the locally saved temperory file 
    return null;
  }
}

