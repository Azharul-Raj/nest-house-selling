import * as Jwt from 'jsonwebtoken'

export const getToken=async(email:string)=>{
    const token=await Jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1h"})
    return token;
}