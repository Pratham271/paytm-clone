"use client"
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

type SidebarProps = {
    href: string;
    title: string;
    icon: React.ReactNode
}
const SidebarItem = ({href, title, icon}: SidebarProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href
  return (
    <div className={`flex ${selected? "text-zinc-700":"text-gray-500"} cursor-pointer p-2 pl-8 hover:text-sky-600`} onClick={()=> {
        router.push(href)
    }}>
        <div className='pr-2'>
            {icon}
        </div>
        <div className='font-bold'>
            {title}
        </div>
    </div>
  )
}

export default SidebarItem
