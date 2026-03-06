import connectDb from "../../../../lib/BitTreeDb"
import User from "../../../../models/bitTreeSchema.js"

export async function GET(req,{params}){
    const {username} = await params;
    await connectDb();
 const userData = await User.findOne({username:username});
 console.log("Get request is just hit!")
 return Response.json(userData)
 
}