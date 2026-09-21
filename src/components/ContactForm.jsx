import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { contactOptions, socialLinks } from '../data/portfolioData';

export function ContactForm({ initialProjectType = '', onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '$100 – $250',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update project type if user selected "Discuss Project" in Services
  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    } else if (!formData.projectType && contactOptions.projectTypes.length > 0) {
      setFormData((prev) => ({ ...prev, projectType: contactOptions.projectTypes[0] }));
    }
  }, [initialProjectType]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.projectType) {
      errs.projectType = 'Please select a project type.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please describe your project or requirements.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide a little more detail (at least 15 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      /**
       * BACKEND / EMAIL INTEGRATION HOOK
       * To connect EmailJS, Formspree, or your custom Express backend:
       * 
       * Example with Formspree:
       * await fetch("https://formspree.io/f/YOUR_FORM_ID", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify(formData)
       * });
       * 
       * Example with EmailJS:
       * await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_PUBLIC_KEY");
       */

      // Simulated network latency
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      if (onShowToast) {
        onShowToast('Message prepared! Mahir will respond promptly.', 'success');
      }
    } catch (err) {
      if (onShowToast) {
        onShowToast('Something went wrong. Please reach out directly via email.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      projectType: contactOptions.projectTypes[0] || 'Backend Development',
      budget: '$100 – $250',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-3xl glass-card border border-emerald-500/30 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Thank You for Reaching Out!</h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
          Your project inquiry has been received. I review every client message carefully and will get back to you within 24 hours.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-slate-200 hover:text-white text-sm font-medium border border-white/10 transition"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
            Your Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Alex Morgan"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-dark-900/80 border text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-electric-400/40 transition ${
              errors.name ? 'border-rose-500/80' : 'border-white/10 focus:border-electric-400'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
            Your Email <span className="text-rose-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="alex@company.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-dark-900/80 border text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-electric-400/40 transition ${
              errors.email ? 'border-rose-500/80' : 'border-white/10 focus:border-electric-400'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Project Type and Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="projectType" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
            Project Type <span className="text-rose-400">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-electric-400/40 focus:border-electric-400 transition"
          >
            {contactOptions.projectTypes.map((type) => (
              <option key={type} value={type} className="bg-dark-900 text-slate-200">
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
              <AlertCircle className="w-3 h-3" /> {errors.projectType}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-electric-400/40 focus:border-electric-400 transition"
          >
            {contactOptions.budgetRanges.map((budget) => (
              <option key={budget} value={budget} className="bg-dark-900 text-slate-200">
                {budget}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
          Project Details & Goals <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell me about what you are looking to build (e.g. REST API endpoints, full-stack site, or Express backend architecture)..."
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl bg-dark-900/80 border text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-electric-400/40 transition resize-none ${
            errors.message ? 'border-rose-500/80' : 'border-white/10 focus:border-electric-400'
          }`}
        />
        {errors.message && (
          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-mono">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-electric-500 to-indigoAcc-500 hover:from-electric-400 hover:to-indigoAcc-400 text-white font-semibold text-sm transition-all shadow-lg shadow-electric-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Project Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}

export default ContactForm;
