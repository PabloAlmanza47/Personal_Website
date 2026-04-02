'use client'
import pabloAscii from "../ascii/pabloAscii";
import pabloName from "../ascii/pabloName";
import { useRef, useState } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { ReadCvLogoIcon, GithubLogoIcon, EnvelopeSimpleIcon, InstagramLogoIcon, LinkedinLogoIcon} from "@phosphor-icons/react";

interface AboutWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
  onEmailSent: () => void;
}

export default function AboutWindow({ onClose, zIndex, bringToFront, onEmailSent }: AboutWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [showEmailWindow, setShowEmailWindow] = useState(false);
  const [copied, setCopied] = useState(false);
  
  //email back end
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  //sending email function
  const handleSend = async () => {
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await fetch("https://hook.us2.make.com/2uoju11xfitvznsapc5yjwa4yxh36xfd", {
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

      setStatus("sent");
      setShowEmailWindow(false);
      onEmailSent();

      // reset form
      setTimeout(() => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }, 2500);

    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div ref={containerRef} style={{ zIndex }} className="fixed inset-0 pointer-events-none">
      <motion.div
        onMouseDown={bringToFront}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef}
        initial={{ scale: 0.65, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 30, x:15 }}
        exit={{ scale: 0.15, opacity: 0, y: 40 }}
        className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-auto h-97 flex flex-row gap-1"
      >
        <motion.div
          className="flex flex-row gap-1 z-20"
          initial={false}
          animate={{ width: showEmailWindow ? 528 + 324 + 8 : 528 }}
          transition={{ type: "tween", duration: 0.25,  ease: [0.22, 1, 0.36, 1]}}        
        >
        
        {/* Main window */}
        <div className="bg-gray-950 h-full w-132 p-1 rounded-lg shrink-0">
          <div className="bg-gray-950 w-full h-full outline-2 outline-gray-500 rounded-sm flex flex-col">
            {/* Top Bar */}
            <div
              onPointerDown={(e) => { bringToFront(); dragControls.start(e); }}
              className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing"
            >
              <div className="absolute left-0 flex">
                <button
                  aria-label="Close window"
                  className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm"
                  onClick={onClose}
                />
                <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200" />
                <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200" />
              </div>
              <h1 className="absolute left-1/2 text-[10px] -translate-x-1/2 text-white/60 h-full flex justify-center items-center">
                {'>'} All about me!_
              </h1>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-2 py-1 gap-1">
              <div className="text-xs font-mono text-gray-300">
                <span>pablo</span>
                <span className="text-blue-700">@term.portfolio</span>
                <span>:aboutMe/info$ </span>
              </div>

              <div className="flex flex-row flex-1 gap-2 overflow-hidden">
                {/* ASCII */}
                <pre
                  className="whitespace-pre select-none text-white"
                  style={{
                    fontFamily: "Cascadia Code, Consolas, monospace",
                    fontVariantLigatures: "none",
                    fontSize: "11px",
                    lineHeight: "1"
                  }}
                >
                  {pabloAscii}
                </pre>

                <div className="flex flex-col gap-2">
                  {/* Name */}
                  <pre
                    className="whitespace-pre select-none text-blue-400"
                    style={{
                      fontFamily: "Cascadia Code, Consolas, monospace",
                      fontVariantLigatures: "none",
                      fontSize: "11px",
                      lineHeight: "1"
                    }}
                  >
                    {pabloName}
                  </pre>

                  {/* Info */}
                  <div className="font-mono text-[9px] space-y-2.5">
                    <p>
                      is a computer science student and builder on the internet,
                      creating software, games, and experiments while documenting
                      the process of learning and building in public.
                    </p>
                    <p>
                      Born in Houston and raised in Dallas, he currently studies
                      Computer Science at Texas A&M University. His work ranges
                      from modern web development and systems programming to small
                      interactive games and creative side projects.
                    </p>
                    <p>
                      Pablo is also passionate about indie music, teaching
                      programming, and breaking down complex technical ideas so
                      others can learn how to build their own tools and projects.
                    </p>
                  </div>

                  {/* Icons */}
                  <div className="flex flex-row h-full items-center justify-center gap-1">
                    {[
                      {
                        icon: <EnvelopeSimpleIcon size={20} />,
                        action: () => setShowEmailWindow(true),
                        label: "Email"
                      },
                      {
                        icon: <LinkedinLogoIcon size={20} />,
                        action: () => window.open("https://www.linkedin.com/in/pabloalmanza/", "_blank"),
                        label: "LinkedIn"
                      },
                      {
                        icon: <InstagramLogoIcon size={20} />,
                        action: () => window.open("https://instagram.com/YOUR_HANDLE", "_blank"),
                        label: "Instagram"
                      },
                      {
                        icon: <ReadCvLogoIcon size={20} />,
                        action: () => window.open("/resume.pdf", "_blank"),
                        label: "Resume"
                      },
                      {
                        icon: <GithubLogoIcon size={20} />,
                        action: () => window.open("https://github.com/PabloAlmanza47", "_blank"),
                        label: "GitHub"
                      }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        title={item.label}
                        onClick={item.action}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="text-gray-300 hover:text-blue-400 cursor-pointer transition duration-200"
                      >
                        {item.icon}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Window */}
        <AnimatePresence>
          {showEmailWindow && (
            <motion.div
              initial={{ x: -330, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -350, opacity: 1 }}
              transition={{ type: "tween", duration: 0.25,  ease: [0.22, 1, 0.36, 1]}}
              className="bg-gray-950 p-1 rounded-lg -z-10"
            >
              <div className="bg-gray-950 w-80 h-full outline-2 outline-gray-500 rounded-sm flex flex-col">

                {/* Top Bar */}
                <div
                  onPointerDown={(e) => { bringToFront(); dragControls.start(e); }}
                  className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing flex justify-between"
                >
                  <h2 className="text-[10px] text-white/60 ml-1 h-full flex justify-center items-center">
                    {'>'} contact_
                  </h2>
                  <button
                    aria-label="Close window"
                    className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tr-sm"
                    onClick={() => setShowEmailWindow(false)}
                  />
                </div>

                {/* Content */}
                <div className="p-2 font-mono text-[9px] flex flex-col gap-2 flex-1">
                  <div className="relative flex">
                    <span className="">Work Email:</span> 
                    <span 
                      className="cursor-pointer text-blue-400 hover:underline ml-1" 
                      onClick={() => {
                        navigator.clipboard.writeText("pabloalmanza3247@gmail.com");
                        setCopied(true);
                        setTimeout(() => setCopied(false), 800);
                      }}
                    >
                      pabloalmanza3247@gmail.com
                    </span>
                    {copied && (
                      <span className=" ml-1 text-[9px] text-blue-500">copied!</span>
                    )}
                  </div>
                  
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black border border-gray-700 px-1 py-0.5 rounded-sm"
                    placeholder="your name:"
                  />

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black border border-gray-700 px-1 py-0.5 rounded-sm"
                    placeholder="your email:"
                  />

                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-black border border-gray-700 px-1 py-0.5 rounded-sm"
                    placeholder="subject:"
                  />

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-black border border-gray-700 px-1 py-0.5 flex-1 resize-none rounded-sm"
                    placeholder="message..."
                  />

                  <button
                    className="bg-blue-700 hover:bg-blue-600 px-2 py-1 disabled:opacity-50 rounded-sm font-mono"
                    onClick={handleSend}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "..." : "send"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        </motion.div>
      </motion.div>
    </div>
  );
}