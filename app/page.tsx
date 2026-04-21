import Hero from "./components/Hero";
import Marquee from "./components/site/Marquee";
import About from "./components/site/About";
import Services from "./components/site/Services";
import Projects from "./components/site/Projects";
import Stages from "./components/site/Stages";
import Contact from "./components/site/Contact";
import Booking from "./components/site/Booking";

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
