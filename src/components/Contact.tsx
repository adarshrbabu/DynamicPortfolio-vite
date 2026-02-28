import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus("error");
        setResponseMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setStatus("error");
      setResponseMessage("Network error. Please try again.");
    }

    // Reset status message after 5 seconds
    setTimeout(() => {
      setStatus("idle");
      setResponseMessage("");
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Let's <span className="text-emerald-400">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to explore opportunities? Drop a
            message!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                  <Mail className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Email</h4>
                  <a
                    href="mailto:adarshrbabu4350@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    adarshrbabu4350@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0">
                  <MapPin className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">Location</h4>
                  <p className="text-gray-400">Trivandrum , India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-3xl relative"
            onSubmit={handleSubmit}
          >
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed rounded-xl text-dark font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/25"
              >
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>

              {responseMessage && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm font-medium text-center ${
                    status === "success"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {responseMessage}
                </div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
