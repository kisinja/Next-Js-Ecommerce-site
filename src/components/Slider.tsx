"use client"

import { slides } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden">
            <div className="w-max h-full flex transition-all ease-in-out duration-1000" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                {
                    slides.map(s => (
                        <div key={s.id} className={`${s.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}>
                            <div className="h-1/2 xl:w-1/2 flex items-center flex-col justify-center gap-8 2xl:gap-12 xl:h-full">
                                <h1 className="text-xl lg:text-3xl 2xl:text-5xl">{s.description}</h1>
                                <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold text-center">{s.title}</h1>
                                <Link href={s.url}>
                                    <button className="rounded-md bg-black text-white px-4 py-3">
                                        SHOP NOW
                                    </button>
                                </Link>
                            </div>
                            <div className="relative h-1/2 xl:w-1/2 xl:h-full">
                                <Image
                                    src={s.img}
                                    alt={s.title}
                                    fill sizes={"100%"}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
                {
                    slides.map((s, index) => (
                        <div key={s.id} className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${currentSlide === index ? "scale-150" : ""}`} onClick={() => setCurrentSlide(index)}>
                            {currentSlide === index && <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>}
                        </div>
                    ))
                }
            </div>
        </div>
    )
};