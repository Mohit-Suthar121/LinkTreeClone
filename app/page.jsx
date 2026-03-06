"use client"
import Image from "next/image";
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'
import LinkInput from '@/components/LinkInput'
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();
  function handleChange(e){
      setUserData(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  function handleNewLink(e){
    const newLink = {
        id:crypto.randomUUID(),
        linkText:"",
        linkUrl:""
      }
      setUserData(prev=>({...prev,links:[...prev.links,newLink]}))
  }



  async function handleSave(){
    console.log(userData)
    const res = await fetch("/api/savedata",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(userData)
    })

    const result = await res.json();
    console.log("Response received from the backend: ",result)
    console.log("The id of the data is: ",result.data._id)
    // const res2 = await fetch(`/api/getdata/${result.data._id}`)
    // const result2 = await res2.json();
    // console.log("the data from res2 ,  from api/getdata/userid: ",result2)
    router.push(`/${userData.username}`)
  }



  function updateLink(userid,name,value){ 
    setUserData(prev=>({...prev,links: prev.links.map(item=>(
      item.id===userid?{...item,[name]:value}:item
    ))}))
  }

  const [userData,setUserData] = useState(
    {
      username:"",
      imageurl:"",
      description:"",
      links:[]
    }
  )

  return (
    <div className=" relative w-full   flex justify-between">


      <Navbar />

      <div className="min-h-screen maincontainer p-5 flex w-[50%]   pt-60">

        <div className=" flex items-center justify-center p-6  w-full">
          <div className="createBittree flex flex-col gap-8 bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl w-full max-w-2xl border-2 border-black/5">

            <header className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Create your Bittree</h1>
              <p className="text-slate-500 font-medium">Set up your digital ecosystem in three simple steps.</p>
            </header>

            <div className="steps flex flex-col gap-10">

              <div className="step1 flex flex-col gap-3">
                <label className="heading text-lg font-bold flex items-center gap-2 text-slate-800">
                  <span className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-sm">1</span>
                  Claim your Handle
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">bittree.com/</span>
                  <input
                  value={userData.username}
                  onChange={handleChange}
                  name="username"
                    placeholder="sumitAgarwal"
                    className="w-full border-2 border-slate-100 bg-slate-50 p-4 pl-32 h-14 rounded-2xl focus:border-[#ffaa00] focus:ring-0 transition-all outline-none"
                    type="text"
                  />
                </div>
              </div>

              <div className="step2 flex flex-col gap-3">
                <label className="heading text-lg font-bold flex items-center gap-2 text-slate-800">
                  <span className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-sm">2</span>
                  Add Links
                </label>

                <div className="link-container flex flex-col gap-4 h-64 overflow-y-auto 
                  bg-slate-50/50 border-2 border-slate-100 p-4 rounded-2xl
                  shadow-inner transition-all
                  scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">

                  {userData.links.map((link,index) => (
                    <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <LinkInput onChange={updateLink} link={link} />
                    </div>
                  ))}

                  {userData.links.length === 0 && (
                    <p className="text-slate-400 text-sm text-center my-auto italic">
                      No links added yet. Click below to start!
                    </p>
                  )}
                </div>
                <button onClick={handleNewLink} className="w-full md:w-fit px-6 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-black hover:bg-slate-50 font-bold text-slate-700 transition-all">
                  + Add New Link
                </button>
              </div>

              <div className="step3 flex flex-col gap-3">
                <label className="heading text-lg font-bold flex items-center gap-2 text-slate-800">
                  <span className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-sm">3</span>
                  Profile Details
                </label>
                <div className="grid grid-cols-1 gap-4">
                  <input
                   value={userData.imageurl}
                  onChange={handleChange}
                    className="w-full border-2 border-slate-100 bg-slate-50 p-4 h-14 rounded-2xl focus:border-[#ffaa00] outline-none"
                    placeholder="Image URL (e.g. cloudinary.com/your-pic)"
                    name="imageurl"
                    type="text"
                  />
                  <input
                  value={userData.description}
                  onChange={handleChange}
                    className="w-full border-2 border-slate-100 bg-slate-50 p-4 h-14 rounded-2xl focus:border-[#ffaa00] outline-none"
                    placeholder="Short bio/description"
                    name="description"
                    type="text"
                  />
                </div>
              </div>

              <button onClick={handleSave} className="w-full py-5 rounded-2xl bg-[#ffaa00] hover:bg-[#e69900] font-black text-xl text-black shadow-[0_4px_0_0_#000] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider">
                Create your BitTree
              </button>

            </div>
          </div>
        </div>

      </div>

      <div className="absolute right-0 h-full scrollcontainer w-150 top-0  overflow-y-auto flex flex-col  ">

        <div className="apply-animation scrollwrapper flex flex-col gap-2 w-full  pt-2">
          <div className="card card1  shrink-0 w-157 h-160"></div>
          <div className="card card2  shrink-0 w-157 h-160"></div>
          <div className="card card3  shrink-0 w-157 h-160"></div>
          <div className="card card4  shrink-0 w-157 h-160"></div>
          <div className="card card5  shrink-0 w-157 h-160"></div>
        </div>

        <div aria-hidden className="apply-animation scrollwrapper flex flex-col gap-2 w-full  ">
          <div className="card card1  shrink-0 w-157 h-160 "></div>
          <div className="card card2 shrink-0 w-157 h-160 "></div>
          <div className="card card3  shrink-0 w-157 h-160"></div>
          <div className="card card4  shrink-0 w-157 h-160"></div>
          <div className="card card5  shrink-0 w-157 h-160"></div>
        </div>


      </div>


    </div>
  );
}
