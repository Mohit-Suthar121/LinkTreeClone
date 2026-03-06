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
        if(error.code==11000){
            console.log("yes it's an unique username error!")
            return Response.json({error:"Username has to be unique"},{status:409})
        }
        else if(error.name == "ValidationError"){
            return Response.json({error:"Please fill required Fields"},{status:400})
        }
        return Response.json({
            error:"Something went wrong"
        },{status:500})
    }
}