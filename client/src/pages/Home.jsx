// import { Suspense, lazy } from "react";
// import LazyLoadOnScroll from "../components/LazyLoadOnScroll";
// import Loader from "../admin/components/loader/Loader";

// const Navbar = lazy(() => import("../components/Navbar"));
// const Hero = lazy(() => import("../components/Hero"));
// const Banners = lazy(() => import("../components/Banners"));
// const WhyChoose = lazy(() => import("../components/WhyChoose"));
// const FounderSection = lazy(() => import("../components/FounderSection"));
// const CoursesSection = lazy(() => import("../components/CoursesSection"));
// const SuccessStoriesSection = lazy(() =>
//   import("../components/SuccessStoriesSection")
// );
// const SuccessForm = lazy(() => import("../components/SuccessForm"));
// const ContactSection = lazy(() => import("../components/ContactSection"));
// const Footer = lazy(() => import("../components/Footer"));

// export default function Home() {
//   return (
//     <LazyLoadOnScroll>
//       <Suspense
//         // fallback={<p className="text-center text-white py-10">Loading...</p>}
//         fallback={
//           <div className="flex justify-center text-white py-10">
//             <Loader />
//           </div>
//         }
//       >
//         <Navbar />
//         <main className="bg-slate-950 text-slate-50">
//           <Hero />
//           <Banners />
//           <WhyChoose />
//           <FounderSection />
//           <CoursesSection />
//           <SuccessStoriesSection />
//           <SuccessForm />
//           <ContactSection />
//         </main>
//         <Footer />
//       </Suspense>
//     </LazyLoadOnScroll>
//   );
// }

import { Suspense, lazy } from "react";
import LazyLoadOnScroll from "../components/LazyLoadOnScroll";
import Loader from "../admin/components/loader/Loader";

const Hero = lazy(() => import("../components/Hero"));
const Banners = lazy(() => import("../components/Banners"));
const WhyChoose = lazy(() => import("../components/WhyChoose"));
const FounderSection = lazy(() => import("../components/FounderSection"));
const CoursesSection = lazy(() => import("../components/CoursesSection"));
const SuccessStoriesSection = lazy(
  () => import("../components/SuccessStoriesSection"),
);
const SuccessForm = lazy(() => import("../components/SuccessForm"));
const ContactSection = lazy(() => import("../components/ContactSection"));

export default function Home() {
  return (
    <LazyLoadOnScroll>
      <Suspense
        fallback={
          <div className="flex justify-center text-white py-10">
            <Loader />
          </div>
        }
      >
        <Hero />
        <Banners />
        <WhyChoose />
        <FounderSection />
        <CoursesSection />
        <SuccessStoriesSection />
        <SuccessForm />
        <ContactSection />
      </Suspense>
    </LazyLoadOnScroll>
  );
}
