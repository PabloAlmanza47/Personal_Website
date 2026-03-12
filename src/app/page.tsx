import MainCard from "../../components/MainCard";
import AboutWindow from "../../components/AboutWindow";
import MenuBar from "../../components/MenuBar";

export default function Home() {
  return (
    <main className="bg-[#113532] font-bold flex justify-center items-center h-screen relative">
      <MenuBar/>
      <div className="w-96 h-14 flex flex-row justify-center items-center gap-2 absolute bottom-5"> 
        <AboutWindow />
        <MainCard />
      </div>
    </main>
  );
}
