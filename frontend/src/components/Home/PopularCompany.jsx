import React from 'react'
import {FaMicrosoft, FaApple, FaAmazon} from "react-icons/fa"
import {SiTesla} from "react-icons/si"

export default function PopularCompany() {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Pune, Maharashtra",
      openPositions: 4,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Banglore, Karnataka",
      openPositions: 7,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Chennai, Tamil Nadu",
      openPositions: 3,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "Amazon",
      location: "Banglore, Karnataka",
      openPositions: 4,
      icon: <FaAmazon />
    }
  ];


  return (
    <>
    <div className='companies'>
      <div className='container'>
        <h3>TOP COMPANIES</h3>
        <div className='banner'>
          {
            companies.map(element => {
              return(
                <div className='card' key={element.id}>
                  <div className='content'>
                    <div className='icon'>{element.icon}</div>
                    <div className='text'>
                      <p>{element.title}</p>
                      <p>{element.location}</p>
                    </div>
                  </div>
                  <button>Open Postions {element.openPositions}</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
      
    </>
  )
}
