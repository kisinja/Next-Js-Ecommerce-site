"use client";
import Confetti from 'react-confetti';

const SuccessPage = () => {
    return (
        <div className='flex flex-col gap-6 items-center justify-center h-[calc(100vh-80px)] text-center'>
            <Confetti width={1400} height={1000} />
            <h1 className="text-6xl text-elvis">Successful</h1>
            <h2 className="text-xl font-medium text-gray-700">
                We sent the invoice to your email. <br /> Please check your inbox and spam folder.
            </h2>
            <h3>You are being redirected to the order page...</h3>
        </div>
    )
}

export default SuccessPage
