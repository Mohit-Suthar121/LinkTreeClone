import User from '@/models/bitTreeSchema.js'
import connectDb from '../../../lib/BitTreeDb';
export async function POST(req){
    try{
        const data =  await req.json();
        console.log("Data received successfully and the data is: ",data);
        await connectDb();

        const toAddData = new User({
            username:data.username,
            links:data.links,
            imageurl:data.imageurl,
            description:data.description,
        })
        await toAddData.save();
        return Response.json({
            message:"Data received and saved Successfully!",data:toAddData
        })

    }
    catch(error){
        return Response.json({
            error:"Something went wrong"
        })
    }
}