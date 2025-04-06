"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

enum MODE {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    RESET_PASSWORD = "RESET_PASSWORD",
    EMAIL_VERIFICATION = "EMAIL_VERIFICATION"
}

const Login = () => {

    const [mode, setMode] = useState<MODE>(MODE.LOGIN);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const formTitle = mode === MODE.LOGIN
        ? "Log In"
        : mode === MODE.REGISTER
            ? "Register"
            : mode === MODE.RESET_PASSWORD
                ? "Reset Your Password"
                : "Verify Your Email";

    const btnTitle = mode === MODE.LOGIN
        ? "Login"
        : mode === MODE.REGISTER
            ? "Register"
            : mode === MODE.RESET_PASSWORD
                ? "Reset"
                : "Verify";

    const wixClient = useWixClient();

    return (
        <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center w-full" id="loginPage" style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1638260603509-8bcfb21a00aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc2hpb24lMjBhZXN0aGV0aWMlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <form className="flex flex-col gap-8 shadow py-6 px-8 rounded-md glass-effect">
                <h1 className="text-2xl font-semibold text-gray-700">{formTitle}</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {mode === MODE.REGISTER ? (
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="username" className="text-sm text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="eg. john"
                                className="ring-2 ring-gray-300 rounded-md p-4 w-full"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                            />
                        </div>
                    ) : null}

                    {
                        mode !== MODE.EMAIL_VERIFICATION ? (
                            <div className={`flex flex-col gap-2 w-full ${mode === MODE.RESET_PASSWORD && "col-span-2"}`}>
                                <label htmlFor="email" className="text-sm text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="eg. john@email.com"
                                    className="ring-2 ring-gray-300 rounded-md p-4 w-full"
                                    spellCheck="false"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                />
                            </div>
                        ) : (
                            <div className={`flex flex-col gap-2 w-full ${mode === MODE.EMAIL_VERIFICATION && "col-span-2"}`}>
                                <label htmlFor="emailCode" className="text-sm text-gray-700">Verification Code</label>
                                <input
                                    type="text"
                                    name="emailCode"
                                    placeholder="Code"
                                    className="ring-2 ring-gray-300 rounded-md p-4 w-full"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                />
                            </div>
                        )
                    }

                    {
                        mode === MODE.LOGIN || mode === MODE.REGISTER ? (
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="password" className="text-sm text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="ring-2 ring-gray-300 rounded-md p-4 w-full"
                                    autoCapitalize="off"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    spellCheck="false"
                                />
                            </div>
                        ) : null
                    }
                    {mode === MODE.LOGIN && <div className="text-sm underline text-blue-700 cursor-pointer" onClick={() => setMode(MODE.RESET_PASSWORD)}>
                        Forgot Password?
                    </div>}
                    {
                        mode === MODE.REGISTER && (
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="confirmPassword" className="text-sm text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="ring-2 ring-gray-300 rounded-md p-4 w-full"
                                    spellCheck="false"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                />
                            </div>
                        )
                    }
                </div>

                <button
                    className="bg-elvis rounded-md text-white p-2 cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed hover:bg-elvis/90 transition-colors duration-100"
                    disabled={isLoading}
                >
                    {isLoading ?
                        (
                            mode === MODE.REGISTER ? "Creating account..." :
                                mode === MODE.LOGIN ? "Signing in..." :
                                    mode === MODE.EMAIL_VERIFICATION ? "Verifying..." :
                                        mode === MODE.RESET_PASSWORD ? "Reseting..." :
                                            btnTitle)
                        : btnTitle}
                </button>
                {error && <div className="text-red-500 text-sm">{error}</div>}

                {mode === MODE.LOGIN && (
                    <div className="text-sm underline text-blue-700 cursor-pointer" onClick={() => setMode(MODE.REGISTER)}>
                        {"Don't"} have an account? Register
                    </div>
                )}
                {mode === MODE.REGISTER && (
                    <div className="text-sm underline text-blue-700 cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
                        Already have an account? Sign In
                    </div>
                )}
                {mode === MODE.RESET_PASSWORD && (
                    <div className="text-sm underline text-blue-700 cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
                        Go back to Login
                    </div>
                )}

                {success && <div className="text-green-600 text-sm">{success}</div>}
            </form>
        </div>
    );
};

export default Login;