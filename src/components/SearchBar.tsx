"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {

    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchQuery = formData.get("name") as string;

        if (searchQuery) {
            router.push(`/list?name=${searchQuery}`);
        } else {
            return;
        }
    };

    return (
        <form className="flex-between gap-4 border border-gray-100 p-2 rounded-full flex-1 bg-white" onSubmit={handleSearch} id="search">
            <input type="text" name="name" placeholder="Search" className="flex-1 bg-transparent outline-none" autoComplete="off"  />
            <button className="cursor-pointer" >
                <Image
                    src="/search.png"
                    alt="Search"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                />
            </button>
        </form>
    );
};

export default SearchBar;