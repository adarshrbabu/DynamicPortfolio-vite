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
      <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 relative z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative"
        >
          {/* Decorative Quote Mark */}
          <div className="absolute -top-10 -left-6 text-7xl text-emerald-500/10 font-serif select-none pointer-events-none">
            "
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-10 text-white md:text-center tracking-tight">
            About <span className="text-emerald-400">Me</span>
          </h2>

          <div className="space-y-8 relative min-h-[150px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-emerald-400" size={30} />
              </div>
            ) : profile?.aboutParagraphs ? (
              <div className="max-w-3xl mx-auto flex flex-col gap-6">
                {profile.aboutParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`leading-relaxed ${
                      idx === 0
                        ? "text-xl md:text-2xl font-medium text-emerald-50 tracking-wide"
                        : "text-lg text-gray-400"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400">
                Profile information is currently unavailable.
              </p>
            )}
          </div>

          <div className="mt-16 pt-12 border-t border-white/5 flex flex-wrap gap-6 overflow-x-auto pb-4 justify-center hide-scrollbar">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group glass relative overflow-hidden px-8 py-6 rounded-2xl flex-1 max-w-[220px] text-center border border-white/10 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-300 shrink-0 shadow-lg"
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative z-10 text-5xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors">
                {loading ? "-" : `${profile?.yearsExperience || 0}+`}
              </div>
              <div className="relative z-10 text-xs text-emerald-400 font-bold tracking-widest uppercase">
                Years Exp
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="group glass relative overflow-hidden px-8 py-6 rounded-2xl flex-1 max-w-[220px] text-center border border-white/10 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-300 shrink-0 shadow-lg"
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative z-10 text-5xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors">
                20+
              </div>
              <div className="relative z-10 text-xs text-emerald-400 font-bold tracking-widest uppercase">
                Projects
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="group glass relative overflow-hidden px-8 py-6 rounded-2xl flex-1 max-w-[220px] text-center border border-white/10 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-300 shrink-0 shadow-lg"
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-transparent transition-all duration-500"></div>
              <div className="relative z-10 text-5xl font-black text-white mb-2 group-hover:text-emerald-300 transition-colors">
                100%
              </div>
              <div className="relative z-10 text-xs text-emerald-400 font-bold tracking-widest uppercase">
                Remote Ready
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
