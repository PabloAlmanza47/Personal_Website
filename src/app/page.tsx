import ProjectsWindow from "../../components/ProjectsWindow";
import AboutWindow from "../../components/AboutWindow";
import BlogWindow from "../../components/BlogWindow";
import MenuBar from "../../components/MenuBar";
import MusicWindow from "../../components/MusicWindow";

export default function Home() {
  return (
    <main className="bg-[#113532] font-bold flex justify-center items-center h-screen relative">
      <MenuBar/>
      <div className="w-96 h-14 flex flex-row justify-center items-center gap-2 absolute bottom-5"> 
        <AboutWindow />
        <ProjectsWindow />
        <BlogWindow />
        <MusicWindow />
      </div>
    </main>
  );
}
