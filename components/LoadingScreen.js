
const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#9800ff] bg-gradient-to-b from-[#9800ff] to-[#7a00cc]">
            <div className="flex flex-col items-center gap-6">
                
                {/* Glowing Spinner Animation */}
                <div className="relative w-24 h-24">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
                    {/* Animated Spinning Ring */}
                    <div className="absolute inset-0 border-4 border-t-[#ff00df] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    {/* Center Pulse */}
                    <div className="absolute inset-4 bg-white/10 backdrop-blur-md rounded-full animate-pulse flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#ff00df] rounded-full shadow-[0_0_15px_#ff00df]"></div>
                    </div>
                </div>

                {/* Loading Text with Shimmer */}
                <h2 className="text-white font-black tracking-widest text-xl animate-pulse opacity-80 uppercase">
                    Loading...
                </h2>
                
                {/* Subtle Progress Bar Background */}
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#d79cff] to-[#ff00df] w-1/2 animate-[loading_1.5s_infinite_ease-in-out]"></div>
                </div>
            </div>

            {/* Custom Animation Keyframes for Tailwind */}
            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;