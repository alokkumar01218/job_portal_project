import React from 'react'

export default function ResumeModel({imageUrl, onClose}) {
  return (
    <>
      <div className='resume-model'>
        <div className='model-content'>
          <span className='close' onClick={onClose}>&times;</span>
          <img src={imageUrl} alt='resume'/>
        </div>
      </div>
      
    </>
  )
}
