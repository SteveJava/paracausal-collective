import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border border-white/10 p-6 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition duration-300">
      {children}
    </div>
  );
}
