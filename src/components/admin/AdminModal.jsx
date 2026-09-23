import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Plus,
  Trash2,
  Save,
  Download,
  RotateCcw,
  Check,
  AlertCircle,
  FolderGit2,
  ExternalLink,
  Eye,
  KeyRound,
  Globe,
  Loader2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { fileToBase64 } from '../../utils/storage';
import { getLockoutStatus } from '../../utils/security';
import {
  getSavedGitHubToken,
  saveGitHubToken,
  publishToGitHub,
} from '../../utils/githubSync';

export function AdminModal({ isOpen, onClose, onShowToast }) {
  const {
    developerInfo,
    socialLinks,
    projects,
    currentPinHash,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    updateProfilePhoto,
    updateDeveloperInfo,
    updateSocialLinks,
    updateProject,
    updateProjectScreenshots,
    addProject,
    deleteProject,
    verifyPin,
    changePin,
    resetToDefaults,
    getExportableData,
  } = usePortfolio();

  // Authentication & Security state
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [lockoutSec, setLockoutSec] = useState(0);

  // Tab state: 'profile' | 'projects' | 'publish' | 'security'
  const [activeTab, setActiveTab] = useState('profile');

  // Form states for profile & links
  const [profileForm, setProfileForm] = useState({
    name: developerInfo.name || '',
    title: developerInfo.title || '',
    headline: developerInfo.headline || '',
    aboutBio: developerInfo.aboutBio || '',
    location: developerInfo.location || '',
    availability: developerInfo.availability || '',
    upwork: socialLinks.upwork || '',
    fiverr: socialLinks.fiverr || '',
    github: socialLinks.github || '',
    email: socialLinks.email || '',
  });

  // Keep form in sync when developerInfo updates
  useEffect(() => {
    setProfileForm({
      name: developerInfo.name || '',
      title: developerInfo.title || '',
      headline: developerInfo.headline || '',
      aboutBio: developerInfo.aboutBio || '',
      location: developerInfo.location || '',
      availability: developerInfo.availability || '',
      upwork: socialLinks.upwork || '',
      fiverr: socialLinks.fiverr || '',
      github: socialLinks.github || '',
      email: socialLinks.email || '',
    });
  }, [developerInfo, socialLinks]);

  // Project editing states
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    category: 'Backend',
    description: '',
    overview: '',
    technologies: 'Node.js, Express.js, REST API',
    github: '',
    liveDemo: '',
    featured: true,
  });

  // GitHub Publish states
  const [ghToken, setGhToken] = useState(getSavedGitHubToken());
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Change PIN states
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState({ text: '', type: '' });

  const photoInputRef = useRef(null);
  const screenshotInputRef = useRef(null);
  const newProjectScreenshotRef = useRef(null);

  // Check lockout on mount & tick down
  useEffect(() => {
    const status = getLockoutStatus();
    if (status.isLocked) {
      setLockoutSec(status.remainingSeconds);
    }
  }, [isOpen]);

  useEffect(() => {
    if (lockoutSec <= 0) return;
    const timer = setInterval(() => {
      setLockoutSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setPinError('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSec]);

  if (!isOpen) return null;

  // Handle PIN verification
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    const res = await verifyPin(pinInput);
    if (res.success) {
      setPinError('');
      setPinInput('');
      onShowToast?.('Admin access granted!', 'success');
    } else {
      setPinError(res.error);
      if (res.locked) {
        setLockoutSec(res.remainingSeconds || 300);
      }
    }
  };

  // Handle Profile Photo Upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onShowToast?.('Please upload a valid image file', 'error');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      await updateProfilePhoto(base64);
      onShowToast?.('Profile photo updated in browser preview!', 'success');
    } catch (err) {
      console.error(err);
      onShowToast?.('Failed to process image file', 'error');
    }
  };

  // Save profile & links form
  const handleSaveProfileAndLinks = (e) => {
    e.preventDefault();
    updateDeveloperInfo({
      name: profileForm.name,
      title: profileForm.title,
      headline: profileForm.headline,
      aboutBio: profileForm.aboutBio,
      location: profileForm.location,
      availability: profileForm.availability,
    });

    updateSocialLinks({
      upwork: profileForm.upwork,
      fiverr: profileForm.fiverr,
      github: profileForm.github,
      email: profileForm.email,
    });

    onShowToast?.('Profile & freelance links saved!', 'success');
  };

  // Handle Project Screenshot Upload for selected project
  const handleScreenshotUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0 || !selectedProjectId) return;

    try {
      const base64List = await Promise.all(files.map(fileToBase64));
      const targetProj = projects.find((p) => p.id === selectedProjectId);
      const existing = targetProj?.screenshots || (targetProj?.image ? [targetProj.image] : []);
      const updatedScreenshots = [...base64List, ...existing];

      await updateProjectScreenshots(selectedProjectId, updatedScreenshots);
      onShowToast?.(`Added ${base64List.length} screenshot(s) to project!`, 'success');
    } catch (err) {
      console.error(err);
      onShowToast?.('Failed to upload screenshot', 'error');
    }
  };

  // Remove a specific screenshot from project
  const handleRemoveScreenshot = async (projectId, screenshotIndex) => {
    const targetProj = projects.find((p) => p.id === projectId);
    if (!targetProj) return;

    const existing = [...(targetProj.screenshots || [targetProj.image])];
    existing.splice(screenshotIndex, 1);

    await updateProjectScreenshots(projectId, existing);
    onShowToast?.('Screenshot removed', 'success');
  };

  // Handle Add New Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectForm.title) {
      onShowToast?.('Please provide a project title', 'error');
      return;
    }

    const techArray = newProjectForm.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    let screenshotList = [];
    const files = Array.from(newProjectScreenshotRef.current?.files || []);
    if (files.length > 0) {
      screenshotList = await Promise.all(files.map(fileToBase64));
    }

    const projectToCreate = {
      title: newProjectForm.title,
      category: newProjectForm.category,
      description: newProjectForm.description,
      overview: newProjectForm.overview || newProjectForm.description,
      technologies: techArray,
      github: newProjectForm.github || null,
      liveDemo: newProjectForm.liveDemo || null,
      featured: newProjectForm.featured,
      image: screenshotList[0] || '/projects/travello-tour.png',
      screenshots: screenshotList,
      features: ['Clean code architecture', 'Responsive UI & modern design'],
    };

    await addProject(projectToCreate);
    setIsAddingProject(false);
    setNewProjectForm({
      title: '',
      category: 'Backend',
      description: '',
      overview: '',
      technologies: 'Node.js, Express.js, REST API',
      github: '',
      liveDemo: '',
      featured: true,
    });
    onShowToast?.('New project added successfully!', 'success');
  };

  // Handle PIN Change
  const handleChangePin = async (e) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinChangeMsg({ text: 'PIN must be at least 4 digits/characters.', type: 'error' });
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeMsg({ text: 'PIN confirmation does not match.', type: 'error' });
      return;
    }
    await changePin(newPin);
    setNewPin('');
    setConfirmPin('');
    setPinChangeMsg({ text: 'Admin passcode updated with SHA-256 encryption!', type: 'success' });
    onShowToast?.('Admin PIN updated securely!', 'success');
  };

  // Handle Publish to GitHub & Vercel (Universal cross-device sync)
  const handlePublishLive = async () => {
    if (!ghToken) {
      onShowToast?.('Please enter your GitHub Personal Access Token', 'error');
      return;
    }

    saveGitHubToken(ghToken);
    setIsPublishing(true);
    setPublishSuccess(false);

    try {
      await publishToGitHub({
        token: ghToken,
        developerInfo,
        socialLinks,
        projects,
        authConfig: { pinHash: currentPinHash },
        onProgress: (msg) => setPublishProgress(msg),
      });

      setPublishSuccess(true);
      onShowToast?.('Published to GitHub! Vercel is deploying to all devices.', 'success');
    } catch (err) {
      console.error(err);
      onShowToast?.(`Publish error: ${err.message}`, 'error');
      setPublishProgress(`Error: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  // Handle Export Data
  const handleExport = () => {
    const data = getExportableData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast?.('Backup JSON downloaded!', 'success');
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-dark-900 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-dark-850/90 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-electric-500/20 border border-electric-400/40 flex items-center justify-center text-electric-400">
              {isAdminAuthenticated ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Portfolio Studio
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                  SHA-256 Protected
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isAdminAuthenticated
                  ? 'Customize your website live and deploy permanently to all devices'
                  : 'Enter your Admin PIN to unlock customization'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAdminAuthenticated ? (
          /* PIN Entry Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-electric-500/10 border border-electric-400/30 flex items-center justify-center mb-4 text-electric-400 shadow-inner">
              <KeyRound className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Owner Authentication</h3>
            <p className="text-sm text-slate-400 max-w-sm mb-6">
              Only you have permission to modify this portfolio.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  disabled={lockoutSec > 0}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError('');
                  }}
                  placeholder={lockoutSec > 0 ? `Locked (${lockoutSec}s)` : 'Enter 4-digit PIN'}
                  maxLength={10}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/15 text-center text-xl tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-400 focus:ring-1 focus:ring-electric-400 disabled:opacity-50"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{pinError}</span>
                  </p>
                )}
                {lockoutSec > 0 && (
                  <p className="text-xs text-amber-400 mt-1 font-mono">
                    Cooldown active: {lockoutSec}s remaining
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={lockoutSec > 0}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-electric-500 to-indigoAcc-600 text-white font-semibold text-sm shadow-lg shadow-electric-500/25 hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                Unlock Studio
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex flex-col flex-grow overflow-hidden">
            {/* Tabs Header */}
            <div className="flex flex-wrap border-b border-white/10 bg-dark-950/40 px-6 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'border-electric-400 text-electric-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Profile &amp; Links</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'projects'
                    ? 'border-electric-400 text-electric-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Projects &amp; Screenshots</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('publish')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'publish'
                    ? 'border-emerald-400 text-emerald-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="flex items-center gap-1.5">
                  Publish to All Devices
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'security'
                    ? 'border-electric-400 text-electric-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Security &amp; PIN</span>
              </button>
            </div>

            {/* Tab 1: Profile & Freelance Links */}
            {activeTab === 'profile' && (
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Profile Photo Section */}
                <div className="p-5 rounded-2xl bg-dark-950/50 border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-dark-800 border-2 border-electric-400/40 shadow-lg flex-shrink-0">
                    <img
                      src={developerInfo.profileImage || '/profile.jpg'}
                      alt="Profile preview"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.src = '/profile.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-grow text-center sm:text-left space-y-2">
                    <h4 className="text-base font-semibold text-white">Profile Photograph</h4>
                    <p className="text-xs text-slate-400">
                      Upload your image directly from your computer. It updates across the Hero, Navbar, and Footer instantly.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <input
                        type="file"
                        ref={photoInputRef}
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-500/20 hover:bg-electric-500/30 text-electric-300 border border-electric-400/30 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload New Photo</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Freelance & Social Links Form */}
                <form onSubmit={handleSaveProfileAndLinks} className="space-y-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-electric-400" />
                    <span>Freelance &amp; Contact Links</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Upwork Profile URL
                      </label>
                      <input
                        type="text"
                        value={profileForm.upwork}
                        onChange={(e) => setProfileForm({ ...profileForm, upwork: e.target.value })}
                        placeholder="https://www.upwork.com/freelancers/~..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Fiverr Profile URL
                      </label>
                      <input
                        type="text"
                        value={profileForm.fiverr}
                        onChange={(e) => setProfileForm({ ...profileForm, fiverr: e.target.value })}
                        placeholder="https://www.fiverr.com/your_username"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        GitHub Profile URL
                      </label>
                      <input
                        type="text"
                        value={profileForm.github}
                        onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                        placeholder="https://github.com/suvromahirarman-star"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-electric-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 pt-2">
                      Bio &amp; Headlines
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Professional Title
                        </label>
                        <input
                          type="text"
                          value={profileForm.title}
                          onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Hero Main Headline
                      </label>
                      <input
                        type="text"
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        About Bio Description
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.aboutBio}
                        onChange={(e) => setProfileForm({ ...profileForm, aboutBio: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400 leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-electric-500 hover:bg-electric-400 text-white text-xs font-bold shadow-lg shadow-electric-500/20 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tab 2: Projects & Screenshots */}
            {activeTab === 'projects' && (
              <div className="p-6 overflow-y-auto space-y-6">
                {!isAddingProject ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Project Showcase</h4>
                        <p className="text-xs text-slate-400">
                          Select a project to upload screenshots or edit descriptions and links.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddingProject(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-electric-500/20 hover:bg-electric-500/30 text-electric-300 border border-electric-400/30 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Project</span>
                      </button>
                    </div>

                    {/* Project Selector Pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {projects.map((proj) => (
                        <button
                          key={proj.id}
                          type="button"
                          onClick={() => setSelectedProjectId(proj.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                            selectedProjectId === proj.id
                              ? 'bg-electric-500 text-white border-electric-400 shadow-md shadow-electric-500/20'
                              : 'bg-dark-950 text-slate-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {proj.title}
                        </button>
                      ))}
                    </div>

                    {/* Selected Project Detail & Screenshot Manager */}
                    {selectedProject && (
                      <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 space-y-5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-electric-400 bg-electric-500/10 px-2 py-0.5 rounded border border-electric-400/20">
                              {selectedProject.category}
                            </span>
                            <h3 className="text-base font-bold text-white mt-1">
                              {selectedProject.title}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete project "${selectedProject.title}"?`)) {
                                deleteProject(selectedProject.id);
                                onShowToast?.('Project deleted', 'success');
                              }
                            }}
                            className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Delete this project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Screenshots Gallery for this project */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-electric-400" />
                              <span>Project Screenshots &amp; Previews</span>
                            </label>

                            <input
                              type="file"
                              ref={screenshotInputRef}
                              accept="image/*"
                              multiple
                              onChange={handleScreenshotUpload}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => screenshotInputRef.current?.click()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-500/20 hover:bg-electric-500/30 text-electric-300 text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Screenshots</span>
                            </button>
                          </div>

                          {/* Screenshot Thumbs Grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                            {(selectedProject.screenshots || [selectedProject.image]).map(
                              (shot, idx) => (
                                <div
                                  key={idx}
                                  className="relative group rounded-xl overflow-hidden bg-dark-900 border border-white/10 aspect-video flex items-center justify-center shadow-md"
                                >
                                  <img
                                    src={shot}
                                    alt={`Screenshot ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveScreenshot(selectedProject.id, idx)}
                                      className="p-1.5 rounded-lg bg-rose-500/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                                      title="Remove screenshot"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  {idx === 0 && (
                                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-dark-950/90 text-[9px] font-mono text-electric-400 border border-electric-400/30">
                                      Main Cover
                                    </span>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Quick Links Edit for this project */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                              GitHub Repository URL
                            </label>
                            <input
                              type="text"
                              value={selectedProject.github || ''}
                              onChange={(e) =>
                                updateProject(selectedProject.id, { github: e.target.value })
                              }
                              placeholder="https://github.com/..."
                              className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                              Live Demo URL (optional)
                            </label>
                            <input
                              type="text"
                              value={selectedProject.liveDemo || ''}
                              onChange={(e) =>
                                updateProject(selectedProject.id, { liveDemo: e.target.value })
                              }
                              placeholder="https://..."
                              className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Short Description
                          </label>
                          <textarea
                            rows={2}
                            value={selectedProject.description || ''}
                            onChange={(e) =>
                              updateProject(selectedProject.id, { description: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Add New Project Form */
                  <form onSubmit={handleCreateProject} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-sm font-semibold text-white">Add a New Project</h4>
                      <button
                        type="button"
                        onClick={() => setIsAddingProject(false)}
                        className="text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newProjectForm.title}
                          onChange={(e) =>
                            setNewProjectForm({ ...newProjectForm, title: e.target.value })
                          }
                          placeholder="e.g. Cinema Booking API"
                          className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Category
                        </label>
                        <select
                          value={newProjectForm.category}
                          onChange={(e) =>
                            setNewProjectForm({ ...newProjectForm, category: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                        >
                          <option value="Backend">Backend</option>
                          <option value="Frontend">Frontend</option>
                          <option value="API">API</option>
                          <option value="Full-Stack">Full-Stack</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          GitHub URL
                        </label>
                        <input
                          type="text"
                          value={newProjectForm.github}
                          onChange={(e) =>
                            setNewProjectForm({ ...newProjectForm, github: e.target.value })
                          }
                          placeholder="https://github.com/suvromahirarman-star/..."
                          className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Live Demo URL
                        </label>
                        <input
                          type="text"
                          value={newProjectForm.liveDemo}
                          onChange={(e) =>
                            setNewProjectForm({ ...newProjectForm, liveDemo: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        value={newProjectForm.technologies}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, technologies: e.target.value })
                        }
                        placeholder="Node.js, Express, MongoDB"
                        className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Project Description
                      </label>
                      <textarea
                        rows={3}
                        value={newProjectForm.description}
                        onChange={(e) =>
                          setNewProjectForm({ ...newProjectForm, description: e.target.value })
                        }
                        placeholder="Brief summary of what this application does..."
                        className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Upload Screenshots
                      </label>
                      <input
                        type="file"
                        ref={newProjectScreenshotRef}
                        accept="image/*"
                        multiple
                        className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-electric-500/20 file:text-electric-300 hover:file:bg-electric-500/30"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddingProject(false)}
                        className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-electric-500 hover:bg-electric-400 text-white text-xs font-bold shadow-lg shadow-electric-500/20 cursor-pointer"
                      >
                        Create Project
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Tab 3: Publish to Live Site (Universal Cross-Device Deployment) */}
            {activeTab === 'publish' && (
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-dark-950 to-dark-900 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                    <h4 className="text-base font-bold text-white">
                      Publish to All Devices Worldwide
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When you click <strong>"Publish Live"</strong>, all your uploaded photos, project screenshots, and edited links are automatically committed to your GitHub repository (<code>suvromahirarman-star/protfolio</code>).
                    <br />
                    Vercel will detect the commit and redeploy your website in ~25 seconds, making your updates visible on <strong>every phone, laptop, and client device</strong>!
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 space-y-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-electric-400" />
                    <span>GitHub Personal Access Token</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    To allow the browser to publish directly to your repository, enter your GitHub Personal Access Token (classic with <code>repo</code> scope, or fine-grained with read/write on contents).
                  </p>

                  <div className="space-y-2">
                    <input
                      type="password"
                      value={ghToken}
                      onChange={(e) => setGhToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400 font-mono"
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Token is securely stored locally in your browser.</span>
                      <a
                        href="https://github.com/settings/tokens/new?scopes=repo&description=Portfolio+Admin+Sync"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Generate Token on GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {publishProgress && (
                    <div className="p-3 rounded-xl bg-dark-900 border border-white/10 text-xs text-slate-300 font-mono flex items-center gap-2">
                      {isPublishing ? (
                        <Loader2 className="w-4 h-4 animate-spin text-electric-400 flex-shrink-0" />
                      ) : publishSuccess ? (
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      )}
                      <span>{publishProgress}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      disabled={isPublishing}
                      onClick={handlePublishLive}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isPublishing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Publishing to GitHub...</span>
                        </>
                      ) : (
                        <>
                          <Globe className="w-4 h-4" />
                          <span>🚀 Publish Live to All Devices</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Security & PIN Management */}
            {activeTab === 'security' && (
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Change PIN */}
                <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 space-y-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-electric-400" />
                    <span>Change Admin Passcode (PIN)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Set a private PIN protected with SHA-256 cryptographic hashing.
                  </p>

                  <form onSubmit={handleChangePin} className="space-y-3 max-w-sm">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        New Passcode / PIN
                      </label>
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="At least 4 characters"
                        className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Confirm New PIN
                      </label>
                      <input
                        type="password"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        placeholder="Re-enter PIN"
                        className="w-full px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-electric-400"
                      />
                    </div>

                    {pinChangeMsg.text && (
                      <p
                        className={`text-xs ${
                          pinChangeMsg.type === 'error' ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {pinChangeMsg.text}
                      </p>
                    )}

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-electric-500 hover:bg-electric-400 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Update Passcode
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('publish')}
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Sync to All Devices (Publish) ➔</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Export / Backup */}
                <div className="p-5 rounded-2xl bg-dark-950/60 border border-white/10 space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-electric-400" />
                    <span>Download JSON Backup</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Export all your current links, custom projects, and settings to a JSON file.
                  </p>

                  <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON Backup</span>
                  </button>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                  <h4 className="text-sm font-semibold text-rose-300 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Customizations</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Reset your portfolio back to original code defaults. This clears all custom uploaded photos, screenshots, and modified links.
                  </p>

                  <button
                    type="button"
                    onClick={async () => {
                      if (
                        confirm('Are you sure you want to reset all customizations to factory defaults?')
                      ) {
                        await resetToDefaults();
                        onShowToast?.('Reset to defaults completed', 'success');
                        onClose();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reset to Factory Defaults
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminModal;
