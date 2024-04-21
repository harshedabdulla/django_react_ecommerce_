import React from 'react'

const HeroBanner = ({ title, subheading }) => {
  return (
    <div className="px-0">
      <img
        src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-32 w-full object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-bold text-white mb-24">
          {title}
          <div className="text-sm text-white mb-24 flex items-center text-center mx-4">
            {subheading}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
