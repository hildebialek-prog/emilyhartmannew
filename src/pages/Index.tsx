import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import Features from "@/components/Features";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site.config";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Emily Hartman | Premium Computer & Phone Accessories</title>
        <meta 
          name="description" 
          content="Discover premium computer accessories and phone accessories at Emily Hartman. Shop keyboards, mice, monitors, phone cases, chargers, and more with free shipping and 24/7 support." 
        />
        <meta name="keywords" content="computer accessories, phone accessories, keyboards, mice, monitors, phone cases, chargers, Emily Hartman" />
        <link rel="canonical" href={siteConfig.url} />
      </Helmet>
      
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <Features />
          <Categories />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
