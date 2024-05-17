import { Header, Footer } from "../../layouts";
import {
  CTA,
  Category,
  FAQs,
  HeroSection,
  Partner,
  Pricing,
  Story,
} from "./ui";

export function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CTA />
      <Category />
      <Story />
      <Partner />
      <Pricing />
      <FAQs />
      <Footer />
    </>
  );
}
