
const LinkButtons = ({ linkText, linkUrl }) => {
    const formattedUrl = (!linkUrl.startsWith("http://") && !linkUrl.startsWith("https://"))?"https://"+linkUrl:linkUrl;

  return (
    <a href={formattedUrl} target='_blank' rel='noopener noreferrer'>
      <button className='w-full text-lg font-bold rounded-2xl h-16 flex justify-center items-center transition-all duration-300 bg-[#d79cff] border-b-4 border-[#ff00df] text-[#4a0080] hover:bg-[#ff00df] hover:text-white hover:-translate-y-1 active:translate-y-0.5 shrink-0'>
        {linkText}
      </button>
    </a>
  )
}

export default LinkButtons