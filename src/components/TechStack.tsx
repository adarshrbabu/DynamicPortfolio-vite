import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Smartphone, Loader2 } from "lucide-react";

// Fallback data if backend is empty
const fallbackSkills = [
  {
    category: "Frontend",
    iconName: "Layout",
    skills: "React, Vue, Tailwind CSS",
  },
  {
    category: "Backend",
    iconName: "Database",
    skills: "Node.js, Express, PostgreSQL",
  },
  {
    category: "Languages",
    iconName: "Code2",
    skills: "TypeScript, JavaScript, Python",
  },
  {
    category: "Mobile",
    iconName: "Smartphone",
    skills: "React Native",
  },
];

// Map string icon names from DB to actual lucide-react components
const getIcon = (iconName: string) => {
  const iconProps = { className: "text-emerald-400", size: 24 };
  switch (iconName) {
    case "Layout":
      return <Layout {...iconProps} />;
    case "Database":
      return <Database {...iconProps} />;
    case "Smartphone":
      return <Smartphone {...iconProps} />;
    case "Code2":
    default:
      return <Code2 {...iconProps} />;
  }
};

export default function TechStack() {
  const [techStack, setTechStack] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${apiUrl}/api/profile`);
        const data = await res.json();
        if (data.success && data.data?.techStack) {
          setTechStack(data.data.techStack);
        }
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const displaySkills = techStack.length > 0 ? techStack : fallbackSkills;

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Technical <span className="text-emerald-400">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, high-performance
            applications.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-emerald-400" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displaySkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  {getIcon(skill.iconName)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{skill.category}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {skill.skills}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
