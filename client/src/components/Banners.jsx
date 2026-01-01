// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import Reveal from "./Reveal"; // ← Added

// export default function Banners() {
//   const banners = [
//     {
//       title: "Flexible Learning Options",
//       text: "Choose from 1:1 classes, small group batches, weekend or weekday options as per your schedule.",
//       gradient: "from-violet-500 to-cyan-500",
//     },
//     {
//       title: "Proven Success Rate",
//       text: "Join thousands of students who have achieved fluency and career growth through Future40.",
//       gradient: "from-indigo-500 to-blue-500",
//     },
//     {
//       title: "Speak English With Confidence",
//       text: "Interactive live sessions + real practice activities for practical speaking improvement.",
//       gradient: "from-orange-400 to-yellow-500",
//     },
//   ];

//   return (
//     <section className="bg-slate-950 pt-4 pb-12">
//       <div className="mx-auto w-full max-w-6xl px-4 sm:px-4 lg:px-4">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 5000 }}
//           loop={true}
//           className="rounded-md"
//         >
//           {banners.map((item, index) => (
//             <SwiperSlide key={index}>
//               <Reveal>
//                 {" "}
//                 <div
//                   className={`text-center text-white border border-slate-500 py-16 px-6 md:py-16 rounded-lg bg-gradient-to-r ${item.gradient}`}
//                 >
//                   <h2 className="text-3xl md:text-4xl font-bold mb-3">
//                     {item.title}
//                   </h2>

//                   <p className="max-w-xl mx-auto opacity-90 text-sm md:text-base">
//                     {item.text}
//                   </p>
//                 </div>
//               </Reveal>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Reveal from "./Reveal";

export default function Banners() {
  const banners = [
    {
      title: "Flexible Learning Options",
      text: "Choose from 1:1 classes, small group batches, weekend or weekday options as per your schedule.",
      gradient: "from-violet-500 to-cyan-500",
    },
    {
      title: "Proven Success Rate",
      text: "Join thousands of students who have achieved fluency and career growth through Future40.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      title: "Speak English With Confidence",
      text: "Interactive live sessions + real practice activities for practical speaking improvement.",
      gradient: "from-orange-400 to-yellow-500",
    },
  ];

  return (
    <section className="bg-slate-950 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          className="rounded-lg"
        >
          {banners.map((item, index) => (
            <SwiperSlide key={index}>
              <Reveal>
                {/* Swiper-safe wrapper */}
                <div className="p-1">
                  <div
                    className={`relative rounded-xl
bg-gradient-to-r ${item.gradient}
px-6 py-14 md:py-16
text-center text-white
border border-white/10`}
                  >
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
                      {item.title}
                    </h2>

                    <p className="max-w-xl mx-auto text-sm md:text-base opacity-90 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
