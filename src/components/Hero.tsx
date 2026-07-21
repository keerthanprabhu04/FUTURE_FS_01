import { useState, useEffect } from "react";
import {
  Terminal,
  ArrowRight,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { developerProfile } from "../data";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = [
    "Full Stack Web Developer",
    "React/Vite Engineer",
    "Node.js & Express Architect",
    "Systems Engineering Student",
  ];

  useEffect(() => {
    const currentFullText = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText((prev) =>
          currentFullText.substring(0, prev.length + 1)
        );

        if (typedText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setTypedText((prev) =>
          currentFullText.substring(0, prev.length - 1)
        );

        if (typedText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(100);
        } else {
          setTypingSpeed(40);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex, typingSpeed]);

  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");

    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center bg-slate-950 overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-indigo-500/5 blur-2xl" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Main Hero Content */}
        <div className="flex flex-col space-y-6 text-left max-w-4xl">

          {/* Availability Status */}
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800/80 px-3.5 py-1.5 rounded-full w-fit">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>

            <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wide uppercase">
              {developerProfile.availability}
            </span>
          </div>

          {/* Name and Role */}
          <div className="space-y-2">
            <h1 className="font-sans font-extrabold text-slate-100 text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                {developerProfile.name}
              </span>
            </h1>

            <div className="h-8 sm:h-10 flex items-center">
              <span className="font-mono text-lg sm:text-2xl text-slate-300 font-medium flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-cyan-400" />

                <span>{typedText}</span>

                <span className="w-2.5 h-6 bg-cyan-400 ml-1.5 animate-pulse" />
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="font-sans text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
            {developerProfile.tagline} {developerProfile.about}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">

            <button
              onClick={handleScrollToProjects}
              className="font-sans font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-6 py-3.5 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:outline-none"
              id="btn-explore-projects"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrintResume}
              className="font-sans font-semibold text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 px-6 py-3.5 rounded-xl flex items-center gap-2 hover:shadow-md transition-all duration-200 cursor-pointer focus:outline-none"
              id="btn-print-resume"
            >
              <Download className="w-4 h-4 text-slate-400" />
              Download CV
            </button>

          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-900 w-fit">

            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
              Connect:
            </span>

            <a
              href={developerProfile.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white hover:scale-105 transition-all duration-150"
              id="hero-github-link"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={developerProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 hover:scale-105 transition-all duration-150"
              id="hero-linkedin-link"
            >
              <Linkedin className="w-5 h-5" />
            </a>

          </div>

        </div>

        {/* Statistics */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 border-t border-slate-900 pt-10"
          id="hero-stats"
        >
          {[
            { metric: "1", label: "Active Internship" },
            { metric: "4+", label: "Finished Tasks" },
            { metric: "15+", label: "Modern Skills" },
            { metric: "100%", label: "Responsive Layouts" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-slate-900/40 hover:bg-slate-900/60 border border-slate-900/60 hover:border-slate-800/80 rounded-xl p-4 text-center transition-all duration-200"
            >
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-cyan-400 tracking-tight">
                {stat.metric}
              </h3>

              <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}