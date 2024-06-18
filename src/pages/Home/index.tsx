import { Header, Footer } from "../../layouts";
// import Dropdown from "../../layouts/Header/ui/dropdown";
import {
  CTA,
  Category,
  FAQs,
  HeroSection,
  Partner,
  Story,
} from "./ui";
// const options = ['Option 1', 'Option 2', 'Option 3'];
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div data-aos="zoom-in-left" data-aos-duration="1000">
        <Header />
        <HeroSection />
        <CTA />
        <Category />
        <Story />
        <Partner />
        <FAQs />
        <Footer />
      </div>
    </>
  );
}