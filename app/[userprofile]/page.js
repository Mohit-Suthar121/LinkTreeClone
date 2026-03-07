"use client"
import Image from 'next/image';
import React, { useEffect, useState, use } from 'react';
import LinkButtons from '../../components/LinkButtons';
import LoadingScreen from '../../components/LoadingScreen'
import CopySvg from '../../components/CopySvg'
import { ToastContainer, toast,Bounce } from 'react-toastify';
const Page = ({ params }) => {

    const notify = () => toast.success('Copied to Clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });;

    const { userprofile } = use(params);
    const [userData, setUserData] = useState({
        username: "",
        imageurl: "",
        description: "",
        links: []
    });
    const [isDataFetched, setIsDataFetched] = useState(false);


    async function fetchData() {

        const res = await fetch(`/api/getdata/${userprofile}`);
        const data = await res.json();
        console.log("The data which came from the backend is: ", data)
        setUserData(data);
        setIsDataFetched(true);
    }

    useEffect(() => {
        fetchData();
    }, [])

    async function handleCopy(text) {
        await navigator.clipboard.writeText(window.location.href)
        notify()

    }

    if (!isDataFetched) return <LoadingScreen />;
    return (

        <div className='relative w-full min-h-screen pt-16 pb-10 bg-[#9800ff] bg-gradient-to-b from-[#9800ff] to-[#7a00cc] flex justify-center px-4 '>

            <div className="profilesection w-full max-w-md h-fit flex flex-col items-center gap-8 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">

                {/* Profile Header */}
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className="profilepicture w-32 h-32 rounded-full border-4 border-[#ff00df] overflow-hidden shadow-lg transform transition hover:scale-105">
                        {userData?.imageurl && (<Image
                            width={128}
                            height={128}
                            src={userData.imageurl}
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
                <div className="links w-full pt-2 flex flex-col gap-4 h-62.5 link-container scrollbar-thumb-[#ff00df]/80 hover:scrollbar-thumb-[#ff00df] overflow-y-auto mb-10">
                    {userData?.links.map((link, index) => (
                        <LinkButtons key={index} linkText={link?.linkText} linkUrl={link?.linkUrl} />
                    ))}
                </div>
            </div>

            <div className="copy-link-container fixed max-xl:left-1/2 max-xl:-translate-x-1/2 max-xl:bottom-0 max-xl:top-auto top-1/2 -translate-y-1/2 right-5  w-full max-w-md px-6 flex flex-col items-center gap-3">

                {/* CTA Text Styled to match subheader style */}
                <span className="text-[#d79cff] font-bold uppercase text-[10px] tracking-[0.2em] drop-shadow-sm">
                    Share this link with people to connect with you
                </span>

                <div className="relative copy-link-button w-full h-12 flex justify-between items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl group transition-all hover:border-[#ff00df]/50 hover:bg-white/15">

                    <span className="pl-5 text-sm font-medium text-white/70 truncate pr-16">
                        {window.location.href}
                    </span>

                    <div onClick={handleCopy} className="absolute right-0 top-0 bottom-0 aspect-square flex justify-center items-center bg-[#ff00df] hover:bg-[#ff00df]/90 cursor-pointer transition-all active:scale-95 shadow-[-10px_0_20px_rgba(0,0,0,0.2)]">
                        <div className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform">
                            <CopySvg />
                        </div>
                    </div>
                </div>
            </div>



            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce} />
        </div>
    );
}

export default Page;