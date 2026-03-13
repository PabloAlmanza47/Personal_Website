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
        <div className="w-10 h-10 bg-black rounded-full hover:rounded-md hover:scale-125 transition-transform duration-500 ease-out"></div>
      </div>
    </main>
  );
}
