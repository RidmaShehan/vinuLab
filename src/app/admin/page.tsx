"use client";

import { useState, useEffect } from "react";
import type { Content, ThemeMode } from "@/lib/content";
import AnalyticsTab from "./AnalyticsTab";
import ConsultationsTab from "./ConsultationsTab";

const TABS = ["Services", "Projects", "Team", "Blog", "FAQ", "Contact", "Consultations", "Analytics"] as const;

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Services");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
    setMessage("");
  };

  const handleSave = async () => {
    if (!content || !password) {
      setMessage("Please enter the admin password to save.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password,
        },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Save failed");
      }
      setMessage("Saved successfully! Refresh the main site to see changes.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold">VinuLab Admin</h1>
          <p className="text-zinc-400 text-sm">Enter the admin password to continue.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-colors"
          >
            Log in
          </button>
          <p className="text-xs text-zinc-500">
            Default password: vinulab-admin. Set ADMIN_PASSWORD in .env.local for production.
          </p>
        </form>
      </div>
    );
  }

  const update = <K extends keyof Content>(section: K, data: Partial<Content[K]>) => {
    setContent((prev) => prev && { ...prev, [section]: { ...prev[section], ...data } });
  };

  const updateService = (i: number, field: string, value: string | string[]) => {
    const items = [...content.services.items];
    if (field === "tags") items[i] = { ...items[i], tags: value as string[] };
    else items[i] = { ...items[i], [field]: value };
    update("services", { items });
  };

  const updateProject = (i: number, field: "name" | "url", value: string) => {
    const items = [...content.projects.items];
    items[i] = { ...items[i], [field]: value };
    update("projects", { items });
  };

  const updateBlogArticle = (i: number, field: string, value: string) => {
    const articles = [...content.blog.articles];
    articles[i] = { ...articles[i], [field]: value };
    update("blog", { articles });
  };

  const updateFaqItem = (i: number, field: "q" | "a", value: string) => {
    const items = [...content.faq.items];
    items[i] = { ...items[i], [field]: value };
    update("faq", { items });
  };

  const addService = () => {
    const items = [...content.services.items];
    const nextId = String(items.length + 1).padStart(2, "0");
    items.push({ id: nextId, title: "New Service", description: "", tags: [] });
    update("services", { items });
  };

  const deleteService = (i: number) => {
    const items = content.services.items
      .filter((_, idx) => idx !== i)
      .map((item, idx) => ({ ...item, id: String(idx + 1).padStart(2, "0") }));
    update("services", { items });
  };

  const addProject = () => {
    const items = [...content.projects.items, { name: "New Project", url: "" }];
    update("projects", { items });
  };

  const deleteProject = (i: number) => {
    const items = content.projects.items.filter((_, idx) => idx !== i);
    update("projects", { items });
  };

  const addTeamMember = () => {
    const memberNames = [...content.team.memberNames, "New Member"];
    update("team", { memberNames });
  };

  const deleteTeamMember = (i: number) => {
    const memberNames = content.team.memberNames.filter((_, idx) => idx !== i);
    update("team", { memberNames });
  };

  const addBlogArticle = () => {
    const articles = [...content.blog.articles, { title: "New Article", excerpt: "", url: "", readTime: "4 min" }];
    update("blog", { articles });
  };

  const deleteBlogArticle = (i: number) => {
    const articles = content.blog.articles.filter((_, idx) => idx !== i);
    update("blog", { articles });
  };

  const addFaqItem = () => {
    const items = [...content.faq.items, { q: "New question?", a: "" }];
    update("faq", { items });
  };

  const deleteFaqItem = (i: number) => {
    const items = content.faq.items.filter((_, idx) => idx !== i);
    update("faq", { items });
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-xl font-bold">VinuLab Admin</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Site theme:</span>
            <select
              value={content.theme?.defaultMode ?? "dark"}
              onChange={(e) => update("theme", { defaultMode: (e.target.value as ThemeMode) })}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="dark">Night</option>
              <option value="light">Light</option>
            </select>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm w-40 placeholder-zinc-500"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <a href="/" className="text-zinc-400 hover:text-white text-sm">View site →</a>
        </div>
      </header>

      {message && (
        <div className={`mx-6 mt-4 px-4 py-2 rounded-lg ${message.includes("Saved") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
          {message}
        </div>
      )}

      <div className="flex">
        <aside className="w-56 border-r border-white/10 p-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-1 transition-colors ${
                activeTab === tab ? "bg-cyan-500/20 text-cyan-400" : "hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </aside>

        <main className={`flex-1 p-8 ${activeTab === "Analytics" ? "max-w-6xl" : "max-w-4xl"}`}>
          {activeTab === "Services" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Services</h2>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Heading</label>
                <input
                  value={content.services.heading}
                  onChange={(e) => update("services", { heading: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Heading Highlight</label>
                <input
                  value={content.services.headingHighlight}
                  onChange={(e) => update("services", { headingHighlight: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Subheading</label>
                <textarea
                  value={content.services.subheading}
                  onChange={(e) => update("services", { subheading: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              {content.services.items.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Service {i + 1}</h3>
                    <button
                      type="button"
                      onClick={() => deleteService(i)}
                      className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                  <input
                    placeholder="ID"
                    value={item.id}
                    onChange={(e) => updateService(i, "id", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  />
                  <input
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => updateService(i, "title", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <textarea
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateService(i, "description", e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <input
                    placeholder="Tags (comma-separated)"
                    value={item.tags.join(", ")}
                    onChange={(e) => updateService(i, "tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addService}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                + Add Service
              </button>
            </div>
          )}

          {activeTab === "Projects" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Projects</h2>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Heading</label>
                <input
                  value={content.projects.heading}
                  onChange={(e) => update("projects", { heading: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Keywords (comma-separated)</label>
                <input
                  value={content.projects.keywords.join(", ")}
                  onChange={(e) => update("projects", { keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean) })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              {content.projects.items.map((p, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 flex gap-4 items-center">
                  <input
                    placeholder="Project name"
                    value={p.name}
                    onChange={(e) => updateProject(i, "name", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <input
                    placeholder="URL"
                    value={p.url}
                    onChange={(e) => updateProject(i, "url", e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => deleteProject(i)}
                    className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addProject}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                + Add Project
              </button>
            </div>
          )}

          {activeTab === "Team" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Team</h2>
              {(["heading", "headingHighlight", "paragraph1", "paragraph2", "memberLabel"] as const).map((key) => (
                <div key={key}>
                  <label className="block text-sm text-zinc-400 mb-1">{key}</label>
                  <input
                    value={content.team[key]}
                    onChange={(e) => update("team", { [key]: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Team members</label>
                <div className="space-y-2">
                  {content.team.memberNames.map((name, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        value={name}
                        onChange={(e) => {
                          const names = [...content.team.memberNames];
                          names[i] = e.target.value;
                          update("team", { memberNames: names });
                        }}
                        className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                        placeholder="Member name"
                      />
                      <button
                        type="button"
                        onClick={() => deleteTeamMember(i)}
                        className="text-red-400 hover:text-red-300 text-sm px-2 py-1 shrink-0"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="mt-2 py-2 px-4 border border-dashed border-white/20 rounded-lg text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 text-sm"
                >
                  + Add member
                </button>
              </div>
            </div>
          )}

          {activeTab === "Blog" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Blog</h2>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Heading / Heading Highlight / Subheading</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={content.blog.heading}
                    onChange={(e) => update("blog", { heading: e.target.value })}
                    placeholder="Heading"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <input
                    value={content.blog.headingHighlight}
                    onChange={(e) => update("blog", { headingHighlight: e.target.value })}
                    placeholder="Highlight"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                </div>
                <textarea
                  value={content.blog.subheading}
                  onChange={(e) => update("blog", { subheading: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2"
                />
                <input
                  value={content.blog.viewAllUrl}
                  onChange={(e) => update("blog", { viewAllUrl: e.target.value })}
                  placeholder="View all URL"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              {content.blog.articles.map((a, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Article {i + 1}</h3>
                    <button
                      type="button"
                      onClick={() => deleteBlogArticle(i)}
                      className="text-red-400 hover:text-red-300 text-sm px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                  <input
                    placeholder="Title"
                    value={a.title}
                    onChange={(e) => updateBlogArticle(i, "title", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <textarea
                    placeholder="Excerpt"
                    value={a.excerpt}
                    onChange={(e) => updateBlogArticle(i, "excerpt", e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <input
                    placeholder="URL"
                    value={a.url}
                    onChange={(e) => updateBlogArticle(i, "url", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  />
                  <input
                    placeholder="Read time"
                    value={a.readTime}
                    onChange={(e) => updateBlogArticle(i, "readTime", e.target.value)}
                    className="w-24 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addBlogArticle}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                + Add Article
              </button>
            </div>
          )}

          {activeTab === "FAQ" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">FAQ</h2>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Subheading / Heading</label>
                <input
                  value={content.faq.subheading}
                  onChange={(e) => update("faq", { subheading: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2"
                />
                <input
                  value={content.faq.heading}
                  onChange={(e) => update("faq", { heading: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              {content.faq.items.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => deleteFaqItem(i)}
                      className="text-red-400 hover:text-red-300 text-sm px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                  <input
                    placeholder="Question"
                    value={item.q}
                    onChange={(e) => updateFaqItem(i, "q", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                  <textarea
                    placeholder="Answer"
                    value={item.a}
                    onChange={(e) => updateFaqItem(i, "a", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addFaqItem}
                className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
              >
                + Add FAQ
              </button>
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Contact</h2>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Heading / Highlight</label>
                <input
                  value={content.contact.heading}
                  onChange={(e) => update("contact", { heading: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2"
                />
                <input
                  value={content.contact.headingHighlight}
                  onChange={(e) => update("contact", { headingHighlight: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Subheading</label>
                <textarea
                  value={content.contact.subheading}
                  onChange={(e) => update("contact", { subheading: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Button text / Default message</label>
                <input
                  value={content.contact.buttonText}
                  onChange={(e) => update("contact", { buttonText: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2"
                />
                <input
                  value={content.contact.defaultMessage}
                  onChange={(e) => update("contact", { defaultMessage: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Contact email</label>
                <input
                  type="email"
                  value={content.contact.contactEmail}
                  onChange={(e) => update("contact", { contactEmail: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">LinkedIn / Instagram URLs</label>
                <input
                  value={content.contact.linkedinUrl}
                  onChange={(e) => update("contact", { linkedinUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2"
                />
                <input
                  value={content.contact.instagramUrl}
                  onChange={(e) => update("contact", { instagramUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Privacy / Cookie policy URLs</label>
                <input
                  value={content.contact.privacyPolicyUrl}
                  onChange={(e) => update("contact", { privacyPolicyUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-2"
                />
                <input
                  value={content.contact.cookiePolicyUrl}
                  onChange={(e) => update("contact", { cookiePolicyUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                />
              </div>
            </div>
          )}

          {activeTab === "Consultations" && (
            <ConsultationsTab password={password} />
          )}

          {activeTab === "Analytics" && (
            <AnalyticsTab password={password} />
          )}
        </main>
      </div>
    </div>
  );
}
