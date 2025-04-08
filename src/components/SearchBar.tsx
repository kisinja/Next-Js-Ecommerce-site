"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = ({ type, setOpen }: { type: string, setOpen?: (value: boolean) => void }) => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchQuery = formData.get("name") as string;

        if (searchQuery) {
            router.push(`/list?name=${searchQuery}`);
            if (setOpen) {
                setOpen(false);
            }
        }
    };

    return (
        <form
            className={`
                flex items-center gap-2 md:gap-4 
                border border-gray-200 rounded-full
                ${type === "Mobile" ? "w-[70%] p-2 bg-transparent text-gray-500" : "p-1.5 md:p-2 max-w-md flex-1"}
                bg-white shadow-sm hover:shadow-md transition-shadow
            `}
            onSubmit={handleSearch}
        >
            <input
                type="text"
                name="name"
                placeholder="Search..."
                className="
                    flex-1 bg-transparent outline-none 
                    text-sm md:text-base
                    px-3 md:px-4 py-1
                    placeholder-gray-400
                "
                autoComplete="off"
            />
            <button
                className="
                    p-2 rounded-full 
                    bg-gray-100 hover:bg-gray-200 
                    transition-colors
                    flex-shrink-0
                "
                aria-label="Search"
            >
                <Image
                    src="/search.png"
                    alt="Search"
                    width={16}
                    height={16}
                    className="w-4 h-4 md:w-4 md:h-4"
                />
            </button>
        </form>
    );
};

export default SearchBar;