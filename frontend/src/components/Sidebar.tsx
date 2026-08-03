"use client";

import React, { useRef, useState } from "react";

interface Document {
  filename: string;
  pages?: number;
  chunks?: number;
}

interface SidebarProps {
  currentView: "workspace" | "document_hub";
  setView: (view: "workspace" | "document_hub") => void;
  documents: Document[];
  selectedDoc: Document | null;
  setSelectedDoc: (doc: Document | null) => void;
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  onLogout?: () => void;
}

export default function Sidebar({
  currentView,
  setView,
  documents,
  selectedDoc,
  setSelectedDoc,
  onUpload,
  isUploading,
  onLogout,
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await onUpload(e.target.files[0]);
    }
  };

  return (
    <aside className="bg-surface-lowest text-on-surface h-screen w-sidebar fixed left-0 top-0 border-r border-outline-variant flex flex-col py-4 px-4 z-50 transition-colors">
      <div className="mb-6 mt-1">
        <h1 className="font-h1 font-bold text-white tracking-tight">AI Doc Assistant</h1>
        <p className="font-label-caps text-slate-400 mt-1 uppercase tracking-wider">
          Qdrant Connected
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />

      <button
        onClick={handleUploadClick}
        disabled={isUploading}
        className="bg-primary text-on-primary font-label-caps text-[11px] py-3 px-4 rounded flex items-center justify-center gap-2 mb-6 hover:opacity-90 active:scale-95 transition-all cursor-pointer font-bold disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-base">
          {isUploading ? "cyclone" : "upload_file"}
        </span>
        {isUploading ? "Uploading..." : "Upload PDF"}
      </button>

      <nav className="flex-1 space-y-1">
        {/* Navigation items */}
        <button
          onClick={() => setView("document_hub")}
          className={`w-full text-left font-bold flex items-center gap-3 px-3 py-2 transition-colors duration-200 rounded ${
            currentView === "document_hub"
              ? "text-white border-l-2 border-primary bg-slate-800/50"
              : "text-on-surface-variant hover:text-on-surface hover:bg-slate-800/30"
          }`}
        >
          <span className="material-symbols-outlined text-lg">folder</span>
          <span className="font-label-caps uppercase">Documents</span>
        </button>
        <button
          onClick={() => setView("workspace")}
          className={`w-full text-left font-bold flex items-center gap-3 px-3 py-2 transition-colors duration-200 rounded ${
            currentView === "workspace"
              ? "text-white border-l-2 border-primary bg-slate-800/50"
              : "text-on-surface-variant hover:text-on-surface hover:bg-slate-800/30"
          }`}
        >
          <span className="material-symbols-outlined text-lg">grid_view</span>
          <span className="font-label-caps uppercase">Workspace</span>
        </button>
      </nav>

      {/* Document List Section */}
      <div className="mt-4 pt-4 border-t border-outline-variant/30 flex-1 overflow-y-auto">
        <h3 className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-4 tracking-widest font-semibold">
          Indexed Documents
        </h3>
        <div className="space-y-2">
          {documents.map((doc, idx) => {
            const isSelected = selectedDoc?.filename === doc.filename;
            return (
              <div
                key={idx}
                onClick={() => {
                  setSelectedDoc(doc);
                  setView("workspace");
                }}
                className={`p-3 rounded-sm border cursor-pointer group transition-all ${
                  isSelected
                    ? "bg-slate-800/50 border-primary/50 text-white"
                    : "border-transparent hover:bg-slate-800/30 text-on-surface-variant"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`material-symbols-outlined text-sm transition-colors ${
                      isSelected
                        ? "text-primary"
                        : "text-on-surface-variant group-hover:text-primary"
                    }`}
                  >
                    description
                  </span>
                  <span
                    className={`font-label-mono text-[11px] truncate block max-w-[190px] ${
                      isSelected ? "text-white" : "group-hover:text-white"
                    }`}
                  >
                    {doc.filename}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-on-surface-variant/70 font-label-mono uppercase">
                  <span>{doc.pages || 0} pages</span>
                  <span>{doc.chunks || 0} chunks</span>
                </div>
              </div>
            );
          })}

          {documents.length === 0 && (
            <p className="text-body-sm italic text-on-surface-variant/50 p-2">
              No documents indexed.
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-outline-variant/30 space-y-1">
        <a
          className="text-on-surface-variant hover:text-on-surface flex items-center gap-3 px-3 py-2 transition-colors duration-200 text-body-sm font-semibold"
          href="#"
        >
          <span className="material-symbols-outlined text-lg">help</span>
          <span className="font-label-caps uppercase">Help</span>
        </a>
        <button
          onClick={onLogout}
          className="text-on-surface-variant hover:text-red-400 flex items-center gap-3 px-3 py-2 transition-colors duration-200 text-body-sm font-semibold w-full"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span className="font-label-caps uppercase">Logout</span>
        </button>
      </div>
    </aside>
  );
}
