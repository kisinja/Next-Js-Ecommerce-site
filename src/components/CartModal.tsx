"use client";
import Image from "next/image";

const CartModal = () => {
    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
            <div>
                <h2 className="text-xl">Shopping Cart</h2>

                <div className="flex flex-col gap-8">
                    <div className="flex gap-4">
                        <Image
                            src="/product.png"
                            alt=""
                            width={72}
                            height={96}
                            className="object-cover rounded-md"
                        />
                        <div className="flex flex-col justify-between w-full">
                            {/* TOP */}
                            <div>
                                {/* TITLE */}
                                <div className="flex items-center justify-between gap-8">
                                    <h3 className="font-semibold">
                                        Digital Hanger
                                    </h3>
                                    <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                                        <div className="text-xs text-green-500">
                                            2 x
                                        </div>
                                        $88
                                    </div>
                                </div>
                                {/* DESC */}
                                <div className="text-sm text-gray-500">
                                    available
                                </div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Qty. 2</span>
                                <span className="text-blue-500">
                                    Remove
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between font-semibold">
                            <span>Subtotal</span>
                            <span>$176</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="flex justify-between text-sm">
                            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                                View Cart
                            </button>
                            <button className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;