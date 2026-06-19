'use client'

import pabloAscii from "../ascii/pabloAscii";
import pabloName from "../ascii/pabloName";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReadCvLogoIcon, GithubLogoIcon, EnvelopeSimpleIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import WindowFrame from "./WindowFrame";

interface AboutWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
  onEmailSent: () => void;
}

export default function AboutWindow({ onClose, zIndex, bringToFront, onEmailSent }: AboutWindowProps) {
  const [showEmailWindow, setShowEmailWindow] = useState(false);
  const [copied, setCopied] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSend = async () => {
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://hook.us2.make.com/2uoju11xfitvznsapc5yjwa4yxh36xfd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Message failed to send");
      }

      setStatus("sent");
      setShowEmailWindow(false);
      onEmailSent();

      setTimeout(() => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setStatus("idle");
      }, 2500);
    } catch (err) {
      console.error(err);
      setStatus("error");
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
      action: () => window.open("https://www.linkedin.com/in/pabloalmanza/", "_blank"),
      label: "LinkedIn",
    },
    {
      icon: <ReadCvLogoIcon size={20} />,
      action: () => window.open("/resume.pdf", "_blank"),
      label: "Resume",
    },
    {
      icon: <GithubLogoIcon size={20} />,
      action: () => window.open("https://github.com/PabloAlmanza47", "_blank"),
      label: "GitHub",
    },
  ];

  return (
    <WindowFrame
      title="All about me!"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      contentClassName={showEmailWindow ? "sm:w-[54rem] sm:h-105" : "sm:w-130 sm:h-105"}
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
                <p className="text-xs text-white/40">Computer Science student and software developer</p>
              </div>

              <div className="font-mono text-[11px] sm:text-[9px] space-y-3 sm:space-y-2.5 leading-relaxed">
                <p>
                  is a computer science student and builder on the internet,
                  creating software, games, and experiments while documenting
                  the process of learning and building in public.
                </p>
                <p>
                  Born in Houston and raised in Dallas, he currently studies
                  Computer Science at Texas A&amp;M University. His work ranges
                  from modern web development and systems programming to small
                  interactive games and creative side projects.
                </p>
                <p>
                  Pablo is also passionate about indie music, teaching
                  programming, and breaking down complex technical ideas so
                  others can learn how to build their own tools and projects.
                </p>
              </div>

              <div className="flex flex-row flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-2 py-2">
                {actions.map((item, i) => (
                  <motion.button
                    key={item.label}
                    title={item.label}
                    onClick={item.action}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
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
                <h2 className="text-white/60">{'>'} Contact_</h2>
                <button
                  aria-label="Close contact form"
                  className="bg-blue-900 w-7 sm:w-5 h-3 sm:h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-sm"
                  onClick={() => setShowEmailWindow(false)}
                />
              </div>

              <div className="relative flex flex-wrap gap-x-1">
                <span>Work Email:</span>
                <button
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

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black border border-gray-700 px-2 py-1 rounded-sm outline-none focus:border-blue-700"
                placeholder="your name:"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border border-gray-700 px-2 py-1 rounded-sm outline-none focus:border-blue-700"
                placeholder="your email:"
              />

              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-black border border-gray-700 px-2 py-1 rounded-sm outline-none focus:border-blue-700"
                placeholder="subject:"
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-black border border-gray-700 px-2 py-1 flex-1 min-h-32 resize-none rounded-sm outline-none focus:border-blue-700"
                placeholder="message..."
              />

              {status === "error" && (
                <p className="text-red-400">Please fill out your name, email, and message.</p>
              )}

              <button
                className="bg-blue-700 hover:bg-blue-600 px-2 py-2 sm:py-1 disabled:opacity-50 rounded-sm font-mono"
                onClick={handleSend}
                disabled={status === "sending"}
              >
                {status === "sending" ? "..." : "send"}
              </button>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </WindowFrame>
  );
}
