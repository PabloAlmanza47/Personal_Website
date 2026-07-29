'use client'

import pabloAscii from "../ascii/pabloAscii";
import pabloName from "../ascii/pabloName";
import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  ReadCvLogoIcon,
} from "@phosphor-icons/react";
import WindowFrame from "./WindowFrame";

interface AboutWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
  onEmailSent: () => void;
}

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function AboutWindow({
  onClose,
  zIndex,
  bringToFront,
  onEmailSent,
}: AboutWindowProps) {
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please include your name, email, and a message of at least 10 characters.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Message failed to send.");
      }

      setStatus("sent");
      setShowContact(false);
      onEmailSent();
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setCompany("");
      setTimeout(() => setStatus("idle"), 2500);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Message failed to send.");
    }
  };

  const actions = [
    {
      icon: <EnvelopeSimpleIcon size={18} />,
      action: () => setShowContact(true),
      label: "Contact",
    },
    {
      icon: <LinkedinLogoIcon size={18} />,
      action: () => window.open("https://www.linkedin.com/in/pabloalmanza/", "_blank", "noopener,noreferrer"),
      label: "LinkedIn",
    },
    {
      icon: <ReadCvLogoIcon size={18} />,
      action: () => window.open("/resume.pdf", "_blank", "noopener,noreferrer"),
      label: "Resume",
    },
    {
      icon: <GithubLogoIcon size={18} />,
      action: () => window.open("https://github.com/PabloAlmanza47", "_blank", "noopener,noreferrer"),
      label: "GitHub",
    },
  ];

  return (
    <WindowFrame
      title="About"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      sizeClassName={showContact ? "sm:w-[56rem] sm:h-[33rem]" : "sm:w-[43rem] sm:h-[31rem]"}
      initialOffset={{ x: 12, y: 28 }}
    >
      <div className={`flex flex-1 min-h-0 flex-col ${showContact ? "lg:grid lg:grid-cols-[1fr_21rem]" : ""}`}>
        <section className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
            pablo@portfolio:~/about
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            <pre
              className="hidden shrink-0 select-none whitespace-pre text-white/85 sm:block"
              style={{
                fontFamily: "Cascadia Code, Consolas, monospace",
                fontVariantLigatures: "none",
                fontSize: "10px",
                lineHeight: "1",
              }}
            >
              {pabloAscii}
            </pre>

            <div className="min-w-0 space-y-4">
              <pre
                className="hidden select-none whitespace-pre text-blue-400 sm:block"
                style={{
                  fontFamily: "Cascadia Code, Consolas, monospace",
                  fontVariantLigatures: "none",
                  fontSize: "10px",
                  lineHeight: "1",
                }}
              >
                {pabloName}
              </pre>

              <div className="sm:hidden">
                <h2 className="text-2xl font-semibold text-white">Pablo Almanza</h2>
                <p className="mt-1 font-mono text-xs text-blue-300">Software engineer and Texas A&amp;M CS student</p>
              </div>

              <div className="space-y-3 text-sm leading-6 text-slate-300">
                <p>
                  I am a computer science student at Texas A&amp;M University pursuing minors in
                  Mathematics and Engineering Project Management. I currently build production
                  software at PowerDB and will join Frogslayer as an incoming Junior Software Developer.
                </p>
                <p>
                  My strongest work sits at the intersection of practical engineering and community impact:
                  C# and Angular tools used in a production codebase, SHPE Connect for student networking,
                  and technical leadership for the Texas A&amp;M SHPE website team.
                </p>
                <p>
                  Born in Ohio and raised in Texas, I enjoy teaching programming, turning ambiguous
                  problems into useful products, and building systems that make it easier for people to connect.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {actions.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-2 font-mono text-[10px] text-slate-300 transition hover:border-blue-400/20 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    {item.icon} {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {showContact && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.18 }}
              className="border-t border-white/10 bg-black/20 p-4 lg:border-l lg:border-t-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-blue-300">Contact</p>
                  <h2 className="mt-1 text-base font-medium text-white">Send a message</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowContact(false)}
                  aria-label="Close contact form"
                  className="rounded-md border border-white/10 px-2 py-1 font-mono text-xs text-slate-400 hover:bg-white/[0.06] hover:text-white"
                >
                  esc
                </button>
              </div>

              <button
                type="button"
                className="mt-3 font-mono text-[10px] text-blue-300 hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText("pabloalmanza3247@gmail.com");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 900);
                }}
              >
                {copied ? "Email copied" : "pabloalmanza3247@gmail.com"}
              </button>

              <form onSubmit={handleSubmit} className="mt-4 flex h-[calc(100%-5rem)] flex-col gap-2">
                <label className="sr-only" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
                  placeholder="Your name"
                />

                <label className="sr-only" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
                  placeholder="Your email"
                />

                <label className="sr-only" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
                  placeholder="Subject (optional)"
                />

                <label className="sr-only" htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <label className="sr-only" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="min-h-28 flex-1 resize-none rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-blue-400/50"
                  placeholder="What would you like to talk about?"
                />

                {status === "error" && (
                  <p role="alert" className="text-[10px] leading-4 text-red-300">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-md bg-blue-600 px-3 py-2 font-mono text-xs text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </WindowFrame>
  );
}
