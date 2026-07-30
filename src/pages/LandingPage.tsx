import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import ComparisonTable from '@/components/ComparisonTable';
import BusinessValue from '@/components/BusinessValue';
import PocDeliverables from '@/components/PocDeliverables';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-ink-950 text-white min-h-screen noise">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />
      <ComparisonTable />
      <BusinessValue />
      <PocDeliverables />
      <FinalCta />
      <Footer />
    </div>
  );
}
