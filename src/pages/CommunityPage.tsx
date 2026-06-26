import React, { useState } from "react";
import { Github, ArrowUpRight, MessageSquare, Compass, Send, CheckCircle2, Heart } from "lucide-react";
import SEO from "../components/SEO";

export default function CommunityPage() {
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportForm, setSupportForm] = useState({ name: "", email: "", issue: "" });

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportForm({ name: "", email: "", issue: "" });
    }, 4000);
  };

  const socialLinks = [
    {
      name: "GitHub Ecosystem",
      desc: "Report issues, review the monorepo workspace members, or submit pull request integrations.",
      link: "https://github.com/swarmauri/swarmauri-sdk",
      label: "Open GitHub Project",
      icon: Github,
      accent: "hover:border-zinc-900 hover:text-zinc-950"
    },
    {
      name: "Discord Server",
      desc: "Connect directly with active cryptographers, model wrappers, and technical authors.",
      link: "https://discord.gg/swarmauri",
      label: "Join Chatroom",
      icon: MessageSquare,
      accent: "hover:border-indigo-400 hover:text-indigo-600"
    },
    {
      name: "Global Contributor Hub",
      desc: "Review contribution documentation, standards policies, and namespace authoring templates.",
      link: "https://github.com/swarmauri/swarmauri-sdk/blob/main/CONTRIBUTING.md",
      label: "Read Guidelines",
      icon: Compass,
      accent: "hover:border-emerald-400 hover:text-emerald-600"
    }
  ];

  return (
    <div className="space-y-12 py-6" id="community-page">
      <SEO
        title="Community Hub & Support"
        description="Connect with active developers, cryptographers, model wrappers, and technical contributors in the Swarmauri Ecosystem. Access guidelines, GitHub repos, and join Discord."
        keywords={["community", "discord", "open source contribution", "github", "swarmauri sdk"]}
      />
      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">
          Community & Technical Support
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-xl">
          Connect with core package maintainers, find chatrooms, and submit implementation assistance questions.
        </p>
      </div>

      {/* Grid of Social Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" id="community-channels">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <div
              key={social.name}
              className={`bg-white border border-zinc-200 rounded-xl p-6 shadow-sm transition-all flex flex-col justify-between space-y-4 ${social.accent}`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-700">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-zinc-950">{social.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{social.desc}</p>
              </div>

              <a
                href={social.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-2"
              >
                <span>{social.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </section>

      {/* Interactive Support form */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8" id="support-grid">
        {/* Support Statement */}
        <div className="md:col-span-5 space-y-4">
          <h2 className="text-xl font-bold text-zinc-950 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span>Implementation Support</span>
          </h2>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Need help configuring custom vector stores, wrapping private inference APIs, or setting up AES encryption? Swarmauri offers first-party implementation and optimization services for teams building pluggable Python software.
          </p>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Submit a request using the spontaneous ticket form, or connect with our DevRel team directly on Discord.
          </p>
        </div>

        {/* Support Ticket form */}
        <div className="md:col-span-7 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm" id="support-ticket-card">
          <h3 className="font-bold text-sm text-zinc-900 mb-4 pb-2 border-b border-zinc-100">
            Submit an Optimization Request
          </h3>

          {supportSubmitted ? (
            <div className="py-8 text-center space-y-3 text-green-800">
              <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
              <h4 className="font-bold text-xs uppercase tracking-wider">Ticket Created Successfully</h4>
              <p className="text-xs text-green-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. A developer advocate will review your architectural outline and follow up within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-600 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                    placeholder="e.g. Marie Curie"
                    className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-600 block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={supportForm.email}
                    onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                    placeholder="e.g. marie@gmail.com"
                    className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-zinc-600 block">Architectural Issue or Question</label>
                <textarea
                  rows={3}
                  required
                  value={supportForm.issue}
                  onChange={(e) => setSupportForm({ ...supportForm, issue: e.target.value })}
                  placeholder="Outline your tech stack, selected models, and desired cryptographic limits..."
                  className="w-full bg-white border border-zinc-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded text-xs transition-colors flex items-center space-x-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Support Request</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
