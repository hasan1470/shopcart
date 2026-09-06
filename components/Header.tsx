import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import Signin from './Signin'
import MobileMenu from './MobileMenu'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Logs } from 'lucide-react'
import { DEMO_MODE } from '@/lib/demo-mode'


const Header = async () => {
  const user = DEMO_MODE ? null : await currentUser();

  return (
    <header className='sticky top-0 z-50 py-5 bg-white/70 backdrop-blur-md'>

        <Container className='flex items-center justify-between text-lightColor'>
            {/* Logo */}
            <div className='flex items-center justify-start gap-1 w-auto md:w-1/3 md:gap-0'>
              <MobileMenu />
              <Logo />
            </div>
            {/* Navigation */}
            <HeaderMenu />
            {/* Search & others */}
            <div className='flex items-center gap-3.5 md:gap-5 w-auto md:w-1/3 justify-end'>
            
              <SearchBar />
              <CartIcon />
              <FavoriteButton />

              {(DEMO_MODE || user) && (
              <Link
                href={"/orders"}
                className="group relative hover:text-shop-light-green hoverEffect"
              >
                <Logs aria-label="Orders"/>

              </Link>
            )}
              {!DEMO_MODE && <ClerkLoaded>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                {!user && <Signin />}
              </ClerkLoaded>}
              
            </div>
        </Container>
        
    </header>
  )
}

export default Header