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
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <div className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">
            PORTFOLIO
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A selection of my recent work and engineering endeavors.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20 w-full">
            <Loader2 className="animate-spin text-emerald-400" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, index) => {
              // Make the first project larger to create a "Bento Box" feel
              const isHero = index === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-3xl bg-emerald-900/10 border border-white/10 ${
                    isHero
                      ? "md:col-span-2 aspect-[4/3] md:aspect-[21/9]"
                      : "aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
                  } flex flex-col justify-end`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-dark/95 via-dark/60 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-100"></div>
                  </div>

                  {/* Overlay Content */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-4 gap-4">
                      <h3
                        className={`font-bold text-white leading-tight ${
                          isHero ? "text-3xl md:text-4xl" : "text-2xl"
                        }`}
                      >
                        {project.title}
                      </h3>

                      {/* Links: Appear explicitly on hover */}
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-dark border border-white/20 rounded-full hover:bg-emerald-500 hover:text-dark hover:border-emerald-500 text-white transition-all shadow-lg"
                          >
                            <Github size={20} />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-dark border border-white/20 rounded-full hover:bg-emerald-500 hover:text-dark hover:border-emerald-500 text-white transition-all shadow-lg"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-gray-300 mb-6 line-clamp-2 md:line-clamp-3 ${
                        isHero ? "text-lg max-w-2xl" : "text-sm"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-900/40 border border-emerald-500/30 rounded-full backdrop-blur-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
