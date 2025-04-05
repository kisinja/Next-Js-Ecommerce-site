"use client"

import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CartModal from "./CartModal";
import { useState } from "react";

const NavIcons = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const router = useRouter();

    // Temporary
    const isLoggedIn = true;

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    };

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={handleProfile}>
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        width={22}
                        height={22}
                        className="cursor-pointer object-cover"
                    />
                </DropdownMenuTrigger>
                {isLoggedIn && (
                    <DropdownMenuContent className="w-40 bg-[whitesmoke] shadow-[0_3px_10px_rgba(0,0,0,.2)]">
                        <DropdownMenuItem asChild className="p-1 cursor-pointer w-full  hover:bg-slate-200">
                            <Link href='/profile' className=" ">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer p-1 hover:bg-red-500 hover:text-white">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}
            </DropdownMenu>

            <Image
                src="/notification.png"
                alt="Notifications"
                width={22}
                height={22}
                className="cursor-pointer object-cover"
            />

            <div className="cursor-pointer relative" onClick={() => setIsCartOpen(!isCartOpen)}>
                <Image src="/cart.png" alt="Cart" width={22} height={22} className="object-cover" />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-elvis rounded-full flex-center" id="cart-count">2</div>
            </div>

            {isCartOpen && <CartModal />}
        </div>
    )
}

export default NavIcons