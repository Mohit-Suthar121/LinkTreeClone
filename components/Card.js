import React from 'react'

const Card = ({number}) => {
  return (
    <div className={`card card${number}  shrink-0 w-157 h-160`}></div>
  )
}

export default Card