"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    exact?: boolean;
    id?: string;
}

const NavLink = ({ href, children, exact = false, id }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={`relative pb-1 ${isActive
                ? "after:w-full after:bg-elvis"
                : "after:w-0 hover:after:w-full"
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-300`}
            id={id}
        >
            {children}
        </Link>
    );
};

export default NavLink;