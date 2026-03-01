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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:text-center"
        >
          <div className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">
            PORTFOLIO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-emerald-400">Featured</span> Work
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A deep dive into some of the most complex and impactful projects
            I've built.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20 w-full">
            <Loader2 className="animate-spin text-emerald-400" size={40} />
          </div>
        ) : (
          <div className="flex flex-col gap-24 md:gap-32">
            {displayProjects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-16 items-center`}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-7/12 relative group cursor-pointer lg:-mx-4 z-0">
                    <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative rounded-2xl overflow-hidden glass border border-white/10 aspect-16/10 md:aspect-video transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Text Side */}
                  <div
                    className={`w-full lg:w-5/12 flex flex-col ${
                      isEven
                        ? "lg:items-end text-left lg:text-right"
                        : "lg:items-start text-left"
                    } z-10`}
                  >
                    <p className="text-emerald-400 font-mono text-sm mb-2">
                      Featured Project
                    </p>
                    <h3 className="text-3xl font-bold text-white mb-6">
                      {project.title}
                    </h3>

                    {/* Elevated Description Box */}
                    <div className="group/box glass-dark border border-white/5 p-6 rounded-xl shadow-2xl mb-6 relative w-full lg:min-w-[120%] hover:bg-white/5 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-emerald-900/20 transition-all duration-300">
                      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-emerald-500/0 group-hover/box:from-emerald-500/5 transition-all duration-500 rounded-xl rounded-tl-xl"></div>
                      <p className="text-gray-300 leading-relaxed text-base relative z-10 group-hover/box:text-white transition-colors duration-300">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <ul
                      className={`flex flex-wrap gap-x-3 gap-y-2 mb-8 font-mono text-sm ${
                        isEven
                          ? "lg:justify-end justify-start"
                          : "justify-start"
                      }`}
                    >
                      {project.tech.map((tech, i) => (
                        <li
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 cursor-default transition-all duration-300"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {/* Links */}
                    <div
                      className={`flex items-center gap-6 ${
                        isEven
                          ? "lg:justify-end justify-start"
                          : "justify-start"
                      }`}
                    >
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 font-medium bg-white/5 hover:bg-emerald-500/20 px-4 py-2 rounded-lg border border-white/10"
                        >
                          <Github size={18} />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 font-medium bg-white/5 hover:bg-emerald-500/20 px-4 py-2 rounded-lg border border-white/10"
                        >
                          <ExternalLink size={18} />
                          <span>Live</span>
                        </a>
                      )}
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
