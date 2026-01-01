// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import WhyChoose from "../components/WhyChoose";
// import FounderSection from "../components/FounderSection";
// import CoursesSection from "../components/CoursesSection";
// import SuccessStoriesSection from "../components/SuccessStoriesSection";
// import SuccessForm from "../components/SuccessForm";
// import ContactSection from "../components/ContactSection";
// import Footer from "../components/Footer";
// import Banners from "../components/Banners";

// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <main className="bg-slate-950 text-slate-50">
//         <Hero />
//         <Banners />
//         <WhyChoose />
//         <FounderSection />
//         <CoursesSection />
//         <SuccessStoriesSection />
//         <SuccessForm />
//         <ContactSection />
//       </main>
//       <Footer />
//     </>
//   );
// }

import { Suspense, lazy } from "react";
import LazyLoadOnScroll from "../components/LazyLoadOnScroll";

const Navbar = lazy(() => import("../components/Navbar"));
const Hero = lazy(() => import("../components/Hero"));
const Banners = lazy(() => import("../components/Banners"));
const WhyChoose = lazy(() => import("../components/WhyChoose"));
const FounderSection = lazy(() => import("../components/FounderSection"));
const CoursesSection = lazy(() => import("../components/CoursesSection"));
const SuccessStoriesSection = lazy(() =>
  import("../components/SuccessStoriesSection")
);
const SuccessForm = lazy(() => import("../components/SuccessForm"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const Footer = lazy(() => import("../components/Footer"));

export default function Home() {
  return (
    <LazyLoadOnScroll>
      <Suspense
        fallback={<p className="text-center text-white py-10">Loading...</p>}
      >
        <Navbar />
        <main className="bg-slate-950 text-slate-50">
          <Hero />
          <Banners />
          <WhyChoose />
          <FounderSection />
          <CoursesSection />
          <SuccessStoriesSection />
          <SuccessForm />
          <ContactSection />
        </main>
        <Footer />
      </Suspense>
    </LazyLoadOnScroll>
  );
}
