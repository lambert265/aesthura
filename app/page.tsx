import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Marquee from "./components/site/Marquee";

const About    = dynamic(() => import("./components/site/About"));
const Services = dynamic(() => import("./components/site/Services"));
const Projects = dynamic(() => import("./components/site/Projects"));
const Stages   = dynamic(() => import("./components/site/Stages"));
const Booking  = dynamic(() => import("./components/site/Booking"));
const Contact  = dynamic(() => import("./components/site/Contact"));

export default function Home() {
  return (
    <main className="bg-bg text-fg">
      <Hero />
      <Marquee />
      <About />
      <Services preview />
      <Projects preview />
      <Stages />
      <Booking />
      <Contact />
    </main>
  );
}
