// import React from "react";
import "./loader.css";

// export default function Loader() {
//   return (
//     <>
//       <div class="liquid-loader">
//         <div class="loading-text">
//           Future40<span class="dot">.</span>
//           <span class="dot">.</span>
//           {/* <span class="dot">.</span> */}
//         </div>

//         <div class="loader-track">
//           <div class="liquid-fill"></div>
//         </div>
//       </div>

//       <div class="loader"></div>
//     </>
//   );
// }

export default function Loader() {
  return (
    <div className="liquid-loader">
      <div className="loading-text">
        FUTURE40
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>

      <div className="loader-track">
        <div className="liquid-fill"></div>
      </div>
    </div>
  );
}
