import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const Signin = () => {
  return (
    <SignInButton mode='modal'>
          <button className=' hover:text-darkColor cursor-pointer font-semibold hoverEffect hidden md:block' >Login</button>
    </SignInButton>
  )
}

export default Signin