import Link from "next/link"
import Menu from "./Menu"
import Image from "next/image"
import SearchBar from "./SearchBar"
import NavIcons from "./NavIcons"
import NavLink from "./NavLink"
import dynamic from "next/dynamic"

/* const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false }); */

const Navbar = () => {
    return (
        <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
            {/* MOBILE */}
            <div className="h-full flex items-center justify-between md:hidden">
                <Link href="/">
                    <div className="text-2xl tracking-wide">
                        ELVIS
                    </div>
                </Link>
                <Menu />
            </div>
            {/* DESKTOP */}
            <div className="hidden md:flex items-center h-full justify-between gap-8">
                {/* LEFT */}
                <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
                    <Link href='/' className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Logo" width={24} height={24} className="" />
                        <div className="text-2xl tracking-wide">
                            ELVIS
                        </div>
                    </Link>
                    <div className="hidden xl:flex gap-4">
                        <NavLink href='/' id="desktop-nav-link" exact>Home</NavLink>
                        <NavLink href='/' id="desktop-nav-link">Shop</NavLink>
                        <NavLink href='/' id="desktop-nav-link">Deals</NavLink>
                        <NavLink href='/' id="desktop-nav-link">About</NavLink>
                        <NavLink href='/' id="desktop-nav-link">Contact</NavLink>

                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
                    <SearchBar type="Desktop" />
                    <NavIcons />
                </div>
            </div>
        </div>
    )
}

export default Navbar
