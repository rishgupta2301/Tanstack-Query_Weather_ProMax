import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <div>
            <Link to={'/'} >
            <img 
            src="/logo.png" alt="WeatherPro logo" 
            className='h-14'
            />
            </Link>
            <div>
                {/* search */}
                {/* theme toggle */}
            </div>
        </div>
    </header>
  )
}

export default Header