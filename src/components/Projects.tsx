import { useState } from "react";
import { ExternalLink, Github, Layers, CheckCircle, X, Eye } from "lucide-react";
import { projectsData } from "../data";
import { Project } from "../types";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ["All", "Full Stack", "Frontend", "AI/Data"];

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900/60">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase bg-cyan-400/5 border border-cyan-400/10 px-3 py-1 rounded-full">
            Featured Tasks & Projects
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-3">
            Proof of Work & Code Quality
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            A curated showcase of interactive full-stack and frontend systems, including Future Interns training tasks, designed to prove architectural competence and system safety.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans font-semibold text-xs sm:text-sm px-4.5 py-2 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none ${
                selectedCategory === cat
                  ? "bg-slate-900 border border-cyan-500/50 text-cyan-400 shadow-sm"
                  : "bg-slate-900/40 hover:bg-slate-900/70 border border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
              id={`filter-btn-${cat.toLowerCase().replace(" ", "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900/30 border border-slate-900/80 hover:border-slate-800/80 rounded-2xl overflow-hidden shadow-md flex flex-col h-full transition-all duration-300"
            >
              {/* Project Image Panel */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-900/65">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="font-sans font-semibold text-xs text-slate-950 bg-white hover:bg-slate-100 px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer transition-transform duration-200 hover:scale-[1.03] focus:outline-none"
                    id={`btn-hover-details-${project.id}`}
                  >
                    <Eye className="w-4 h-4" />
                    Read Case Study
                  </button>
                </div>

                {/* Category Badge */}
                <span className="absolute top-3 left-3 font-mono text-[10px] font-bold tracking-wide uppercase bg-slate-950/85 border border-slate-800 text-cyan-400 px-2.5 py-1 rounded-md shadow">
                  {project.category}
                </span>
              </div>

              {/* Project Metadata */}
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <div>
                  <h3 className="font-sans font-bold text-slate-100 text-xl tracking-tight mb-2 group-hover:text-cyan-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="font-sans text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-slate-400 bg-slate-950 border border-slate-900 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="h-px bg-slate-900/60" />

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="font-sans font-bold text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors focus:outline-none"
                      id={`btn-link-details-${project.id}`}
                    >
                      Case Study
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-slate-100 bg-slate-900/60 border border-slate-900 rounded-lg hover:border-slate-800 transition-all duration-200"
                        title="Source Code"
                        id={`btn-code-link-${project.id}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-900/60 border border-slate-900 rounded-lg hover:border-slate-800 transition-all duration-200"
                        title="Live Demonstration"
                        id={`btn-demo-link-${project.id}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Details Modal Overlay */}
      {activeProjectModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          id="project-case-study-modal"
          onClick={() => setActiveProjectModal(null)}
        >
          <div
            className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl my-8 animate-modalEnter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Panel */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-all duration-200 cursor-pointer focus:outline-none"
                id="btn-close-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="absolute bottom-4 left-4 font-mono text-[10px] font-bold tracking-wide uppercase bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 px-3 py-1 rounded-md shadow-sm">
                {activeProjectModal.category} Case Study
              </span>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto text-left space-y-6">
              {/* Header */}
              <div>
                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-100 tracking-tight">
                  {activeProjectModal.title}
                </h3>
                {activeProjectModal.role && (
                  <p className="font-mono text-xs text-slate-400 mt-1 uppercase tracking-wide">
                    Role: <span className="text-cyan-400 font-bold">{activeProjectModal.role}</span>
                  </p>
                )}
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="font-sans font-bold text-slate-300 text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Project Overview & Architecture
                </h4>
                <p className="font-sans text-slate-400 text-sm leading-relaxed">
                  {activeProjectModal.longDescription || activeProjectModal.description}
                </p>
              </div>

              {/* Structural Challenges (Critical Recruiter proof) */}
              {activeProjectModal.challenges && (
                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4 space-y-2">
                  <h4 className="font-sans font-bold text-cyan-400 text-xs uppercase tracking-wider">
                    Engineering Challenges & Solutions
                  </h4>
                  <p className="font-sans text-slate-300 text-xs leading-relaxed">
                    {activeProjectModal.challenges}
                  </p>
                </div>
              )}

              {/* Highlights Checklist */}
              {activeProjectModal.highlights && activeProjectModal.highlights.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-sans font-bold text-slate-300 text-sm uppercase tracking-wider">
                    Key Performance Highlights
                  </h4>
                  <ul className="space-y-2.5 list-none">
                    {activeProjectModal.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeProjectModal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-slate-300 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Links */}
            <div className="bg-slate-950/60 border-t border-slate-800/80 px-6 py-4 flex items-center justify-end gap-3">
              <a
                href={activeProjectModal.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="font-sans font-semibold text-xs text-slate-300 hover:text-white hover:bg-slate-800 bg-slate-900 border border-slate-800 hover:border-slate-750 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-200"
                id="modal-code-link"
              >
                <Github className="w-3.5 h-3.5 text-slate-400" />
                View Source Code
              </a>
              <a
                href={activeProjectModal.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-sans font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 shadow-sm"
                id="modal-demo-link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Launch Live App
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
