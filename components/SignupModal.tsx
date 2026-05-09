"use client";

import { useState, useEffect } from "react";

export default function SignupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("signup-dismissed");
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("signup-dismissed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      <div className="bg-zinc-900 border border-white/10 rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl mb-4">Join Paracausal</h2>
        <p className="text-white/60 mb-6">
          Create an account to access exclusive event updates and future drops.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="px-6 py-2 bg-white text-black rounded"
          >
            Sign Up
          </a>

          <button
            onClick={closeModal}
            className="px-6 py-2 border border-white/20 rounded"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
