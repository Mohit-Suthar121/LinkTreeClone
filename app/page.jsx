"use client"
import Navbar from '@/components/Navbar'
import Card from '@/components/Card'
import LinkInput from '@/components/LinkInput'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import Image from 'next/image';


export default function Home() {

  async function handleImageUpload(e){
    const file = e.target.files[0];
    setUploadingImage(true);
    const formdata = new FormData();
    formdata.append("file",file);
    formdata.append("upload_preset","Bittree_Preset")
    formdata.append("cloud_name","ds8b7cacr")
    const res = await fetch("https://api.cloudinary.com/v1_1/ds8b7cacr/image/upload",{
      method:"POST",
      body:formdata
    })
    const resData = await res.json();
    console.log("The response  data from the cloud is: ",resData)
    console.log("The response  data url from the cloud is: ",resData.secure_url)
    setUserImageUrl(resData.secure_url);
    setUploadingImage(false)
  }
  const [uploadingImage,setUploadingImage] = useState(false);
  const [userImageUrl,setUserImageUrl] = useState(null);
  const [imageError,setImageError] = useState(false);



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const router = useRouter();



  function handleNewLink() {
    const newLink = {
      id: crypto.randomUUID(),
      linkText: "",
      linkUrl: ""
    }
    setUserLinks(prev => [...prev, newLink])
  }




  async function handleSave(data) {
    if(!userImageUrl){
      console.log("image is required")
      setImageError(true);
      return;
    }
    const mergedData = { ...data, links: userLinks,imageurl:userImageUrl }
    console.log("The merged data is: ", mergedData)


    const res = await fetch("/api/savedata", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mergedData)
    })

    if (res.status == 409) {
      console.log("Username is already taken")
      setNameError(true);
      window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
      return;
    }

    if (!res.ok) {
      console.log("Some  Error Occured! ")
      return;
    }


    const result = await res.json();
    console.log("Response received from the backend: ", result)
    router.push(`/${data.username}`)


  }



  function updateLink(userid, name, value) {

    setUserLinks(prev => prev.map(item => (
      item.id === userid ? { ...item, [name]: value } : item
    )))

  }

  const [userLinks, setUserLinks] = useState([]);
  const [nameError, setNameError] = useState(false);

  const username = watch("username")

  useEffect(() => {
    setNameError(false);
  }, [username])


  return (
    
    <div className=" relative w-full   flex justify-between">
      
      <Navbar />

      <div className="min-h-screen maincontainer p-5 flex w-[50%]   pt-60">

        <div className=" flex items-center justify-center p-6  w-full">
          <div className="createBittree flex flex-col gap-8 bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl w-full max-w-2xl border-2 border-black/5">

            <header className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 ">Create your Bittree</h1>
              <p className="text-slate-500 font-medium">Set up your digital ecosystem in three simple steps.</p>
            </header>

            <div className="steps flex flex-col gap-10">
              <form className="steps flex flex-col gap-10" onSubmit={handleSubmit(handleSave)}>

                <div className="step1 flex flex-col gap-3">
                  <label className="heading text-lg font-bold flex items-center gap-4 text-slate-800">
                    <span className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-sm">1</span>
                    Claim your Handle
                    {nameError && <span className='font-normal text-red-600 '>*Username is already taken!</span>}
                    {errors.username && <span className='font-normal text-red-600 '>*Field Is Required!</span>}

                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">bittree.com/</span>

                    <input
                      {...register("username", { required: true })}
                      placeholder="Enter Username"
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

                    {userLinks.map((link, index) => (
                      <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <LinkInput onChange={updateLink} link={link} />
                      </div>
                    ))}

                    {userLinks.length === 0 && (
                      <p className="text-slate-400 text-sm text-center my-auto italic">
                        No links added yet. Click below to start!
                      </p>
                    )}
                  </div>
                  <button type='button' onClick={handleNewLink} className="w-full md:w-fit px-6 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-black hover:bg-slate-50 font-bold text-slate-700 transition-all">

                    + Add New Link
                  </button>
                </div>



                <div className="step3 flex flex-col gap-3">
                  <label className="heading text-lg font-bold flex items-center gap-2 text-slate-800">
                    <span className="flex items-center justify-center w-7 h-7 bg-black text-white rounded-full text-sm">3</span>
                    Profile Details
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    {imageError && <span className='font-normal text-red-600 '>*Image Is Required!</span>}
                    <input
                      className="hidden w-full border-2 border-slate-100 bg-slate-50 p-4 h-14 rounded-2xl focus:border-[#ffaa00] outline-none"
                     
                      placeholder='choose file from your device'
                      type="file"
                      id='fileUpload'
                      onChange={handleImageUpload}
                    />

                    <label
                      className="group w-full border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm p-2 min-h-16 rounded-2xl cursor-pointer flex items-center justify-between transition-all duration-200 hover:border-[#ff00df] hover:bg-white"
                      htmlFor="fileUpload"
                    >
                      {!userImageUrl && <span className="text-[#676767] text-sm font-medium ml-4 truncate">
                        No file selected...
                      </span>}

                        {userImageUrl &&<div className='relative w-20 h-20 '>
                          <Image alt='profile-pic' src={userImageUrl} fill/>
                        </div>}

                      <div className="h-12 px-6 flex items-center justify-center rounded-xl bg-[#9800ff] text-white text-sm font-bold shadow-md transition-all group-hover:bg-[#ff00df] active:scale-95">
                        Choose File
                      </div>
                      
                    </label>



                    {errors.description && <span className='font-normal text-red-600 '>*Bio is Required!</span>}
                    <input
                      {...register("description", { required: true })}
                      className="w-full border-2 border-slate-100 bg-slate-50 p-4 h-14 rounded-2xl focus:border-[#ffaa00] outline-none"
                      placeholder="Short bio/description"
                      type="text"
                    />
                  </div>
                </div>


                <button type='submit' className="w-full py-5 rounded-2xl bg-[#ffaa00] hover:bg-[#e69900] font-black text-xl text-black shadow-[0_4px_0_0_#000] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider ">
                  Create your BitTree
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute pointer-events-none right-0 h-full scrollcontainer w-150 top-0  overflow-y-auto flex flex-col  ">

        <div className="apply-animation scrollwrapper flex flex-col gap-2 w-full  pt-2">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Card key={index} number={item} />
          ))}
        </div>

        <div aria-hidden className="apply-animation scrollwrapper flex flex-col gap-2 w-full  ">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Card key={index} number={item} />
          ))}
        </div>


      </div>


    </div>
  );
}
