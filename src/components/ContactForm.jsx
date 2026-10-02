import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { contactOptions } from '../data/portfolioData';

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

  // Update project type if user selected "Inquire About This Service" in Services section
  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    } else if (!formData.projectType && contactOptions?.projectTypes?.length > 0) {
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
      errs.projectType = 'Please select a project category.';
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
      // Latency simulation (or replace with Formspree / EmailJS API call)
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsSubmitted(true);
      if (onShowToast) {
        onShowToast('Project inquiry sent successfully! Mahir will respond promptly.', 'success');
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
      projectType: contactOptions?.projectTypes?.[0] || 'Backend Development',
      budget: '$100 – $250',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-10 rounded-2xl bg-brand-card border border-brand-orange/40 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
        <p className="text-brand-muted text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. I review every project specification personally and will get back to you with next steps within 24 hours.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-white text-sm font-semibold border border-white/10 hover:border-brand-orange/40 transition cursor-pointer"
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
            Your Name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-brand-dark/90 border text-white placeholder:text-brand-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 transition ${
              errors.name ? 'border-rose-500/80' : 'border-white/10 focus:border-brand-orange'
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
            Your Email <span className="text-brand-orange">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl bg-brand-dark/90 border text-white placeholder:text-brand-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 transition ${
              errors.email ? 'border-rose-500/80' : 'border-white/10 focus:border-brand-orange'
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
            Project Scope <span className="text-brand-orange">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-brand-dark/90 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition"
          >
            {contactOptions?.projectTypes?.map((type) => (
              <option key={type} value={type} className="bg-brand-dark text-white">
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
            className="w-full px-4 py-3 rounded-xl bg-brand-dark/90 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange transition"
          >
            {contactOptions?.budgetRanges?.map((budget) => (
              <option key={budget} value={budget} className="bg-brand-dark text-white">
                {budget}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
          Project Details & Deliverables <span className="text-brand-orange">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell me about what you need built (e.g., Express REST API endpoints, full-stack site, bug fixing, or responsive frontend)..."
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl bg-brand-dark/90 border text-white placeholder:text-brand-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/40 transition resize-none ${
            errors.message ? 'border-rose-500/80' : 'border-white/10 focus:border-brand-orange'
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
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Inquiry...</span>
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
