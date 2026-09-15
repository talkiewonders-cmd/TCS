import React, { useState, useRef } from 'react';
import { 
  FileText, 
  UploadCloud, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Trash2, 
  Download, 
  Eye, 
  Plus, 
  FileCode, 
  ExternalLink,
  Filter,
  Check
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Project, ProjectDocument } from '../../types/operatingPlatform';

interface ProjectDocumentsPermitsProps {
  project: Project;
}

export const ProjectDocumentsPermits: React.FC<ProjectDocumentsPermitsProps> = ({ project }) => {
  const { addProjectDocument, deleteProjectDocument, currentUser } = usePlatform();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Form state for new upload
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<ProjectDocument['category']>('DFPC Permit');
  const [permitAuthority, setPermitAuthority] = useState<ProjectDocument['permitAuthority']>('DFPC');
  const [permitRef, setPermitRef] = useState('DFPC-2026-');
  const [validUntil, setValidUntil] = useState('2026-10-31');
  const [permitStatus, setPermitStatus] = useState<ProjectDocument['permitStatus']>('Approved');
  const [selectedFileName, setSelectedFileName] = useState('DFPC_Location_Permit_Signed.pdf');
  const [selectedFileSize, setSelectedFileSize] = useState('2.8 MB');

  // Drag and drop visual state
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setSelectedFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      setSelectedFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
      setShowUploadModal(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    addProjectDocument(project.id, {
      title: docTitle.trim(),
      category: docCategory,
      fileName: selectedFileName,
      fileSize: selectedFileSize,
      permitAuthority: docCategory.includes('Permit') || docCategory.includes('Drone') || docCategory.includes('Police') ? permitAuthority : undefined,
      permitStatus: docCategory.includes('Permit') || docCategory.includes('Drone') || docCategory.includes('Police') ? permitStatus : undefined,
      permitRef: permitRef ? permitRef.trim() : undefined,
      validUntil: validUntil || undefined
    });

    setShowUploadModal(false);
    setUploadSuccessMessage(`Uploaded ${selectedFileName} successfully!`);
    setTimeout(() => setUploadSuccessMessage(null), 3500);

    // Reset form
    setDocTitle('');
  };

  const filteredDocs = project.documents.filter(doc => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'permits') {
      return doc.category === 'DFPC Permit' || doc.category === 'Location Permit' || doc.category === 'DCAA Drone' || doc.category === 'Police Clearance' || doc.category === 'Insurance COI';
    }
    if (activeCategoryFilter === 'contracts') {
      return doc.category === 'Signed PO' || doc.category === 'Proposal' || doc.category === 'Talent Release';
    }
    return doc.category === activeCategoryFilter;
  });

  const permitsCount = project.documents.filter(d => 
    d.category === 'DFPC Permit' || d.category === 'Location Permit' || d.category === 'DCAA Drone' || d.category === 'Police Clearance' || d.category === 'Insurance COI'
  ).length;

  return (
    <div className="space-y-5">
      {/* Upload Banner & Drag-Drop Zone */}
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`p-6 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 ${
          isDragging 
            ? 'border-[#e50914] bg-[#241316]' 
            : 'border-[#2d333e] bg-[#14161a] hover:border-[#3d4554]'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-[#1e222a] flex items-center justify-center text-[#e50914] shadow-lg">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">
            Upload Project Documents, DFPC Permits & Location Agreements
          </h4>
          <p className="text-xs text-[#717b88] max-w-md mx-auto mt-1">
            Drag and drop official PDF/DOCX files here, or browse from your device. Automatically links to {project.code}.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.docx,.jpg,.png,.mov,.mp4"
          />
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-md shadow-[#e50914]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document / Permit</span>
          </button>
        </div>
      </div>

      {/* Success notification */}
      {uploadSuccessMessage && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{uploadSuccessMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All Files (${project.documents.length})` },
            { id: 'permits', label: `Government Permits & NOCs (${permitsCount})` },
            { id: 'contracts', label: 'Contracts & Signed POs' },
            { id: 'Brief', label: 'Creative Briefs' },
            { id: 'Call Sheet', label: 'Call Sheets' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategoryFilter === tab.id
                  ? 'bg-[#1e2229] border border-[#e50914] text-white font-bold'
                  : 'bg-[#141619] border border-[#23272e] text-[#8a94a2] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-[#717b88] shrink-0">
          Dubai Media Authority / DFPC Compliance Ready
        </span>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredDocs.map(doc => {
          const isPermit = doc.category.includes('Permit') || doc.category.includes('Drone') || doc.category.includes('Police');
          
          return (
            <div 
              key={doc.id}
              className="p-4 rounded-xl bg-[#181b21] border border-[#262b34] hover:border-[#353c48] transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isPermit ? 'bg-sky-950/80 text-sky-400 border border-sky-800' : 'bg-[#121417] text-[#e50914] border border-[#252932]'
                  }`}>
                    {isPermit ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-xs">{doc.title}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f232b] text-[#9ba3af] border border-[#2b313a]">
                        {doc.category}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#717b88] font-mono mt-1">
                      {doc.fileName} • {doc.fileSize}
                    </div>

                    {/* Permit Metadata */}
                    {doc.permitRef && (
                      <div className="mt-2 p-2 rounded-lg bg-[#121417] border border-[#22272e] text-[11px] space-y-0.5">
                        <div className="text-[#a1abb8] flex items-center justify-between">
                          <span>Ref: <strong className="text-white font-mono">{doc.permitRef}</strong></span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase font-bold ${
                            doc.permitStatus === 'Approved' 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {doc.permitStatus || 'Approved'}
                          </span>
                        </div>
                        {doc.validUntil && (
                          <div className="text-[10px] text-[#6b7582] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Valid Until: {doc.validUntil}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="text-[10px] text-[#5e6774] mt-1.5">
                      Uploaded {doc.uploadedAt} by {doc.uploadedBy}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-[#22272e] flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Verified for Production
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`#download-${doc.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading official copy of ${doc.fileName}...`);
                    }}
                    className="p-1.5 rounded bg-[#1f232a] hover:bg-[#2c333f] text-[#a1abb8] hover:text-white transition-colors"
                    title="Download document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => deleteProjectDocument(project.id, doc.id)}
                    className="p-1.5 rounded bg-[#1f232a] hover:bg-[#241316] text-[#717b88] hover:text-[#e50914] transition-colors"
                    title="Remove document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141619] border border-[#2a2f38] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#22272f] flex items-center justify-between bg-[#101215]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-[#e50914]" />
                Upload New Document / Permit
              </h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-1.5 rounded text-[#717b88] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-white mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dubai Studio City Stage A DFPC Permit"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#8a94a2] mb-1">Document Category</label>
                  <select
                    value={docCategory}
                    onChange={e => setDocCategory(e.target.value as any)}
                    className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e50914]"
                  >
                    <option value="DFPC Permit">DFPC Permit (Film Commission)</option>
                    <option value="DCAA Drone">DCAA Drone Clearance</option>
                    <option value="Police Clearance">Dubai Police Traffic NOC</option>
                    <option value="Location Permit">Location Agreement</option>
                    <option value="Insurance COI">Public Liability Insurance COI</option>
                    <option value="Signed PO">Signed Client PO</option>
                    <option value="Brief">Creative Brief / Storyboard</option>
                    <option value="Call Sheet">Production Call Sheet</option>
                    <option value="Talent Release">Talent Usage Release</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#8a94a2] mb-1">Issuing Authority</label>
                  <select
                    value={permitAuthority}
                    onChange={e => setPermitAuthority(e.target.value as any)}
                    className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#e50914]"
                  >
                    <option value="DFPC">DFPC (Dubai Film Commission)</option>
                    <option value="DCAA">DCAA (Civil Aviation)</option>
                    <option value="Dubai Police">Dubai Police</option>
                    <option value="Civil Defense">Civil Defense</option>
                    <option value="Dubai Municipality">Dubai Municipality</option>
                    <option value="General">Other Authority</option>
                  </select>
                </div>
              </div>

              {/* Permit Reference & Expiry */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#8a94a2] mb-1">Permit / Reference #</label>
                  <input
                    type="text"
                    value={permitRef}
                    onChange={e => setPermitRef(e.target.value)}
                    placeholder="DFPC-2026-XXXX"
                    className="w-full bg-[#181b20] border border-[#2a2f38] text-white font-mono rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#8a94a2] mb-1">Valid Until / Expiry</label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={e => setValidUntil(e.target.value)}
                    className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#e50914]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#181b21] border border-[#262b34]">
                <div className="text-[11px] text-[#717b88]">Selected File:</div>
                <div className="font-mono text-xs text-white font-semibold mt-0.5">{selectedFileName} ({selectedFileSize})</div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-2 rounded-lg text-[#8a94a2] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
