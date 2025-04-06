"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            {
                open ? (
                    <Image src="/closeIcon.svg" alt="" width={28} height={28} className="cursor-pointer" onClick={() => setOpen(!open)} />
                ) : (
                    <Image src="/menu.png" alt="" width={28} height={28} className="cursor-pointer" onClick={() => setOpen(!open)} />
                )
            }

            {
                open && (
                    <div className="absolute bg-black text-white left-0 top-20 w-full  flex flex-col items-center justify-center gap-8 text-xl z-10" id="mobile-menu">
                        <Link href='/' onClick={() => setOpen(false)}>Home</Link>
                        <Link href='/' onClick={() => setOpen(false)}>Shop</Link>
                        <Link href='/' onClick={() => setOpen(false)}>Deals</Link>
                        <Link href='/' onClick={() => setOpen(false)}>About</Link>
                        <Link href='/' onClick={() => setOpen(false)}>Contact</Link>
                        <Link href='/' onClick={() => setOpen(false)}>Cart(1)</Link>
                        <Link href='/' onClick={() => setOpen(false)}>Logout</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Menu