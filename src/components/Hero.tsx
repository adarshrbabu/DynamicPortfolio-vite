import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Loader2,
} from "lucide-react";

interface Profile {
  name: string;
  title: string;
  heroSubtitle: string;
  heroParagraph: string;
  yearsExperience: number;
  availableForWork: boolean;
  profileImage: string;
  resumeUrl?: string;
  links?: { name: string; url: string }[];
}

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${apiUrl}/api/profile`);
        const data = await res.json();
        if (data.success) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 relative">
        {/* Decorative Background Orbs for Transparency Aesthetic */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] -z-10 mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>

        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-xl"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-300">
              {loading
                ? "Loading profile..."
                : profile?.heroSubtitle || "Software Engineer"}
            </span>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white whitespace-pre-line">
            {loading ? "Loading..." : profile?.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed min-h-[80px] font-medium">
            {loading ? null : profile?.heroParagraph}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 mb-12 w-full sm:w-auto">
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark font-bold text-lg transition-all flex items-center justify-center gap-3 w-full sm:w-auto hover:-translate-y-1 shadow-lg"
            >
              Contact Me
              <ArrowRight
                size={20}
                className="transform group-hover:translate-x-1 transition-transform"
              />
            </a>
            {profile?.resumeUrl && (
              <button
                onClick={() => {
                  const apiUrl = import.meta.env.VITE_API_URL || "";
                  const targetUrl = `${apiUrl}${profile.resumeUrl}`;
                  window.open(targetUrl, "_blank");
                }}
                className="px-8 py-4 rounded-xl border border-white/20 glass hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center justify-center gap-3 w-full sm:w-auto hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                <Download size={20} />
                Download CV
              </button>
            )}
          </div>

          <div className="flex items-center gap-6 glass px-6 py-3 rounded-2xl border border-white/5">
            <span className="text-sm font-semibold tracking-wider uppercase text-gray-500">
              Connect
            </span>
            <div className="flex gap-4">
              {profile?.links?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 hover:-translate-y-1 transition-all"
                >
                  {link.name.toLowerCase() === "github" && <Github size={22} />}
                  {link.name.toLowerCase() === "linkedin" && (
                    <Linkedin size={22} />
                  )}
                  {link.name.toLowerCase() !== "github" &&
                    link.name.toLowerCase() !== "linkedin" &&
                    link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="text-gray-400 hover:text-emerald-400 hover:-translate-y-1 transition-all ml-2 border-l border-white/10 pl-5"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end mt-10 lg:mt-0"
        >
          <div className="relative group w-full max-w-sm mx-auto">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-2xl group-hover:bg-emerald-400/30 transition-all duration-500"></div>

            <div className="relative glass-dark border border-white/10 rounded-3xl p-3 shadow-2xl overflow-hidden aspect-4/5 w-full mx-auto transform transition-transform duration-500 group-hover:-translate-y-2">
              {loading ? (
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <Loader2
                    className="animate-spin text-emerald-400"
                    size={40}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-2xl overflow-hidden group/img bg-dark/50">
                  <img
                    src={"/Smiling man against yellow backdrop.png"}
                    alt="Portrait"
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              )}

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: [-20, -10, -20] }}
                transition={{
                  opacity: { delay: 0.6, duration: 0.5 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                }}
                className="absolute top-6 left-6 glass-dark border border-white/10 rounded-xl px-4 py-2 flex flex-col items-center shadow-lg"
              >
                <span className="text-emerald-400 font-bold text-xl">
                  {loading ? "-" : `${profile?.yearsExperience || 0}+`}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Years Exp.
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [20, 10, 20] }}
                transition={{
                  opacity: { delay: 0.8, duration: 0.5 },
                  y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1,
                  },
                }}
                className="absolute bottom-6 right-6 glass-dark border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-medium text-gray-300">
                  {loading
                    ? "..."
                    : profile?.availableForWork
                      ? "Available for work"
                      : "Currently occupied"}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Tech Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-dark/80 backdrop-blur-md py-6 hidden md:block overflow-hidden whitespace-nowrap"
      >
        <div className="text-center text-xs text-gray-500 uppercase tracking-widest mb-4">
          Technologies I work with
        </div>

        <div className="relative flex overflow-x-hidden group">
          <motion.div
            className="flex gap-16 text-gray-400 font-medium text-sm px-6"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          >
            {/* First set of technologies */}
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>GraphQL</span>
            <span>PostgreSQL</span>
            <span>MongoDB</span>
            <span>Tailwind CSS</span>
            <span>AWS</span>

            {/* Duplicated set for seamless infinite scroll */}
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>GraphQL</span>
            <span>PostgreSQL</span>
            <span>MongoDB</span>
            <span>Tailwind CSS</span>
            <span>AWS</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
