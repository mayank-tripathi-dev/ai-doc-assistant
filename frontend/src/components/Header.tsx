"use client";

import React, { useState, useRef, useEffect } from "react";
import { User } from "@/lib/auth";

interface HeaderProps {
  currentView: "workspace" | "document_hub";
  setView: (view: "workspace" | "document_hub") => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onNewSession: () => void;
  user?: User | null;
  onLogout?: () => void;
}

export default function Header({
  currentView,
  setView,
  darkMode,
  setDarkMode,
  onNewSession,
  user,
  onLogout,
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showUserMenu]);

  const getInitials = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  return (
    <header className="bg-surface-lowest text-on-surface border-b border-outline-variant fixed top-0 left-0 right-0 h-12 flex justify-between items-center px-6 ml-sidebar z-40 transition-colors">
      <div className="flex items-center gap-8">
        <span className="font-h2 text-lg font-black text-primary tracking-tight">
          AI Doc Assistant
        </span>
        <nav className="hidden md:flex gap-6 h-full items-center">
          <button
            onClick={() => setView("workspace")}
            className={`font-label-caps text-[11px] pb-1 uppercase tracking-wider transition-all h-full ${
              currentView === "workspace"
                ? "text-primary border-b-2 border-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Workspace
          </button>
          <button
            onClick={() => setView("document_hub")}
            className={`font-label-caps text-[11px] pb-1 uppercase tracking-wider transition-all h-full ${
              currentView === "document_hub"
                ? "text-primary border-b-2 border-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Document Hub
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative group">
          <input
            className="bg-surface-container-low border border-outline-variant px-4 py-1.5 rounded-full text-body-sm w-64 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder-on-surface-variant/50"
            placeholder="Search across docs..."
            type="text"
          />
          <span className="material-symbols-outlined absolute right-3 top-1.5 text-on-surface-variant text-sm">
            search
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-on-surface-variant hover:text-primary transition-all flex items-center justify-center p-1"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined">
            {darkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>

        {/* New Session */}
        <button
          onClick={onNewSession}
          className="bg-primary text-on-primary font-label-caps text-[10px] px-4 py-1.5 rounded hover:opacity-90 active:scale-95 transition-all uppercase font-bold"
        >
          New Session
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 border-l border-outline-variant pl-4" ref={menuRef}>
          <button className="text-on-surface-variant hover:text-primary transition-all p-1">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 bg-surface-container-high rounded-full flex items-center justify-center border border-outline-variant overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
            >
              {user?.profilePic ? (
                <img
                  className="w-full h-full object-cover"
                  alt="User Avatar"
                  src={user.profilePic}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-sm font-bold text-primary">
                  {getInitials()}
                </span>
              )}
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div
                className="absolute right-0 top-10 w-64 rounded-xl shadow-2xl overflow-hidden z-50"
                style={{
                  background: "rgba(22,27,34,0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(48,54,61,0.8)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="p-4 border-b" style={{ borderColor: "rgba(48,54,61,0.6)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant flex items-center justify-center bg-surface-container-high">
                      {user?.profilePic ? (
                        <img
                          className="w-full h-full object-cover"
                          alt="User Avatar"
                          src={user.profilePic}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-base font-bold text-primary">
                          {getInitials()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      {user?.name && (
                        <p className="text-sm font-semibold truncate" style={{ color: "#e6edf3" }}>
                          {user.name}
                        </p>
                      )}
                      <p className="text-xs truncate" style={{ color: "#8b949e" }}>
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-200 hover:bg-red-500/10"
                    style={{ color: "#f85149" }}
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
