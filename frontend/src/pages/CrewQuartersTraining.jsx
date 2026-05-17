import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Truck, Box, Thermometer, Users, AlertTriangle, Shield, Award, Upload, Lock, CheckCircle, PlayCircle, Loader2, FileText, Trash2, Download, X } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { apiClient } from "@/lib/api";
import { fileToDataUrl } from "@/lib/pdfExport";

const trainingModules = [
  {
    id: 1,
    title: "HACCP Temperature Controls",
    description: "Standard operating procedures for checking and logging cold storage temperatures.",
    duration: "8:24",
    type: "VIDEO",
    completed: false,
    stepsRemaining: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqocXVd2FwCfjTp-SxKX3Su71nja_by5mQ_pOCT1xAS9rZY1lTJaXQnTcdNPDypvW9gaBNE7xJhEX_h5CV0w9rEqL6wzqW-5SP1266IbKr4xg-O5I2qB0Rf6K0nlHbhbMk4S21ROquoghJqvddOFlel-ENWLxC_u6Y8VLXVK4NuVTH4D9LCpXFdXRLTt5MLbECmGgQUYkD796JiaR6Cdiuh74GPcmOCu2ZpXEBEtF-HskG7Qvb44QLgZ1RlMLQQPDPq5Z_RfMVl8R1"
  },
  {
    id: 2,
    title: "Sanitization Protocol 101",
    description: "Detailed guide on chemical mixtures and surface sterilization timing.",
    duration: "12:15",
    type: "VIDEO",
    completed: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHwL4-zo28smYPL2lJcROHbIFut13DW1SYmZTHnGa7C0YsJTGGJWge7FKh3xEdXtLq1GLIMWPCE4gte9nFpbNbuqQmQJFVgvwQrqGWZ0QLtrCumS6wxqeXS13b_BLbyDBmX75CO_A7M3QQPYewGLNU7CdtiFGrCX0nw8XToZHtmEZAusaPlhBBnE_TG1k3ZrhSM80s8VDtV_RITdZHTyNqluoTpoyhcstTbnPoaFJWcx2p-d2h-_HimqTVsyHY-fzVO-glIfhqWeDk"
  }
];

const customerServiceModules = [
  { title: "The 'Wow' Greeting Formula", subtitle: "Standardized arrival script", format: "PDF GUIDE", time: "15 mins", action: "View Material" },
  { title: "Conflict Resolution Matrix", subtitle: "Handling unhappy customers", format: "INTERACTIVE", time: "30 mins", action: "Start Lesson" }
];

