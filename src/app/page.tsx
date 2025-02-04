import Image from "next/image";
import Navbar from "./components/Navbar";
import CreatePost from "./Create";

export default function Home() {
  return (
    <div>
      <Navbar />;
      <CreatePost />
    </div>
  );
}
