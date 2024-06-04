import React, { useContext } from 'react'
import { Context } from '../../main.jsx'
import { Navigate } from 'react-router-dom'
import Herosection from "./HeroSection.jsx"
import HowItWoks from "./HowItWoks.jsx"
import PopularCategory from "./PopularCategory.jsx"
import PopularCompany from "./PopularCompany.jsx"

function Home() {
  const {isAuthorized} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }



  return (
    <section className='homepage page'>
      <Herosection />
      <HowItWoks />
      <PopularCategory />
      <PopularCompany />  
    </section>
  )
}

export default Home
