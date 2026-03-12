import MainCard from "../../components/mainCard";
import AboutWindow from "../../components/AboutWindow";

export default function Home() {
  return (
    <main className="bg-[#113532] font-bold flex justify-center items-center h-screen relative">
      <div className="w-96 h-14 rounded-xl flex flex-row justify-center items-center gap-2 absolute bottom-5"> 
        <AboutWindow />
        <MainCard />
      </div>
    </main>
  );
}
