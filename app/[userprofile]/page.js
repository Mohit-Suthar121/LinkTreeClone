"use client"
import Image from 'next/image';
import React, { useEffect, useState,use } from 'react';
import LinkButtons from '../../components/LinkButtons';

const Page = ({ params }) => {

    const { userprofile } =  use(params);
    const [userData,setUserData] = useState({
        username:"",
        imageurl:"",
        description:"",
        links:[ ]
    });


    async function fetchData(){
        const res = await fetch(`/api/getdata/${userprofile}`);
        const data = await res.json();
        console.log("The data which came from the backend is: ",data)
        setUserData(data);
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className='w-full min-h-screen pt-16 pb-10 bg-[#9800ff] bg-gradient-to-b from-[#9800ff] to-[#7a00cc] flex justify-center px-4'>
            
            {/* Main Card Container */}
            <div className="profilesection w-full max-w-md h-fit flex flex-col items-center gap-8 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                
                {/* Profile Header */}
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className="profilepicture w-32 h-32 rounded-full border-4 border-[#ff00df] overflow-hidden shadow-lg transform transition hover:scale-105">
                       {userData?.imageurl && (<Image 
                            width={128} 
                            height={128} 
                            src={userData.imageurl } 
                            alt="Profile"
                            className="object-cover w-full h-full" 
                        />)}
                    </div>
                    <div className="text-center">
                        <h1 className="username font-black tracking-tighter text-3xl text-white">
                            @{userData?.username}
                        </h1>
                        <p className="text-[#d79cff] font-medium uppercase text-xs tracking-widest mt-1">Digital Creator</p>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="description text-center px-2">
                    <p className="text-white/90 leading-relaxed text-sm">
                        {userData?.description}
                    </p>
                </div>

                {/* Raw Link Buttons */}
                <div className="links w-full flex flex-col gap-4 h-62.5 link-container scrollbar-thumb-[#ff00df]/80 hover:scrollbar-thumb-[#ff00df] overflow-y-auto mb-10">
                {userData?.links.map((link,index)=>(
                    <LinkButtons key={index} linkText={link?.linkText} linkUrl={link?.linkUrl} />
                ))}
                </div>
            </div>
        </div>
    );
}

export default Page;