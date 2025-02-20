import Categories from "../components/Categories";
import Contact from "../components/ContactUs";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import HeroSection from "../components/Herosection";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <HeroSection/>
      <Categories/>
      <Faq/>
      <Contact/>
      <Footer/>
    </div>
  )
}
