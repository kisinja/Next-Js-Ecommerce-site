"use client"

import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import CartModal from "./CartModal";

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const router = useRouter();

    // Temporary
    const isLoggedIn = true;

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            setIsProfileOpen((prev) => !prev);
        }
    };

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image src="/profile.png" alt="" width={22} height={22} className="cursor-pointer object-cover" onClick={handleProfile} />
            {
                isProfileOpen && <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgba(0,0,0,.2)] z-20 bg-[whitesmoke]">
                    <Link href='/profile'>Profile</Link>
                    <div className="mt-2 cursor-pointer">Logout</div>
                </div>
            }
            <Image src="/notification.png" alt="" width={22} height={22} className="cursor-pointer object-cover" />
            <div className="cursor-pointer relative" onClick={() => setIsCartOpen(!isCartOpen)}>
                <Image src="/cart.png" alt="" width={22} height={22} className=" object-cover" />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-elvis rounded-full flex-center" id="cart-count">2</div>
            </div>
            {
                isCartOpen && <div>
                    <CartModal />
                </div>
            }
        </div>
    )
}

export default NavIcons