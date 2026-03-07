

const Navbar = () => {
    return (

      
        <div className='bg-white h-22.5 w-[90%] rounded-[50px] fixed left-[50%] translate-x-[-50%] top-12 flex pl-11.25 items-center gap-12 justify-between z-10'>
            <div className='flex w-full items-center gap-12'>
                <div className="logo font-bold text-4xl tracking-tighter max-xl:text-2xl">
                    BitTree
                </div>
                <div className="names flex max-xl:hidden">
                    <span className='h-11.75 p-4 flex justify-center items-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer text-[17px] font-[480]'>Products</span>
                    <span className='h-11.75 p-4 flex justify-center items-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer text-[17px] font-[480]'>Templates</span>
                    <span className='h-11.75 p-4 flex justify-center items-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer text-[17px] font-[480]'>Marketplace</span>
                    <span className='h-11.75 p-4 flex justify-center items-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer text-[17px] font-[480]'>Learn</span>
                    <span className='h-11.75 p-4 flex justify-center items-center rounded-xl hover:bg-[#E9E9E9] cursor-pointer text-[17px] font-[480]'>Pricing</span>
                </div>
            </div>

            <div className="login-signup flex items-center pr-3.5 gap-2">
                <button className='h-15.5 rounded-xl text-black bg-[#e9e9e9a5]  whitespace-nowrap p-6 flex justify-center items-center font-semibold text-lg hover:bg-[#E9E9E9] cursor-pointer max-xl:text-xs max-xl:p-4 shrink-0'>Log in</button>
                <button className='h-15.5 rounded-4xl text-white bg-[#1E2330] whitespace-nowrap p-6 flex justify-center items-center font-semibold text-lg cursor-pointer max-xl:text-xs max-xl:p-4'>Sign up free</button>
            </div>

        </div>
    )
}

export default Navbar