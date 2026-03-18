import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { VisitorCounter } from "@/components/VisitorCounter";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { WalkingChicken } from "@/components/WalkingChicken";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* Divider: Hero -> About - wave smooth dengan warna cream untuk transisi lembut */}
      <SectionDivider variant="wave-smooth" color="cream" height={80} />
      <About />
      <Skills />
      {/* Divider: Skills -> Projects - curve dengan flip untuk variasi visual */}
      <SectionDivider variant="curve" color="soft-light" flip height={70} />
      <Projects />
      <Experience />
      <Contact />
      <VisitorCounter />
      <WalkingChicken />
      <Footer />
    </>
  );
}
