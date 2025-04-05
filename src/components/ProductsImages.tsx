"use client"
import Image from "next/image";
import { useState } from "react";

const ProductsImages = ({ items }: { items: any }) => {

    const [index, setIndex] = useState(0);

    return (
        <div className="">
            <div className="h-[500px] relative">
                <Image src={items[index].image?.url} alt="" fill className="object-cover rounded-md" sizes="50vw" />
            </div>
            <div className="flex justify-between gap-4 mt-8">
                {items.map((i: any, index: number) => (
                    <div className="w-1/4 h-32 relative gap-4 mt-8" key={index} onClick={() => setIndex(index)}>
                        <Image src={i.image?.url} alt="" fill className="object-cover rounded-md cursor-pointer" sizes="30vw" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductsImages