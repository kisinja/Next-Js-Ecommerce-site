"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const EmailVerificationAlert = ({ email, onResendVerification }: { email: string, onResendVerification?: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [countdown, setCountdown] = useState(0);

    // Countdown timer for resend cooldown
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResend = async () => {
        if (countdown > 0) return;

        setStatus('sending');
        try {
            await onResendVerification();
            setStatus('success');
            setCountdown(30); // 30-second cooldown
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-8 right-8 z-50 max-w-md w-full"
                >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-900 to-indigo-800 p-0.5">
                        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
                            {/* Close button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-700 transition-colors"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Main content */}
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full" />
                                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                                        <FiMail className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-1">Verify Your Email</h3>
                                    <p className="text-gray-300 mb-4">
                                        {"We've"} sent a verification link to <span className="font-semibold text-white">{email}</span>.
                                        Please check your inbox to complete registration.
                                    </p>

                                    {/* Status messages */}
                                    <AnimatePresence mode="wait">
                                        {status === 'idle' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-3"
                                            >
                                                <button
                                                    onClick={handleResend}
                                                    disabled={countdown > 0}
                                                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${countdown > 0
                                                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                                        : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/30'
                                                        }`}
                                                >
                                                    <FiSend className="w-4 h-4" />
                                                    {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Email'}
                                                </button>
                                                <span className="text-sm text-gray-400">{"Didn't"} receive it?</span>
                                            </motion.div>
                                        )}

                                        {status === 'sending' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-2 text-purple-300"
                                            >
                                                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                                                Sending verification email...
                                            </motion.div>
                                        )}

                                        {status === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-2 text-green-400 bg-green-900/30 px-3 py-2 rounded-lg"
                                            >
                                                <FiCheckCircle className="w-5 h-5" />
                                                Verification email sent successfully!
                                            </motion.div>
                                        )}

                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-2 text-red-400 bg-red-900/30 px-3 py-2 rounded-lg"
                                            >
                                                <FiAlertCircle className="w-5 h-5" />
                                                Failed to send email. Please try again.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Animated background elements */}
                            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-xl" />
                            <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EmailVerificationAlert;