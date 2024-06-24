import Footer from './_components/Footer';
import Hero from './_components/Hero';
import WorkingCard from './_components/WorkingCard';

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: 'url(/grid-png2.png)',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Hero />
      <WorkingCard />
      <Footer />
    </div>
  );
}
