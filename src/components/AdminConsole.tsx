import React, { useState, useEffect } from "react";
import { Lock, Mail, Trash2, CheckCircle, RefreshCw, Eye, EyeOff, Shield, Search, Calendar, Inbox, AlertCircle, X, Download } from "lucide-react";
import { ContactInquiry } from "../types";

interface AdminConsoleProps {
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLoginSuccess: (token: string) => void;
  onLogout: () => void;
}

export default function AdminConsole({ onClose, isAdminLoggedIn, onLoginSuccess, onLogout }: AdminConsoleProps) {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Messages management state
  const [messages, setMessages] = useState<ContactInquiry[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactInquiry | null>(null);

  // Search/Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");

  const getAdminToken = () => {
    return localStorage.getItem("portfolio_admin_token");
  };

  const fetchMessages = async () => {
    const token = getAdminToken();
    if (!token) return;

    setIsFetching(true);
    setFetchError(null);
    try {
      const response = await fetch("/api/admin/messages", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setMessages(data.messages);
      } else {
        setFetchError(data.error || "Failed to load messages.");
        if (response.status === 401) {
          onLogout(); // Token expired or invalid
        }
      }
    } catch (err) {
      setFetchError("Connection to backend lost.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchMessages();
    }
  }, [isAdminLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("portfolio_admin_token", data.token);
        onLoginSuccess(data.token);
        setPassword("");
      } else {
        setLoginError(data.error || "Incorrect credentials");
      }
    } catch (err) {
      setLoginError("Could not connect to auth microservice.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleMarkReadStatus = async (id: string, currentStatus: "read" | "unread") => {
    const token = getAdminToken();
    if (!token) return;

    const newStatus = currentStatus === "read" ? "unread" : "read";
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Error updating read state:", err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const token = getAdminToken();
    if (!token) return;

    if (!confirm("Are you sure you want to delete this message permanently? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const downloadBackupJSON = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio_inquiries_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Processing Search and Filtering
  const processedMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || m.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const readCount = messages.filter((m) => m.status === "read").length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
      id="admin-console-overlay"
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl relative animate-modalEnter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Console Header */}
        <div className="bg-slate-950 border-b border-slate-850 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <h2 className="font-sans font-extrabold text-slate-100 text-base">
                Developer Admin Console
              </h2>
              <p className="font-mono text-[10px] text-slate-500">
                ~/internal/security-gate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 border border-transparent hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all focus:outline-none"
            id="btn-close-admin-console"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Console Content */}
        <div className="flex-grow overflow-hidden flex flex-col">
          {!isAdminLoggedIn ? (
            /* Secure Login Gate */
            <div className="flex-grow flex items-center justify-center p-6 animate-fadeIn" id="admin-login-gate">
              <div className="max-w-md w-full bg-slate-950 border border-slate-850/80 p-8 rounded-2xl shadow-xl text-center space-y-6">
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-sans font-extrabold text-xl text-slate-100">
                    Authenticate Session
                  </h3>
                  <p className="font-sans text-slate-400 text-xs leading-relaxed">
                    Access restricted. Please enter the secure passphrase to establish a connection to the admin console.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  {loginError && (
                    <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg text-xs leading-relaxed">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="admin-passphrase" className="font-sans font-bold text-[10px] text-slate-400 uppercase tracking-wider">
                      Console Passphrase
                    </label>
                    <input
                      type="password"
                      id="admin-passphrase"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full font-mono text-sm text-slate-200 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full font-sans font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50 py-3 rounded-lg flex items-center justify-center gap-1.5 transition-all focus:outline-none cursor-pointer"
                    id="btn-admin-auth-submit"
                  >
                    {isLoggingIn ? (
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Establish Secure Connection"
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Secure Dashboard UI */
            <div className="flex-grow flex flex-col md:flex-row overflow-hidden animate-fadeIn" id="admin-dashboard-container">
              {/* Left pane: Inquiries Inbox List */}
              <div className="w-full md:w-2.5/5 border-r border-slate-850 flex flex-col h-full bg-slate-950/20 overflow-hidden">
                {/* Stats & Tools bar */}
                <div className="p-4 border-b border-slate-850 bg-slate-950/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans font-bold text-xs text-slate-300">
                      Inquiries Inbox
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetchMessages}
                        disabled={isFetching}
                        className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
                        title="Reload messages"
                        id="btn-admin-reload"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
                      </button>
                      <button
                        onClick={downloadBackupJSON}
                        disabled={messages.length === 0}
                        className="p-1 text-slate-400 hover:text-cyan-400 rounded-md transition-colors disabled:opacity-30"
                        title="Download JSON Database Backup"
                        id="btn-admin-backup"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Telemetry counters */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-900 border border-slate-850 rounded-lg p-2 text-center">
                      <span className="font-mono text-xs font-extrabold text-slate-300">{totalCount}</span>
                      <p className="font-sans text-[8px] text-slate-500 uppercase">Total</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-850 rounded-lg p-2 text-center relative overflow-hidden">
                      <span className="font-mono text-xs font-extrabold text-amber-400">{unreadCount}</span>
                      <p className="font-sans text-[8px] text-slate-500 uppercase">Unread</p>
                      {unreadCount > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                    </div>
                    <div className="bg-slate-900 border border-slate-850 rounded-lg p-2 text-center">
                      <span className="font-mono text-xs font-extrabold text-emerald-400">{readCount}</span>
                      <p className="font-sans text-[8px] text-slate-500 uppercase">Read</p>
                    </div>
                  </div>

                  {/* Search/Filters */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-grow">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search mail..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full font-sans text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-2 focus:outline-none focus:border-cyan-500/30 transition-colors"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e: any) => setFilterStatus(e.target.value)}
                      className="font-sans text-xs text-slate-400 bg-slate-900 border border-slate-800 rounded-lg px-2 py-2 focus:outline-none"
                    >
                      <option value="all">All</option>
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                </div>

                {/* Inbox Items Scroll List */}
                <div className="flex-grow overflow-y-auto divide-y divide-slate-900" id="admin-inbox-list">
                  {isFetching && messages.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 font-sans text-xs">
                      Synchronizing local records...
                    </div>
                  ) : fetchError ? (
                    <div className="p-8 text-center text-rose-400 font-sans text-xs space-y-2">
                      <AlertCircle className="w-5 h-5 mx-auto" />
                      <p>{fetchError}</p>
                    </div>
                  ) : processedMessages.length === 0 ? (
                    <div className="p-12 text-center space-y-3" id="admin-inbox-empty">
                      <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="font-sans text-xs text-slate-500">No matching inquiries found.</p>
                    </div>
                  ) : (
                    processedMessages.map((msg) => (
                      <button
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`w-full p-4 flex flex-col text-left transition-all relative ${
                          selectedMessage && selectedMessage.id === msg.id
                            ? "bg-slate-900"
                            : "hover:bg-slate-900/40 bg-transparent"
                        }`}
                        id={`inbox-item-${msg.id}`}
                      >
                        {/* Glow for unread */}
                        {msg.status === "unread" && (
                          <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r bg-cyan-400" />
                        )}

                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-sans font-bold text-xs text-slate-200 truncate">
                            {msg.name}
                          </span>
                          <span className="font-mono text-[9px] text-slate-500 shrink-0">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <span className="font-sans font-semibold text-[11px] text-slate-300 truncate mb-1">
                          {msg.subject}
                        </span>

                        <span className="font-sans text-[11px] text-slate-500 line-clamp-1 truncate">
                          {msg.message}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Right pane: Inquiry Detail View */}
              <div className="flex-grow flex flex-col h-full bg-slate-900 overflow-hidden relative text-left">
                {selectedMessage ? (
                  <div className="flex-grow flex flex-col h-full overflow-hidden animate-fadeIn" id="admin-message-details">
                    {/* Header Controls */}
                    <div className="bg-slate-950/40 p-4 border-b border-slate-850 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleMarkReadStatus(selectedMessage.id, selectedMessage.status)}
                          className="font-sans font-bold text-[10px] px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition focus:outline-none"
                          id="btn-admin-mark-read"
                        >
                          {selectedMessage.status === "read" ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-cyan-400" />}
                          Mark {selectedMessage.status === "read" ? "Unread" : "Read"}
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="font-sans font-bold text-[10px] px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-rose-300 flex items-center gap-1 transition focus:outline-none cursor-pointer"
                        id="btn-admin-delete"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete Permanently
                      </button>
                    </div>

                    {/* Meta info block */}
                    <div className="p-6 border-b border-slate-850 bg-slate-950/20 shrink-0 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-sans font-extrabold text-slate-100 text-lg">
                            {selectedMessage.subject}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-1">
                            <span className="font-sans text-xs font-semibold text-slate-300">
                              From: {selectedMessage.name}
                            </span>
                            <span className="h-3 w-px bg-slate-800 hidden sm:inline" />
                            <a
                              href={`mailto:${selectedMessage.email}`}
                              className="font-sans text-xs text-cyan-400 hover:underline break-all"
                            >
                              {selectedMessage.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                          <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {new Date(selectedMessage.createdAt).toLocaleString()}
                          </span>
                          <span
                            className={`font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                              selectedMessage.status === "unread"
                                ? "bg-amber-400/10 border-amber-400/20 text-amber-400"
                                : "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                            }`}
                          >
                            {selectedMessage.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actual Message Body */}
                    <div className="flex-grow p-6 overflow-y-auto bg-slate-950/10">
                      <p className="font-sans text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center p-6" id="admin-details-placeholder">
                    <div className="text-center space-y-2 max-w-sm">
                      <Mail className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="font-sans text-sm font-bold text-slate-400">Select an inquiry to read</p>
                      <p className="font-sans text-xs text-slate-500">
                        Submitted client payloads are stored securely inside the backend files. Select a record to review its metadata and body.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
