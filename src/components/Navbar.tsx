import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:top-6 ${
        isScrolled
          ? "md:max-w-4xl md:mx-auto glass-dark border-white/10 md:rounded-full shadow-2xl py-4 px-6 md:px-8 bg-dark/80 backdrop-blur-xl"
          : "md:max-w-6xl md:mx-auto bg-transparent py-6 px-6 md:px-8 border-transparent"
      } flex justify-between items-center`}
    >
      <a href="#" className="text-2xl font-black tracking-tighter text-white">
        A<span className="text-emerald-400">R</span>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-300 hover:text-emerald-400 transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden text-gray-300 hover:text-white transition-colors"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center border-l border-white/5"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center space-y-8 text-2xl font-semibold">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors tracking-wide"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="absolute bottom-12 text-emerald-400/50 font-mono text-xs">
              ADARSH R BABU
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
