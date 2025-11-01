import Image from "next/image";
import InfinityLoop from "../component/InfiniteLoop";
import MenuBar from "./menu/nav/page";
import coach_home from "../Images/coach_home.jpg";

export default function Home() {
  return (
    <div className=" bg-zinc-50 min-h-screen">
      <MenuBar></MenuBar>
      <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-8">
        <div className="flex flex-col items-center">
          <p className="text-3xl font-extrabold text-emerald-800 text-center mb-2">
            Welcome to 1:1 Coaching Connect Session
          </p>
          <div className="flex items-center justify-center bg-zinc-50">
            <InfinityLoop />
          </div>
        </div>

        <Image
          src={coach_home}
          width={330}
          height={385}
          alt="image_coach_home"
          className="rounded-xl shadow-lg m-1"
        />
      </div>
    </div>
  );
}
