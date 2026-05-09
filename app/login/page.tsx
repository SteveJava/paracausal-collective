"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Logged in successfully");
    }
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created. Check your email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl mb-6">Login</h1>

      <input
        className="mb-4 p-3 bg-white/10 border border-white/20 rounded w-full max-w-sm"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="mb-6 p-3 bg-white/10 border border-white/20 rounded w-full max-w-sm"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-white text-black rounded"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="px-6 py-2 border border-white rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
