import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import Signin from './Signin'
import MobileMenu from './MobileMenu'
import { auth, currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Logs } from 'lucide-react'
import { getMyOrders } from '@/sanity/queries'


const Header = async () => {
  const user = await currentUser()
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

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

              {user && (
              <Link
                href={"/orders"}
                className="group relative hover:text-shop-light-green hoverEffect"
              >
                <Logs />
                <span className="absolute -top-1 -right-1 bg-shop-btn-dark-green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
                  {orders?.length ? orders?.length : 0}
                </span>
              </Link>
            )}
              <ClerkLoaded>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                {!user && <Signin />}
              </ClerkLoaded>
              
            </div>
        </Container>
        
    </header>
  )
}

export default Header