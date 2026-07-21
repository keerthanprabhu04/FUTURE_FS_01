import React, { useState } from "react";
import { Mail, MapPin, Send, AlertCircle, CheckCircle, Terminal, Github, Linkedin, MessageSquare } from "lucide-react";
import { developerProfile } from "../data";

interface TerminalLine {
  text: string;
  type: "info" | "success" | "error" | "input";
  timestamp: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Terminal logging state
  const [terminalLogs, setTerminalLogs] = useState<TerminalLine[]>([
    { text: "SMTP Agent initialized.", type: "info", timestamp: "08:47:00" },
    { text: "Listening for form payload dispatch...", type: "info", timestamp: "08:47:02" }
  ]);

  const addTerminalLog = (text: string, type: "info" | "success" | "error" | "input") => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [...prev, { text, type, timestamp: time }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Initial terminal logging
    addTerminalLog(`Initiating payload serialization for [${formData.name}]`, "input");
    addTerminalLog(`POST /api/contact - Content-Length: ${JSON.stringify(formData).length} bytes`, "info");

    try {
      // Small timeout for visual terminal pacing
      await new Promise((resolve) => setTimeout(resolve, 800));

      addTerminalLog("Connecting to server-side Express transaction socket...", "info");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 600));

      if (response.ok && data.success) {
        addTerminalLog("Status: 201 Created - Payload successfully parsed.", "success");
        addTerminalLog("Inquiry written to server database (messages.json).", "success");
        addTerminalLog("Inquiry transaction complete! Connection closed gracefully.", "success");
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorMsg = data.error || "An error occurred while submitting.";
        addTerminalLog(`Status: ${response.status} - ${errorMsg}`, "error");
        setError(errorMsg);
      }
    } catch (err: any) {
      addTerminalLog(`Fatal: Network timeout or connection refused.`, "error");
      setError("Failed to connect to the backend server. Please verify dev server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSuccessState = () => {
    setSuccess(false);
    setError(null);
    setTerminalLogs([
      { text: "SMTP Agent re-initialized.", type: "info", timestamp: new Date().toLocaleTimeString() },
      { text: "Awaiting next form dispatch...", type: "info", timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900/60">
      {/* Decorative Blur Ambient Lighting */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider uppercase bg-cyan-400/5 border border-cyan-400/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-3">
            Let's Collaborate On Something Awesome
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Hiring managers, recruiters, clients, or peer developers — feel free to drop a message! I'll read and respond via your email immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Col 1: Contact details & Mock Terminal (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <h3 className="font-sans font-extrabold text-xl text-slate-100">
                Contact Details
              </h3>

              {/* Badges Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-900 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-slate-300 text-xs uppercase tracking-wider">Email Address</span>
                    <a href={`mailto:${developerProfile.email}`} className="font-sans text-sm text-slate-300 hover:text-cyan-400 transition-colors mt-0.5 break-all">
                      {developerProfile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-900 p-4 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-slate-300 text-xs uppercase tracking-wider">Office Location</span>
                    <span className="font-sans text-sm text-slate-300 mt-0.5">
                      {developerProfile.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock SMTP Socket Logging Terminal (Recruiters love this) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl" id="smtp-terminal-logs">
              {/* Terminal Titlebar */}
              <div className="bg-slate-950 border-b border-slate-850 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-400">express-api-logger.sh</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Logs Stream */}
              <div className="p-4 font-mono text-[11px] leading-relaxed max-h-[160px] overflow-y-auto space-y-1.5 text-left bg-slate-950">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
                    <span
                      className={`${
                        log.type === "success"
                          ? "text-emerald-400"
                          : log.type === "error"
                          ? "text-rose-400 animate-pulse"
                          : log.type === "input"
                          ? "text-cyan-400"
                          : "text-slate-400"
                      }`}
                    >
                      {log.type === "input" ? "> " : ""}
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Interactive Submission Form (Col 7) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/50 border border-slate-900 p-6 md:p-8 rounded-2xl shadow-lg relative" id="contact-form-container">
              {success ? (
                <div className="text-center py-12 space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-extrabold text-2xl text-slate-100">
                      Inquiry Logged Successfully!
                    </h3>
                    <p className="font-sans text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. The Express backend has successfully stored your inquiry in the file database. You can also view it in the <strong>Admin Console</strong> above.
                    </p>
                  </div>
                  <button
                    onClick={resetSuccessState}
                    className="font-sans font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200 shadow-sm focus:outline-none"
                    id="btn-send-another-message"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left" id="contact-submission-form">
                  {error && (
                    <div className="flex items-start gap-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm leading-relaxed">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-sans font-semibold text-xs text-slate-300 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full font-sans text-sm text-slate-200 placeholder-slate-600 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-sans font-semibold text-xs text-slate-300 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        className="w-full font-sans text-sm text-slate-200 placeholder-slate-600 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="font-sans font-semibold text-xs text-slate-300 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Collaboration opportunity, project advice..."
                      className="w-full font-sans text-sm text-slate-200 placeholder-slate-600 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-sans font-semibold text-xs text-slate-300 uppercase tracking-wider">
                      Message Content
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi John Doe , I saw your portfolio and wanted to discuss a full-stack internship opportunity..."
                      className="w-full font-sans text-sm text-slate-200 placeholder-slate-600 bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-sans font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50 px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-md hover:-translate-y-0.5 focus:outline-none"
                    id="btn-submit-contact"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        Transmitting Payload...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Dispatch Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
