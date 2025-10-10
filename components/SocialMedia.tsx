import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { TooltipContent } from '@radix-ui/react-tooltip'


const socialLinks = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com',
    icon: <Facebook className='w-5 h-5' />, 
  },
  {
    title: 'Twitter',
    href: 'https://www.twitter.com',
    icon: <Twitter className='w-5 h-5' />,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com',
    icon: <Instagram className='w-5 h-5' />,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: <Linkedin className='w-5 h-5' />,
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com',
    icon: <Youtube className='w-5 h-5' />,
  },

]

interface SocialMediaProps {

    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;

}

const SocialMedia = ({className, iconClassName, tooltipClassName}: SocialMediaProps ) => { 
  return (
    <TooltipProvider>
        <div className={cn('flex items-center gap-3.5', className)}>
            {socialLinks?.map((item) => (

                <Tooltip key={item?.title}>
                    <TooltipTrigger asChild>
                        <Link href={item?.href} target='_blank' rel='noopener noreferrer' className={cn('p-2 border rounded-full hover:text-white hover:border-shop-light-green hoverEffect', iconClassName)}>
                            {item?.icon}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className={cn('bg-white text-darkColor text-xs font-semibold px-2 py-0.5 rounded-sm', tooltipClassName)}>
                        {item?.title}
                    </TooltipContent>
                </Tooltip>

            ))}

        </div>
    </TooltipProvider>
  )
}

export default SocialMedia