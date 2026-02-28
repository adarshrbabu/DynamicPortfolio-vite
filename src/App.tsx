import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CursorGlow from "./components/CursorGlow";

function App() {
  return (
    <div className="min-h-screen bg-dark selection:bg-blue-500/30 relative">
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>
          © {new Date().getFullYear()} Software Developer. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
