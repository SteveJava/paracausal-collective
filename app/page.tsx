import ParticleCanvas from '@/components/ParticleCanvas';
import TicketCard3D from '@/components/TicketCard3D';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <main className="relative z-10">
        <TicketCard3D hero />
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(55,31,118,0.3), transparent)' }} />
        <GallerySection />
        <Footer />
      </main>
    </>
  );
}
