"use client"

import { useFormStatus } from "react-dom"


const UpdateButton = () => {

    const { pending } = useFormStatus();

    return (
        <button type="submit" className="bg-elvis text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96 cursor-pointer" disabled={pending}>
            {pending ? "Updating..." : "Update"}
        </button>
    );
};

export default UpdateButton;