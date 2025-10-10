'use client'
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import SideMenu from './SideMenu'

const MobileMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <>
    <button onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
        <AlignLeft className='w-5 h-5 hoverEffect hover:text-darkColor md:hidden cursor-pointer'/>
    </button>

    <div className='md:hidden'>
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)}
      />
    </div>
    
    </>
  )
}

export default MobileMenu