const CrewQuartersTraining = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [trainingModulesState, setTrainingModulesState] = useState(trainingModules);
  const [savingModuleId, setSavingModuleId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const docs = await apiClient.listTrainingDocuments();
        setDocuments(docs || []);
      } catch (e) {
        console.error("Failed to load documents", e);
      }
    };
    loadDocs();
  }, []);

  const handleMarkAsTrained = async (moduleId) => {
    setSavingModuleId(moduleId);
    const module = trainingModulesState.find(m => m.id === moduleId);
    try {
      await apiClient.saveTrainingProgress({
        module_id: moduleId,
        module_title: module?.title || "Unknown Module",
        completed: true,
      });
      setTrainingModulesState(prev => 
        prev.map(m => m.id === moduleId ? { ...m, completed: true } : m)
      );
      toast.success("Training completed!", { description: `${module?.title} has been marked as completed.` });
    } catch (error) {
      toast.error("Failed to save", { description: "Please try again." });
    } finally {
      setSavingModuleId(null);
    }
  };

  const handleUploadDoc = () => {
    fileInputRef.current?.click();
  };

  const onFileSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset for re-upload
    if (!file) return;
    setIsUploading(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      const created = await apiClient.uploadTrainingDocument({
        name: file.name,
        category: activeCategory === "all" ? "general" : activeCategory,
        file_type: file.type || "application/octet-stream",
        size: file.size,
        data_url: dataUrl,
      });
      setDocuments((prev) => [created, ...prev]);
      toast.success("Document uploaded", { description: `${file.name} added to your vault.` });
    } catch (err) {
      toast.error("Upload failed", { description: err.message || "Please try again." });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDoc = async (docId) => {
    try {
      await apiClient.deleteTrainingDocument(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      toast.success("Document removed");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleDownloadDoc = (doc) => {
    const a = document.createElement("a");
    a.href = doc.data_url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenEmergencyManual = () => {
    toast.info("Opening manual...", { description: "Emergency manual viewer is in development." });
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#1a1614] font-lexend text-slate-100">
      <SEO 
        title="Crew Quarters - Training Bible"
        description="Industrial-grade training resources for your food truck team. HACCP protocols, customer service standards, emergency procedures, and documentation vault."
        url="/crew-quarters"
      />
      {/* Header */}
      <header className="flex items-center justify-between border-b border-industrial bg-[#1a1614] px-10 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <Truck className="w-7 h-7" />
            <h2 className="text-slate-100 text-xl font-bold leading-tight tracking-tight uppercase">Crew Quarters</h2>
          </div>
          <nav className="flex items-center gap-8 ml-4">
            <Link to="/dashboard" className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Dashboard</Link>
            <span className="text-primary text-sm font-bold border-b-2 border-primary pb-1">Training</span>
            <button onClick={() => toast.info("Vault coming soon")} className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Vault</button>
            <button onClick={() => toast.info("Schedule coming soon")} className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Schedule</button>
            <button onClick={() => toast.info("Team coming soon")} className="text-slate-400 hover:text-primary text-sm font-medium transition-colors">Team</button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col px-10 py-8 max-w-7xl mx-auto w-full">
        {/* Title */}
        <div className="mb-10 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
            <span className="text-sm">⚙️</span>
            Phase 6: Crew Quarters
          </div>
          <h1 className="text-slate-100 text-5xl font-black leading-tight tracking-tighter">Training & Operations Bible</h1>
          <p className="text-slate-400 text-lg max-w-2xl font-light">
            Industrial-grade training resources and secure documentation storage for your food truck fleet.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <aside className="col-span-3 flex flex-col gap-6">
            {/* Categories */}
            <div className="bg-industrial/50 rounded-xl p-6 border border-steel/20">
              <h3 className="text-slate-100 text-xs font-bold uppercase tracking-widest mb-4 border-b border-steel/30 pb-2">Training Categories</h3>
              <nav className="flex flex-col gap-2">
                <button 
                  onClick={() => setActiveCategory("all")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-semibold transition-colors ${activeCategory === "all" ? "bg-primary text-white" : "hover:bg-steel/20 text-slate-400"}`}
                  data-testid="category-all"
                >
                  <Box className="w-5 h-5" />
                  <span>All Materials</span>
                </button>
                <button 
                  onClick={() => setActiveCategory("safety")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${activeCategory === "safety" ? "bg-primary text-white" : "hover:bg-steel/20 text-slate-400"}`}
                  data-testid="category-safety"
                >
                  <Thermometer className="w-5 h-5" />
                  <span>Food Safety</span>
                </button>
                <button 
                  onClick={() => setActiveCategory("service")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${activeCategory === "service" ? "bg-primary text-white" : "hover:bg-steel/20 text-slate-400"}`}
                >
                  <Users className="w-5 h-5" />
                  <span>Customer Service</span>
                </button>
                <button 
                  onClick={() => setActiveCategory("emergency")}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${activeCategory === "emergency" ? "bg-primary text-white" : "hover:bg-steel/20 text-slate-400"}`}
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>Emergency Docs</span>
                </button>
              </nav>
            </div>

            {/* Documentation Vault */}
            <div className="bg-industrial/50 rounded-xl p-6 border border-steel/20">
              <h3 className="text-slate-100 text-xs font-bold uppercase tracking-widest mb-4 border-b border-steel/30 pb-2 flex items-center justify-between">
                <span>Documentation Vault</span>
                <span className="text-[10px] text-primary normal-case tracking-normal">{documents.length} files</span>
              </h3>
              <div className="flex flex-col gap-3" data-testid="doc-vault">
                {/* Static system docs */}
                <div className="flex items-center justify-between p-3 bg-background-dark rounded border border-steel/30">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <div className="text-xs">
                      <p className="text-slate-200 font-medium">Employee Handbook</p>
                      <p className="text-slate-500">12 Signed</p>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-background-dark rounded border border-steel/30">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <div className="text-xs">
                      <p className="text-slate-200 font-medium">Certifications</p>
                      <p className="text-slate-500">8 Active</p>
                    </div>
                  </div>
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>

                {/* User uploaded docs */}
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="group flex items-center justify-between p-3 bg-background-dark rounded border border-steel/30 hover:border-primary/40 transition-colors"
                    data-testid={`doc-row-${doc.id}`}
                  >
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="flex items-center gap-2 flex-1 min-w-0 text-left"
                    >
                      <FileText className="w-5 h-5 text-primary shrink-0" />
                      <div className="text-xs min-w-0">
                        <p className="text-slate-200 font-medium truncate">{doc.name}</p>
                        <p className="text-slate-500 uppercase tracking-wider text-[10px]">
                          {doc.category} · {formatBytes(doc.size)}
                        </p>
                      </div>
                    </button>
                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDownloadDoc(doc)}
                        className="p-1.5 hover:bg-steel/30 rounded text-slate-400 hover:text-primary"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-1.5 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400"
                        title="Delete"
                        data-testid={`doc-delete-${doc.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.txt"
                  onChange={onFileSelected}
                  data-testid="doc-file-input"
                />
                <button 
                  onClick={handleUploadDoc}
                  disabled={isUploading}
                  className="w-full py-3 border-2 border-dashed border-steel/50 rounded text-slate-500 text-xs font-bold uppercase hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  data-testid="upload-doc-btn"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  {isUploading ? "Uploading..." : "Upload New Doc"}
                </button>
                <p className="text-[10px] text-slate-600 text-center -mt-1">PDF, PNG, JPG, DOC · Max 2MB</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="col-span-9 space-y-8">
            {/* Food Safety & Prep */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-slate-100 text-2xl font-bold flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-primary" />
                  Food Safety & Prep
                </h2>
                <span className="text-slate-500 text-sm">4 modules available</span>
              </div>
              <div className="grid grid-cols-2 gap-4" data-testid="training-modules">
                {trainingModulesState.map((module) => (
                  <div key={module.id} className="bg-industrial/40 border border-steel/20 rounded-xl overflow-hidden flex flex-col">
                    <div 
                      className="h-32 bg-slate-800 relative group overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${module.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">{module.type}</span>
                        <span className="text-white text-xs font-medium">{module.duration}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h4 className="text-slate-100 font-bold text-lg mb-2">{module.title}</h4>
                      <p className="text-slate-400 text-sm mb-4 flex-1">{module.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-steel/20">
                        {module.completed ? (
                          <>
                            <div className="flex items-center gap-2 text-xs text-green-500">
                              <CheckCircle className="w-4 h-4" />
                              <span>Completed</span>
                            </div>
                            <button className="bg-steel/40 text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg cursor-not-allowed">
                              Already Trained
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <CheckCircle className="w-4 h-4" />
                              {module.stepsRemaining} Steps Remaining
                            </div>
                            <button 
                              onClick={() => handleMarkAsTrained(module.id)}
                              disabled={savingModuleId === module.id}
                              className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2" 
                              data-testid={`train-btn-${module.id}`}
                            >
                              {savingModuleId === module.id ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                              {savingModuleId === module.id ? "Saving..." : "Mark as Trained"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Service Standards */}
            <div className="space-y-4">
              <h2 className="text-slate-100 text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Customer Service Standards
              </h2>
              <div className="bg-industrial/20 border border-steel/10 rounded-xl p-2">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-steel/20">
                      <th className="px-6 py-4 font-bold">Module Title</th>
                      <th className="px-6 py-4 font-bold">Format</th>
                      <th className="px-6 py-4 font-bold">Estimated Time</th>
                      <th className="px-6 py-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-steel/10">
                    {customerServiceModules.map((module, index) => (
                      <tr key={index} className="hover:bg-steel/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-slate-200 font-medium">{module.title}</span>
                            <span className="text-slate-500 text-xs">{module.subtitle}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                            module.format === "PDF GUIDE" 
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30" 
                              : "bg-primary/10 text-primary border-primary/30"
                          }`}>
                            {module.format}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">{module.time}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary text-xs font-bold uppercase hover:underline">{module.action}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Emergency Procedures */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-8 flex items-center justify-between" data-testid="emergency-section">
              <div className="flex items-center gap-6">
                <div className="bg-red-500/20 p-4 rounded-full">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <div>
                  <h3 className="text-red-500 text-xl font-bold">Emergency Procedures</h3>
                  <p className="text-slate-400 text-sm max-w-md">
                    Immediate actions for fire, gas leaks, and vehicle malfunctions. All crew must review quarterly.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleOpenEmergencyManual}
                className="bg-red-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-600 transition-colors uppercase tracking-widest text-sm shadow-lg shadow-red-500/10"
              >
                Open Emergency Manual
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto px-10 py-6 border-t border-industrial bg-[#1a1614] text-slate-500 text-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          © 2024 Food Truck Launch Pad - Phase 6: Crew Quarters
        </div>
        <div className="flex gap-6">
          <button className="hover:text-primary transition-colors" onClick={() => toast.info("Privacy Policy coming soon")}>Privacy Policy</button>
          <button className="hover:text-primary transition-colors" onClick={() => toast.info("Support Center coming soon")}>Support Center</button>
          <button className="hover:text-primary transition-colors" onClick={() => toast.info("System Status coming soon")}>System Status</button>
        </div>
      </footer>

      {/* Doc Preview Modal */}
      {previewDoc && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setPreviewDoc(null)}
          data-testid="doc-preview-modal"
        >
          <div 
            className="bg-industrial border border-steel/40 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-steel/30">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <h3 className="text-slate-100 font-bold truncate">{previewDoc.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadDoc(previewDoc)}
                  className="px-3 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-primary/90 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-black/40 p-2">
              {previewDoc.file_type?.startsWith("image/") ? (
                <img src={previewDoc.data_url} alt={previewDoc.name} className="max-w-full mx-auto" />
              ) : previewDoc.file_type === "application/pdf" ? (
                <iframe src={previewDoc.data_url} title={previewDoc.name} className="w-full h-[70vh] bg-white rounded" />
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-40" />
                  <p>Preview not available for this file type.</p>
                  <p className="text-xs text-slate-500 mt-2">Click Download to open it.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrewQuartersTraining;
