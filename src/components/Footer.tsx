import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, BadgeCheck, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "@/lib/emailjs.config";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";

const emailSchema = z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters");

const Footer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleFooterLink = (hash: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      navigate("/");
      // Wait for navigation then scroll to hash
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      // If already on home page, just scroll
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleCategoryClick = (category: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Map categories to navigation targets
    const categoryMap: Record<string, { type: "filter" | "scroll"; value: string }> = {
      "Computer Accessories": { type: "filter", value: "computer" },
      "Phone Accessories": { type: "filter", value: "phone" },
      "Keyboards": { type: "scroll", value: "#categories" },
      "Mice": { type: "scroll", value: "#categories" },
      "Monitors": { type: "scroll", value: "#categories" },
      "Phone Cases": { type: "scroll", value: "#categories" },
    };

    const target = categoryMap[category];
    
    if (!target) {
      // Default: scroll to categories section
      handleFooterLink("#categories", e);
      return;
    }

    if (target.type === "filter") {
      // Navigate to products page with category filter
      navigate(`/products?category=${target.value}`);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    } else {
      // Scroll to categories section
      handleFooterLink(target.value, e);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first
      navigate("/");
      // Wait for navigation then scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    } else {
      // If already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Home", href: "#home", isHome: true },
    { name: "Products", href: "#products", isHome: false },
    { name: "Categories", href: "#categories", isHome: false },
    { name: "About Us", href: "#about", isHome: false },
    { name: "Contact", href: "#contact", isHome: false },
  ];

  const categories = [
    "Computer Accessories",
    "Phone Accessories",
    "Keyboards",
    "Mice",
    "Monitors",
    "Phone Cases",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    try {
      // Validate email
      emailSchema.parse(email);

      // Check if EmailJS is configured
      if (
        emailjsConfig.serviceId === "YOUR_SERVICE_ID" ||
        emailjsConfig.templateId === "YOUR_TEMPLATE_ID" ||
        emailjsConfig.publicKey === "YOUR_PUBLIC_KEY"
      ) {
        // Fallback: Use mailto link if EmailJS is not configured
        const mailtoLink = `mailto:kwgxxnrbi232@outlook.com?subject=Newsletter Subscription&body=Please subscribe me to your newsletter. Email: ${encodeURIComponent(email)}`;
        window.location.href = mailtoLink;
        
        toast({
          title: "Opening email client...",
          description: "Please send the subscription request from your email client.",
        });
        
        setEmail("");
        return;
      }

      setIsSubmitting(true);

      // Send newsletter subscription email using EmailJS
      // Note: You may want to create a separate template for newsletter subscriptions
      const templateParams = {
        from_email: email,
        subject: "Newsletter Subscription Request",
        message: `New newsletter subscription request from: ${email}`,
        to_email: "kwgxxnrbi232@outlook.com",
      };

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );
      
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0]?.message || "Invalid email address");
      } else {
        console.error("EmailJS Error:", error);
        toast({
          title: "Subscription failed",
          description: "Please try again later or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-background/70">
                Subscribe to our newsletter for exclusive deals and updates.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`bg-background/10 border-background/20 text-background placeholder:text-background/50 w-full md:w-80 ${emailError ? "border-destructive" : ""}`}
                  disabled={isSubmitting}
                />
                {emailError && (
                  <p className="text-destructive text-sm mt-1">{emailError}</p>
                )}
              </div>
              <Button variant="accent" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Subscribing..."
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/"
              onClick={handleHomeClick}
              className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity inline-block"
            >
              Emily Hartman
            </a>
            <p className="text-background/70 mb-6">
              Your trusted destination for premium computer accessories and phone accessories. 
              Quality you can count on, service you'll love.
            </p>
            
            {/* Verified Business Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-lg px-3 py-2 mb-6"
            >
              <BadgeCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-background/90">Verified Business</span>
            </motion.div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => link.isHome ? handleHomeClick(e) : handleFooterLink(link.href, e)}
                    className="text-background/70 hover:text-background transition-all duration-300 inline-block hover:-translate-y-0.5 cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href="#categories"
                    onClick={(e) => handleCategoryClick(category, e)}
                    className="text-background/70 hover:text-background transition-all duration-300 inline-block hover:-translate-y-0.5 cursor-pointer"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-background/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p>Youngstoun Court 20316<br />Hagerstown Maryland 21742</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:kwgxxnrbi232@outlook.com" className="hover:text-background transition-all duration-300 inline-block hover:-translate-y-0.5">
                  kwgxxnrbi232@outlook.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+19036180982" className="hover:text-background transition-all duration-300 inline-block hover:-translate-y-0.5">
                  +1 9036180982
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <p className="text-background/60">© 2024 Emily Hartman. All rights reserved.</p>
              <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/20 rounded-lg px-3 py-1.5">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-background/90">Verified Business</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 text-background/70">
              <span className="font-semibold text-background/90">Emily Hartman</span>
              <span className="hidden md:inline">•</span>
              <span>Youngstoun Court 20316, Hagerstown Maryland 21742</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
