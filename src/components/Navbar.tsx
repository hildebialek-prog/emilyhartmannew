import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashLink = (hash: string, e?: React.MouseEvent) => {
    e?.preventDefault();
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
    setIsOpen(false);
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
    setIsOpen(false);
  };

  const navLinks = [
    { name: t("nav.home"), href: "/", isHash: false },
    { name: t("nav.products"), href: "/products", isHash: false },
    { name: t("nav.categories"), href: "#categories", isHash: true },
    { name: t("nav.about"), href: "#about", isHash: true },
    { name: t("nav.contact"), href: "#contact", isHash: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/"
              onClick={handleHomeClick}
              className="text-xl md:text-2xl font-bold text-gradient transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer"
            >
              Emily Hartman
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {link.isHash ? (
                  <button
                    onClick={() => handleHashLink(link.href)}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium cursor-pointer hover:-translate-y-0.5"
                  >
                    {link.name}
                  </button>
                ) : link.href === "/" ? (
                  <Link
                    to={link.href}
                    onClick={handleHomeClick}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium hover:-translate-y-0.5 inline-block cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-all duration-300 font-medium hover:-translate-y-0.5 inline-block"
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button 
              variant="hero" 
              size="sm"
              onClick={() => navigate("/products")}
            >
              {t("nav.shopNow")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  link.isHash ? (
                    <button
                      key={link.name}
                      onClick={() => handleHashLink(link.href)}
                      className="block text-muted-foreground hover:text-foreground transition-all duration-300 font-medium py-2 w-full text-left hover:translate-x-1"
                    >
                      {link.name}
                    </button>
                  ) : link.href === "/" ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={(e) => {
                        handleHomeClick(e);
                        setIsOpen(false);
                      }}
                      className="block text-muted-foreground hover:text-foreground transition-all duration-300 font-medium py-2 hover:translate-x-1 cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="block text-muted-foreground hover:text-foreground transition-all duration-300 font-medium py-2 hover:translate-x-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <LanguageSwitcher />
                  <Button 
                    variant="hero" 
                    className="flex-1"
                    onClick={() => {
                      navigate("/products");
                      setIsOpen(false);
                    }}
                  >
                    {t("nav.shopNow")}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
