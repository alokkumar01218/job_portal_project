import React from 'react'
import {Link} from "react-router-dom"

export default function NotFound() {
  return (
    <section className='page notfound'>
      <div className='content'>
        <img src='/notfound.png' alt='notfound'/>
        <Link to={"/"}>Return to Home</Link>
      </div>
    </section>
  )
}
