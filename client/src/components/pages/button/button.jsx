import React from 'react'
import './button.css'
function Button({text}) {
  return (
    <div>
      <button className='genericBtn'>{text}</button>
    </div>
  )
}

export default Button;