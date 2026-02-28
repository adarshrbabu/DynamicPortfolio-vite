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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work and engineering endeavors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-1 lg:col-span-3 flex justify-center py-20">
              <Loader2 className="animate-spin text-emerald-400" size={40} />
            </div>
          ) : (
            displayProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative rounded-2xl overflow-hidden glass border border-white/5 flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-white/5 text-emerald-300 rounded-full border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
