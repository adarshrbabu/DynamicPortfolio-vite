import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Experience {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  tech: string[];
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${apiUrl}/api/experience`);
        const data = await res.json();
        if (data.success) {
          setExperiences(data.data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">
            CAREER JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-emerald-400">Experience that</span>{" "}
            <span className="italic font-serif font-light text-gray-300">
              speaks volumes.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            A timeline of my professional growth, from curious beginner to
            senior engineer leading teams and building products at scale.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-white/10 z-0"></div>

          <div className="space-y-24">
            {loading ? (
              <div className="flex justify-center py-20 w-full relative z-20">
                <Loader2 className="animate-spin text-emerald-400" size={40} />
              </div>
            ) : (
              experiences.map((exp, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:justify-start" : "md:justify-end"}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] z-10" />

                    {/* Content Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 50, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.1,
                      }}
                      className={`w-full md:w-[45%] pl-8 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                    >
                      <div className="glass-dark border border-white/5 p-6 md:p-8 rounded-2xl hover:border-emerald-400/30 transition-colors duration-500">
                        <div
                          className={`text-emerald-400 text-sm font-medium mb-2 ${isEven ? "md:justify-end justify-start" : "justify-start"} flex`}
                        >
                          {exp.duration}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <h4 className="text-gray-400 text-sm font-medium mb-6">
                          {exp.company}
                        </h4>

                        <ul
                          className={`text-gray-400 text-sm leading-relaxed mb-6 space-y-2 ${isEven ? "md:text-right text-left" : ""}`}
                        >
                          {exp.description.map((desc, i) => (
                            <li key={i} className="list-disc list-inside">
                              {desc}
                            </li>
                          ))}
                        </ul>

                        <div
                          className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end justify-start" : "justify-start"}`}
                        >
                          {exp.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
