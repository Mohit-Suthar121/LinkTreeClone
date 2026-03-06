import React from 'react'

const LinkInput = ({link,onChange}) => {
    function handleChange(e){
        onChange(link.id,e.target.name,e.target.value)
    }
    return (
            <div className="link1 flex gap-2">
                <input onChange={handleChange} value={link.linkText} placeholder='Enter link Text' className='w-60 border p-4 h-10 rounded-xl ' name='linkText' type="text" />
                <input onChange={handleChange} value={link.linkUrl} placeholder='Enter link URL' className='w-60 border p-4 h-10 rounded-xl ' name='linkUrl' type="text" />
            </div>
    
    )
}

export default LinkInput