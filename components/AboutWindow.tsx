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
  const [showEmailWindow, setShowEmailWindow] = useState(false);
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
      setShowEmailWindow(false);
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
      icon: <EnvelopeSimpleIcon size={20} />,
      action: () => setShowEmailWindow(true),
      label: "Email",
    },
    {
      icon: <LinkedinLogoIcon size={20} />,
      action: () => window.open("https://www.linkedin.com/in/pabloalmanza/", "_blank", "noopener,noreferrer"),
      label: "LinkedIn",
    },
    {
      icon: <ReadCvLogoIcon size={20} />,
      action: () => window.open("/resume.pdf", "_blank", "noopener,noreferrer"),
      label: "Resume",
    },
    {
      icon: <GithubLogoIcon size={20} />,
      action: () => window.open("https://github.com/PabloAlmanza47", "_blank", "noopener,noreferrer"),
      label: "GitHub",
    },
  ];

  return (
    <WindowFrame
      title="All about me!"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      sizeClassName={showEmailWindow ? "sm:w-[54rem] sm:h-105" : "sm:w-130 sm:h-105"}
      initialOffset={{ x: 15, y: 30 }}
    >
      <div className={`flex flex-col ${showEmailWindow ? "lg:grid lg:grid-cols-[1fr_20rem]" : ""} flex-1 min-h-0`}>
        <section className="flex flex-col flex-1 min-h-0 px-3 sm:px-2 py-2 sm:py-1 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <div className="text-xs font-mono text-gray-300 shrink-0">
            <span>pablo</span>
            <span className="text-blue-700">@term.portfolio</span>
            <span>:aboutMe/info$ </span>
          </div>

          <div className="flex flex-col sm:flex-row flex-1 gap-3 overflow-visible sm:overflow-hidden">
            <pre
              className="hidden sm:block whitespace-pre select-none text-white shrink-0"
              style={{
                fontFamily: "Cascadia Code, Consolas, monospace",
                fontVariantLigatures: "none",
                fontSize: "11px",
                lineHeight: "1",
              }}
            >
              {pabloAscii}
            </pre>

            <div className="flex flex-col gap-3 min-w-0">
              <pre
                className="hidden sm:block whitespace-pre select-none text-blue-400"
                style={{
                  fontFamily: "Cascadia Code, Consolas, monospace",
                  fontVariantLigatures: "none",
                  fontSize: "11px",
                  lineHeight: "1",
                }}
              >
                {pabloName}
              </pre>

              <div className="sm:hidden font-mono">
                <h2 className="text-xl text-blue-400">Pablo Almanza</h2>
                <p className="text-xs text-white/40">Software engineer and Texas A&amp;M CS student</p>
              </div>

              <div className="font-mono text-[11px] sm:text-[9px] space-y-3 sm:space-y-2.5 leading-relaxed">
                <p>
                  is a computer science student at Texas A&amp;M University pursuing minors in
                  Mathematics and Engineering Project Management. He currently builds production
                  software at PowerDB and will join Frogslayer as a Junior Software Developer.
                </p>
                <p>
                  His work focuses on practical engineering and community impact: C# and Angular
                  tools used in a production codebase, SHPE Connect for student networking, and
                  technical leadership for the Texas A&amp;M SHPE website team.
                </p>
                <p>
                  Born in Ohio and raised in Texas, Pablo enjoys teaching programming, turning
                  ambiguous problems into useful products, and building systems that help people connect.
                </p>
              </div>

              <div className="flex flex-row flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-2 py-2">
                {actions.map((item, index) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    title={item.label}
                    aria-label={item.label}
                    onClick={item.action}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="text-gray-300 hover:text-blue-400 cursor-pointer transition duration-200 p-2 sm:p-1 rounded-sm hover:bg-white/5"
                  >
                    {item.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence>
          {showEmailWindow && (
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ type: "tween", duration: 0.2 }}
              className="border-t lg:border-t-0 lg:border-l border-gray-800 p-3 font-mono text-[11px] sm:text-[9px] flex flex-col gap-2 min-h-[22rem] lg:min-h-0"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-white/60">&gt; Contact_</h2>
                <button
                  type="button"
                  aria-label="Close contact form"
                  className="bg-blue-900 w-7 sm:w-5 h-3 sm:h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-sm"
                  onClick={() => setShowEmailWindow(false)}
                />
              </div>

              <div className="relative flex flex-wrap gap-x-1">
                <span>Work Email:</span>
                <button
                  type="button"
                  className="cursor-pointer text-blue-400 hover:underline"
                  onClick={() => {
                    navigator.clipboard.writeText("pabloalmanza3247@gmail.com");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 800);
                  }}
                >
                  pabloalmanza3247@gmail.com
                </button>
                {copied && <span className="text-blue-500">copied!</span>}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-1 min-h-0 flex-col gap-2">
                <label className="sr-only" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className="bg-black border border-gray-700 px-2 py-1 rounded-sm outline-none focus:border-blue-700"
                  placeholder="your name:"
                />

                <label className="sr-only" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className="bg-black border border-gray-700 px-2 py-1 rounded-sm outline-none focus:border-blue-700"
                  placeholder="your email:"
                />

                <label className="sr-only" htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="bg-black border border-gray-700 px-2 py-1 rounded-sm outline-none focus:border-blue-700"
                  placeholder="subject:"
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
                  className="bg-black border border-gray-700 px-2 py-1 flex-1 min-h-32 resize-none rounded-sm outline-none focus:border-blue-700"
                  placeholder="message..."
                />

                {status === "error" && (
                  <p role="alert" className="text-red-400">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 px-2 py-2 sm:py-1 disabled:opacity-50 rounded-sm font-mono"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "..." : "send"}
                </button>
              </form>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </WindowFrame>
  );
}
