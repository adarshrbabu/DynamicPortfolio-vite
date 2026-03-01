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
          className="w-full"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white md:text-center">
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

          <div className="mt-12 flex flex-wrap gap-4 overflow-x-auto pb-4 justify-center hide-scrollbar">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass px-8 py-5 rounded-2xl flex-1 max-w-[200px] text-center border-t border-white/10 shrink-0"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-2">
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
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass px-8 py-5 rounded-2xl flex-1 max-w-[200px] text-center border-t border-white/10 shrink-0"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-2">
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
              transition={{ delay: 0.4, duration: 0.5 }}
              className="glass px-8 py-5 rounded-2xl flex-1 max-w-[200px] text-center border-t border-white/10 shrink-0"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-2">
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
