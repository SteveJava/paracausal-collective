import ParticleCanvas from '@/components/ParticleCanvas';
import TicketCard3D from '@/components/TicketCard3D';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <main className="relative z-10">
        <TicketCard3D hero />
        <Footer />
      </main>
    </>
  );
}
