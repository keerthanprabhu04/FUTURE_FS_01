import { useState } from "react";
import {
  Layout, Server, Settings, Briefcase, GraduationCap, Code,
  Atom, FileCode, Palette, Zap, Activity, Terminal, Cpu, Network,
  Database, Shield, GitBranch, Layers, Cloud, Eye, ChevronRight
} from "lucide-react";
import { skillsData, experienceData, educationData, developerProfile } from "../data";

// Helper to resolve icon components dynamically based on iconName string safely
const getSkillIcon = (name: string) => {
  switch (name) {
    case "Atom": return <Atom className="w-4 h-4 text-cyan-400" />;
    case "FileCode": return <FileCode className="w-4 h-4 text-cyan-400" />;
    case "Palette": return <Palette className="w-4 h-4 text-cyan-400" />;
    case "Zap": return <Zap className="w-4 h-4 text-cyan-400" />;
    case "Code": return <Code className="w-4 h-4 text-cyan-400" />;
    case "Activity": return <Activity className="w-4 h-4 text-cyan-400" />;
    case "Terminal": return <Terminal className="w-4 h-4 text-cyan-400" />;
    case "Cpu": return <Cpu className="w-4 h-4 text-cyan-400" />;
    case "Network": return <Network className="w-4 h-4 text-cyan-400" />;
    case "Database": return <Database className="w-4 h-4 text-cyan-400" />;
    case "Shield": return <Shield className="w-4 h-4 text-cyan-400" />;
    case "GitBranch": return <GitBranch className="w-4 h-4 text-cyan-400" />;
    case "Layers": return <Layers className="w-4 h-4 text-cyan-400" />;
    case "Cloud": return <Cloud className="w-4 h-4 text-cyan-400" />;
    case "Eye": return <Eye className="w-4 h-4 text-cyan-400" />;
    default: return <Code className="w-4 h-4 text-cyan-400" />;
  }
};

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Layout": return <Layout className="w-5 h-5 text-cyan-400" />;
    case "Server": return <Server className="w-5 h-5 text-cyan-400" />;
    case "Settings": return <Settings className="w-5 h-5 text-cyan-400" />;
    default: return <Settings className="w-5 h-5 text-cyan-400" />;
  }
};

type TabType = "skills" | "experience" | "education";

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>("skills");

  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900/60">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase bg-cyan-400/5 border border-cyan-400/10 px-3 py-1 rounded-full">
            Background & Credentials
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-3">
            About My Developer Journey
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            I construct secure, responsive web structures from frontend rendering algorithms down to performant API routers. Here is a comprehensive look into my technical skills, career, and training.
          </p>
        </div>

        {/* Tab System Controls */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-900/80 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
            {[
              { id: "skills", label: "Skills Matrix", icon: <Code className="w-4 h-4" /> },
              { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
              { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`font-sans font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer focus:outline-none ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                id={`tab-btn-${tab.id}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[400px]" id="about-tab-panel">
          {/* TAB: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-12 animate-fadeIn" id="skills">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skillsData.map((category) => (
                  <div
                    key={category.id}
                    className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 shadow-sm hover:border-slate-850 transition-all duration-300"
                  >
                    {/* Category Title */}
                    <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                        {getCategoryIcon(category.icon)}
                      </div>
                      <h3 className="font-sans font-bold text-slate-100 text-lg">
                        {category.name}
                      </h3>
                    </div>

                    {/* Skill Items */}
                    <div className="space-y-5">
                      {category.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-sans text-xs font-semibold text-slate-300 flex items-center gap-2">
                              {getSkillIcon(skill.iconName)}
                              {skill.name}
                            </span>
                            <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                              {skill.level}%
                            </span>
                          </div>
                          {/* Progress Bar Track */}
                          <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn" id="experience">
              <div className="relative border-l border-slate-800 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12 text-left">
                {experienceData.map((exp, index) => (
                  <div key={exp.id} className="relative group">
                    {/* Timeline Node Ring */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 ring-4 ring-cyan-500/15 group-hover:scale-110 transition-transform duration-200" />

                    {/* Timeline Event Content */}
                    <div className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 shadow-sm hover:border-slate-850 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <h3 className="font-sans font-extrabold text-lg text-slate-100 group-hover:text-cyan-400 transition-colors duration-200">
                            {exp.role}
                          </h3>
                          <p className="font-mono text-sm text-slate-400 font-medium mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                        <span className="font-sans text-xs font-semibold text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 px-3 py-1 rounded-full w-fit self-start sm:self-auto shadow-sm">
                          {exp.duration}
                        </span>
                      </div>

                      {/* Accomplishments Bullet Points */}
                      <ul className="space-y-2.5 text-slate-400 text-sm leading-relaxed mb-6 list-none">
                        {exp.description.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <ChevronRight className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technology Badges */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] text-slate-300 bg-slate-950 border border-slate-900 px-2.5 py-1 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDUCATION */}
          {activeTab === "education" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn" id="education">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-slate-900/40 border border-slate-900/80 rounded-2xl p-6 shadow-sm hover:border-slate-850 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="font-sans text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded-lg">
                          {edu.duration}
                        </span>
                      </div>
                      <h3 className="font-sans font-bold text-slate-100 text-lg leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="font-mono text-xs text-slate-400 font-semibold mt-1">
                        {edu.institution}
                      </p>
                      <p className="font-sans text-slate-400 text-sm mt-4 leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
