import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Profile {
  name: string;
  title: string;
  heroSubtitle: string;
  heroParagraph: string;
  aboutParagraphs: string[];
  yearsExperience: number;
  availableForWork: boolean;
  profileImage: string;
}

export default function About() {
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
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto glass rounded-3xl p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

        {/* Left Column - Image */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-5/12 relative group"
        >
          <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
          {loading ? (
            <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <Loader2 className="animate-spin text-emerald-400" size={30} />
            </div>
          ) : (
            <div className="relative z-10 w-full rounded-2xl shadow-2xl aspect-4/5 overflow-hidden group/img">
              <div className="absolute inset-0 bg-linear-to-bl from-emerald-900/60 to-dark/40 mix-blend-multiply z-10 transition-opacity duration-500 group-hover/img:opacity-0" />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] z-10 rounded-2xl pointer-events-none" />
              <img
                src={profile?.profileImage}
                alt="Developer at work"
                className="w-full h-full object-cover brightness-75 contrast-125 saturate-50 group-hover/img:brightness-100 group-hover/img:saturate-100 group-hover/img:scale-105 transition-all duration-700"
              />
            </div>
          )}
        </motion.div>

        {/* Right Column - Text & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full md:w-7/12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            About <span className="text-emerald-400">Me</span>
          </h2>

          <div className="space-y-6 text-gray-300 text-lg leading-relaxed relative min-h-[150px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-400" size={30} />
              </div>
            ) : profile?.aboutParagraphs ? (
              profile.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>Profile information is currently unavailable.</p>
            )}
          </div>

          <div className="mt-10 flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="glass px-6 py-4 rounded-xl flex-1 min-w-[140px] text-center border-t border-white/10 shrink-0"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-1">
                {loading ? "-" : `${profile?.yearsExperience || 0}+`}
              </div>
              <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                Years Exp
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="glass px-6 py-4 rounded-xl flex-1 min-w-[140px] text-center border-t border-white/10 shrink-0"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-1">
                20+
              </div>
              <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                Projects
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="glass px-6 py-4 rounded-xl flex-1 min-w-[140px] text-center border-t border-white/10 shrink-0"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-1">
                100%
              </div>
              <div className="text-sm text-gray-400 font-medium tracking-wide uppercase">
                Remote Ready
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
