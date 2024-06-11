import { Header, Footer } from "../../layouts";
import Dropdown from "../../layouts/Header/ui/dropdown";
import {
  CTA,
  Category,
  FAQs,
  HeroSection,
  Partner,
  Pricing,
  Story,
} from "./ui";
const options = ['Option 1', 'Option 2', 'Option 3'];
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