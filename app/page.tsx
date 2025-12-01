import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeContent from "./components/HomeContent";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeContent/>
      <Footer />
    </>
  );
}
