import React from "react";
import { Send, Check } from "lucide-react";

interface CareerApplicationFormProps {
  formData: { name: string; email: string; github: string; message: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; github: string; message: string }>>;
  submitted: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  roleTitle: string;
}

export default function CareerApplicationForm({
  formData,
  setFormData,
  submitted,
  handleSubmit,
  roleTitle,
}: CareerApplicationFormProps) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 md:p-6" id="career-application-form">
      <h3 className="font-sans font-bold text-sm text-zinc-900 uppercase tracking-wider pb-3 border-b border-zinc-200 mb-4">
        Apply for {roleTitle}
      </h3>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-2">
          <Check className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-emerald-900 text-sm">Application Received</h4>
          <p className="text-xs text-emerald-700 leading-relaxed max-w-xs mx-auto">
            Thank you for applying. Since Swarmauri operates as an open-source workflow, we will review your public GitHub history and reach out via email shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Linus Torvalds"
              className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. linus@kernel.org"
              className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
              GitHub Profile Link
            </label>
            <input
              type="url"
              required
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
              Why Swarmauri?
            </label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Brief summary of your contribution history and alignment with decoupled architectures..."
              className="w-full p-2 border border-zinc-300 rounded focus:outline-none focus:ring-1 focus:ring-zinc-900 text-xs bg-white resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs rounded transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Developer Profile</span>
          </button>
        </form>
      )}
    </div>
  );
}
