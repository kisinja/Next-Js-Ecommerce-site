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
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useStore } from "@/hooks/useCartStore";

const NavIcons = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const wixClient = useWixClient();

    const isLoggedIn = wixClient.auth.loggedIn();
    const { cart, getCart, counter } = useStore();

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            setIsProfileOpen(!isProfileOpen);
        }
    };

    useEffect(() => {
        getCart(wixClient);
    }, [wixClient, getCart]);

    console.log(cart);

    // AUTH WITH WIX-MANAGED AUTH
    /* const login = async () => {
        const loginRequestData = wixClient.auth.generateOAuthData(
            "http://localhost:3000",
        );
        console.log(loginRequestData);

        localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));

        const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);

        window.location.href = authUrl;
    }; */

    const handleLogout = async () => {
        setIsLoading(true);
        Cookies.remove("refreshToken");

        const { logoutUrl } = await wixClient.auth.logout(window.location.href);
        setIsLoading(false);
        setIsProfileOpen(false);
        router.push(logoutUrl);
    };

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    onClick={handleProfile}
                //onClick={login}
                >
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        width={22}
                        height={22}
                        className="cursor-pointer object-cover"
                    />
                </DropdownMenuTrigger>
                {isProfileOpen && (
                    <DropdownMenuContent className="w-40 bg-[whitesmoke] shadow-[0_3px_10px_rgba(0,0,0,.2)]">
                        <DropdownMenuItem asChild className="p-1 cursor-pointer w-full  hover:bg-slate-200">
                            <Link href='/profile' className=" ">
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer p-1 hover:bg-red-500 hover:text-white" onClick={handleLogout}>
                            {isLoading ? "Logging out..." : "Logout"}
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
                {counter > 0 && <div className="absolute -top-4 -right-4 w-6 h-6 bg-elvis rounded-full flex-center" id="cart-count">{counter}</div>}
            </div>

            {isCartOpen && <CartModal />}
        </div>
    )
}

export default NavIcons