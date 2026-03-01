import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Loader2 } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  githubLink?: string;
  liveLink?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${apiUrl}/api/projects`);
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Use fallback dummy projects if the backend is empty or unreachable during this transition
  const displayProjects =
    projects.length > 0
      ? projects
      : [
          {
            _id: "preview1",
            title: "Backend Not Connected",
            description:
              "Setup MongoDB to begin managing dynamically injected projects here.",
            tech: ["Node.js", "Express", "MongoDB"],
            image:
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
          },
        ];

  return (
    <section id="projects" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work and engineering endeavors.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-px bg-white/10 z-0"></div>

          <div className="space-y-12">
            {loading ? (
              <div className="flex justify-center py-20 w-full relative z-20">
                <Loader2 className="animate-spin text-emerald-400" size={40} />
              </div>
            ) : (
              displayProjects.map((project, index) => {
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
                      <div className="glass-dark border border-white/5 p-6 md:p-8 rounded-2xl hover:border-emerald-400/30 transition-colors duration-500 overflow-hidden group">
                        <div className="aspect-video overflow-hidden rounded-xl mb-6 relative">
                          <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                          {project.title}
                        </h3>

                        <p
                          className={`text-gray-400 text-sm leading-relaxed mb-6 ${isEven ? "md:text-right text-left" : "text-left"}`}
                        >
                          {project.description}
                        </p>

                        <div
                          className={`flex flex-wrap gap-2 mb-6 ${isEven ? "md:justify-end justify-start" : "justify-start"}`}
                        >
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-white/5 text-emerald-300 rounded-full border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div
                          className={`flex items-center gap-4 ${isEven ? "md:justify-end justify-start" : "justify-start"}`}
                        >
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full glass hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors text-white"
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full glass hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors text-white"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
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
