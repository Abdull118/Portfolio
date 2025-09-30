import React, { useState } from "react";
import Head from "next/head";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GetStartedPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    const emailOk = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(form.email);
    if (!emailOk) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a short message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ loading: false, success: null, error });
      return;
    }
    try {
      setStatus({ loading: true, success: null, error: null });
      const res = await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus({ loading: false, success: "Thanks! We'll be in touch soon.", error: null });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message || "Submission failed." });
    }
  };

  return (
    <>
      <Head>
        <title>Get Started</title>
        <meta name="description" content="Get started by telling us about your project." />
      </Head>
      <div className="container mx-auto mb-10">
        <Header isBlog />
      </div>
      <div className="max-w-5xl mx-auto mt-4 px-4">
        <h1 className="text-3xl font-semibold mb-3">Get In Touch</h1>
        <p className="mb-10 opacity-80">Ready to level up your brand and website? Share your goals and I'll craft a tailored plan to help you win more customers. Prefer to talk? Call anytime at <a className="underline" href="tel:13474001820">(347) 400-1820</a>.</p>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-10">
          <div className="rounded-xl p-5 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-medium mb-4">Contact Information</h2>
            <ul className="space-y-3">
              <li>
                <span className="opacity-70 block text-sm">Email</span>
                <a className="underline" href="mailto:ahmadevelops@gmail.com">ahmadevelops@gmail.com</a>
              </li>
              <li>
                <span className="opacity-70 block text-sm">Phone</span>
                <a className="underline" href="tel:13474001820">(347) 400-1820</a>
              </li>
              <li>
                <span className="opacity-70 block text-sm">Areas Served</span>
                <span>USA & Canada</span>
              </li>
              <li>
                <span className="opacity-70 block text-sm">Availability</span>
                <span>24/7</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-medium mb-4">Make Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block mb-1" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-400"
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-lg px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-400"
                  placeholder="Share goals, timeline, budget, and any links."
                />
              </div>
              {status.error && (
                <div className="text-red-600 dark:text-red-400 text-sm">{status.error}</div>
              )}
              {status.success && (
                <div className="text-green-600 dark:text-green-400 text-sm">{status.success}</div>
              )}
              <Button type="primary" onClick={handleSubmit}>
                {status.loading ? "Submitting..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-16">
        <Footer />
      </div>
    </>
  );
};

export default GetStartedPage;


