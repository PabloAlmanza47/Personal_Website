import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaJava} from 'react-icons/fa';
import { SiJavascript, SiPython, SiReact, SiTypescript, SiHtml5, SiCss3, SiNodedotjs, SiNextdotjs, SiCplusplus, SiHaskell, SiTailwindcss, SiGit} from "react-icons/si";

export default function Home() {
  return (
    <main className="bg-[#113532] font-bold flex justify-center items-center h-screen">
        <div className="bg-white/20 p-2 outline outline-white/10 backdrop-blur-md w-125 h-60 relative rounded-3xl"> 
          <div className="bg-gray-950 w-full h-full flex flex-row rounded-2xl p-2 outline outline-white/15">
            {/* Personal information */}
            <div className="w-1/2 flex flex-col justify-center">
              {/* Top part */}
              <div className="flex justify-center h-full">
                <Image
                  src="/Pablo.jpg"
                  alt="me"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
              {/* Bottom Part */}
              <div className="flex flex-col items-center h-full ">
                <h1 className="flex flex-1 text-sm font-thin font-serif justify-center items-center">
                  Contact information
                </h1>
                <div className="bg-white/10 rounded-xl outline outline-white/15 flex flex-1 text-xs gap-4 justify-center items-center w-35">
                  <a 
                    href="https://github.com/PabloAlmanza47"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-950 transition"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/pabloalmanza/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-950 transition"
                  >
                    <FaLinkedin size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/mindsetofpablo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-950 transition"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a 
                    href="mailto:pabloalmanza3247@gmail.com" 
                    className="text-white hover:text-gray-950 transition"
                  >
                    <FaEnvelope size={18} />
                  </a>
                    
                </div>
              </div>
            </div>
            {/* Skills */}
            <div className="w-1/2 flex flex-col gap-2">
              <div className="bg-white/10 rounded-xl outline outline-white/15 h-2/3 p-2">
                <p className="text-xs font-thin font-serif">
                  Computer science student and web developer focused on building practical, user-centered solutions. I learn by doing, solving technical problems, and improving systems, driven by growth, responsibility, and community.                
                </p>
              </div>
              <div className="bg-white/10 rounded-xl outline outline-white/15 h-1/3 p-2 flex flex-col">
                <h2 className="font-bold text-xs">
                  Languages
                </h2>
                <div className="flex flex-row gap-1">
                  <SiPython size={13} />
                  <SiCplusplus size={13} />
                  <FaJava size={13} />
                  <SiTypescript size={13} />
                  <SiJavascript size={13} />
                  <SiHaskell size={13} />
                </div>
                <h2 className="font-bold text-xs">
                  Tools/Frameworks
                </h2>
                <div className="flex flex-row gap-1">
                  <SiHtml5 size={13} />
                  <SiCss3 size={13} />
                  <SiTailwindcss size={13} />
                  <SiReact size={13} />
                  <SiNodedotjs size={13} />
                  <SiNextdotjs size={13} />
                  <SiGit size={13} />
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
