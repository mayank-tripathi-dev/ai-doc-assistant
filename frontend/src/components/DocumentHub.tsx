"use client";

import React, { useRef, useState } from "react";

interface Document {
  filename: string;
  pages?: number;
  chunks?: number;
}

interface DocumentHubProps {
  documents: Document[];
  onUpload: (file: File) => Promise<void>;
  onDelete: (filename: string) => Promise<void>;
  isUploading: boolean;
  onSelectDoc: (doc: Document) => void;
}

export default function DocumentHub({
  documents,
  onUpload,
  onDelete,
  isUploading,
  onSelectDoc,
}: DocumentHubProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Stats calculation
  const totalDocs = documents.length;
  const totalPages = documents.reduce((acc, curr) => acc + (curr.pages || 0), 0);
  const totalChunks = documents.reduce((acc, curr) => acc + (curr.chunks || 0), 0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        await onUpload(file);
      } else {
        alert("Only PDF files are supported");
      }
    }
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto h-[calc(100vh-48px)] mt-12 bg-background transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-outline-variant/30 pb-6">
          <div>
            <h2 className="font-display font-bold text-on-surface tracking-tight">
              Document Hub
            </h2>
            <p className="text-body-sm text-on-surface-variant/80 mt-1">
              Upload, inspect, and manage your documents for AI semantic RAG analysis.
            </p>
          </div>
          <button
            onClick={handleBrowseFiles}
            disabled={isUploading}
            className="bg-primary text-on-primary font-label-caps text-[11px] py-2.5 px-5 rounded flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all font-bold disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            Upload Document
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container border border-outline-variant/50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-on-surface-variant uppercase">
                Total Documents
              </span>
              <span className="material-symbols-outlined text-primary text-lg">folder</span>
            </div>
            <div className="font-display text-3xl font-black text-on-surface">
              {totalDocs}
            </div>
            <p className="text-[11px] text-on-surface-variant/70 mt-1">
              Active and indexed in Qdrant DB
            </p>
          </div>

          <div className="bg-surface-container border border-outline-variant/50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-on-surface-variant uppercase">
                Total Pages
              </span>
              <span className="material-symbols-outlined text-primary text-lg">description</span>
            </div>
            <div className="font-display text-3xl font-black text-on-surface">
              {totalPages}
            </div>
            <p className="text-[11px] text-on-surface-variant/70 mt-1">
              Pages processed and parsed
            </p>
          </div>

          <div className="bg-surface-container border border-outline-variant/50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-caps text-on-surface-variant uppercase">
                Semantic Chunks
              </span>
              <span className="material-symbols-outlined text-primary text-lg">database</span>
            </div>
            <div className="font-display text-3xl font-black text-on-surface">
              {totalChunks}
            </div>
            <p className="text-[11px] text-on-surface-variant/70 mt-1">
              Chunks embedded and searchable
            </p>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleBrowseFiles}
          className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-outline-variant hover:border-primary/50 hover:bg-surface-container/20"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">
              {isUploading ? "cyclone" : "upload_file"}
            </span>
          </div>
          <div className="text-center">
            <p className="font-body-base font-semibold text-on-surface">
              {isUploading ? "Uploading & chunking document..." : "Drag & drop PDF here, or browse"}
            </p>
            <p className="text-[11px] text-on-surface-variant/70 mt-1">
              Supports standard PDFs up to 50MB. Text will be chunked page-wise.
            </p>
          </div>
        </div>

        {/* Document List Table */}
        <div className="bg-surface-container border border-outline-variant/50 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
            <h3 className="font-h2 text-base font-bold text-on-surface">
              Indexed Document Repository
            </h3>
            <span className="font-label-mono text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded">
              Qdrant Connected
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30 text-on-surface-variant uppercase font-label-caps text-[10px] bg-background/50">
                  <th className="px-6 py-3 font-bold">Document Name</th>
                  <th className="px-6 py-3 font-bold">Pages</th>
                  <th className="px-6 py-3 font-bold">Chunks</th>
                  <th className="px-6 py-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body-base text-on-surface/90">
                {documents.map((doc, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-background/30 transition-colors cursor-pointer"
                    onClick={() => onSelectDoc(doc)}
                  >
                    <td className="px-6 py-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">
                        description
                      </span>
                      <span className="font-medium truncate max-w-[300px]">
                        {doc.filename}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-label-mono">{doc.pages || 0} pages</td>
                    <td className="px-6 py-4 font-label-mono">{doc.chunks || 0} chunks</td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectDoc(doc)}
                          className="text-primary hover:text-opacity-80 font-label-caps text-[10px] font-bold uppercase px-3 py-1 bg-primary/10 rounded transition-all"
                        >
                          Workspace
                        </button>
                        <button
                          onClick={() => onDelete(doc.filename)}
                          className="text-error hover:text-opacity-80 font-label-caps text-[10px] font-bold uppercase px-3 py-1 bg-error/10 rounded transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {documents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant/60">
                      No documents index. Upload a PDF above to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
