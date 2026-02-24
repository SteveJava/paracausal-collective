export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="tracking-widest font-semibold">PARACAUSAL</div>
        <div className="space-x-6 text-sm text-white/70">
          <a href="#events" className="hover:text-white transition">
            Events
          </a>
          <a href="#about" className="hover:text-white transition">
            About
          </a>
        </div>
      </div>
    </nav>
  );
}
