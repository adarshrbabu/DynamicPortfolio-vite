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
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-400">
              {loading
                ? "Loading profile..."
                : profile?.heroSubtitle || "Software Engineer"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight text-white whitespace-pre-line">
            {loading ? "Loading..." : profile?.title}
          </h1>

          <p className="text-gray-400 mb-10 max-w-lg leading-relaxed min-h-[80px]">
            {loading ? null : profile?.heroParagraph}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark font-semibold transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Contact Me
              <ArrowRight size={18} />
            </a>
            {profile?.resumeUrl && (
              <button
                onClick={() => {
                  const apiUrl = import.meta.env.VITE_API_URL || "";
                  const targetUrl = `${apiUrl}${profile.resumeUrl}`;
                  // Simply opening the URL will trigger a download because our backend
                  // sets the 'Content-Disposition: attachment' header.
                  window.open(targetUrl, "_blank");
                }}
                className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white font-medium transition-all flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer"
              >
                <Download size={18} />
                Download CV
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Follow me:</span>
            <div className="flex gap-3">
              {profile?.links?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name.toLowerCase() === "github" && <Github size={20} />}
                  {link.name.toLowerCase() === "linkedin" && (
                    <Linkedin size={20} />
                  )}
                  {link.name.toLowerCase() !== "github" &&
                    link.name.toLowerCase() !== "linkedin" &&
                    link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="text-gray-400 hover:text-white transition-colors ml-2 border-l border-white/10 pl-4"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Photo Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-2xl group-hover:bg-emerald-500/30 transition-colors duration-500"></div>

            <div className="relative glass-dark border border-white/5 rounded-3xl p-3 shadow-2xl overflow-hidden aspect-3/4 max-w-sm w-full mx-auto">
              {loading ? (
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <Loader2
                    className="animate-spin text-emerald-400"
                    size={30}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-2xl overflow-hidden group/img">
                  <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/60 to-dark/40 mix-blend-multiply z-10 transition-opacity duration-500 group-hover/img:opacity-0" />
                  <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] z-10 rounded-2xl pointer-events-none" />
                  <img
                    src={"/Smiling man against yellow backdrop.png"}
                    alt="Portrait"
                    className="w-full h-full object-cover brightness-75 contrast-125 saturate-50 group-hover/img:brightness-100 group-hover/img:saturate-100 group-hover/img:scale-105 transition-all duration-700"
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
