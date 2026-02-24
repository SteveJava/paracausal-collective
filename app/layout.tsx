import "./globals.css";
import Navbar from "../components/Navbar"; // or "@/components/Navbar" if alias works


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
