import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SystemStatus from '@/components/SystemStatus';
import SpeedTest from '@/components/SpeedTest';
import Features from '@/components/Features';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-dark-100 font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <SystemStatus />
        <SpeedTest />
        <Features />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
