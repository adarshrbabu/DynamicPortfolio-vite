import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex justify-between items-center"
    >
      <div className="text-xl font-bold text-emerald-400">AR </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        <a href="#about" className="hover:text-emerald-400 transition-colors">
          About
        </a>
        <a
          href="#experience"
          className="hover:text-emerald-400 transition-colors"
        >
          Experience
        </a>
        <a href="#skills" className="hover:text-emerald-400 transition-colors">
          Skills
        </a>
        <a
          href="#projects"
          className="hover:text-emerald-400 transition-colors"
        >
          Projects
        </a>
        <a href="#contact" className="hover:text-emerald-400 transition-colors">
          Contact
        </a>
      </div>
      <button className="md:hidden text-gray-300 hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </motion.nav>
  );
}
