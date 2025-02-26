// // import { Badge, Button } from "@material-tailwind/react"


// // function App() {

// //   return (
// //     <>
     
      
// //     </>
// //   )
// // }

// // export default App


// import React, { useState } from "react";
// import {
//   Navbar,
//   Typography,
//   Button,
//   IconButton,
//   Collapse,
// } from "@material-tailwind/react";

// function AppNavbar() {
//   const [openNav, setOpenNav] = useState(false);

//   const handleNavToggle = () => setOpenNav(!openNav);

//   return (
//     <Navbar className="py-2 px-4 lg:px-8 lg:py-4">

//       <div className="flex items-center justify-between text-blue-gray-900">
//         {/* ব্র্যান্ড লোগো */}
//         <Typography
//           as="a"
//           href="#"
//           variant="h6"
//           className="mr-4 cursor-pointer py-1.5 font-bold"
//         >
//           আমার ওয়েবসাইট
//         </Typography>

//         {/* বড় স্ক্রিনের জন্য মেনু */}
//         <div className="hidden lg:flex items-center space-x-4">
//           <Typography as="a" href="#" className="cursor-pointer">
//             হোম
//           </Typography>
//           <Typography as="a" href="#" className="cursor-pointer">
//             সম্পর্কে
//           </Typography>
//           <Typography as="a" href="#" className="cursor-pointer">
//             যোগাযোগ
//           </Typography>
//         </div>

//         {/* অ্যাকশন বোতাম */}
//         <div className="hidden gap-4 lg:flex">
//           <Button variant="gradient" size="sm">
//             লগইন
//           </Button>
//           <Button variant="gradient" size="sm">
//             লগইন
//           </Button>
//         </div>

//         {/* ছোট স্ক্রিনের জন্য Hamburger Icon */}
//         <IconButton
//           variant="text"
//           className="lg:hidden"
//           onClick={handleNavToggle}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="h-6 w-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>
//         </IconButton>
//       </div>

//       {/* ছোট স্ক্রিনের জন্য ড্রপডাউন মেনু */}
//       <Collapse open={openNav}>
//         <div className="flex flex-col items-start gap-2 mt-4">
//           <Typography as="a" href="#" className="cursor-pointer">
//             হোম
//           </Typography>
//           <Typography as="a" href="#" className="cursor-pointer">
//             সম্পর্কে
//           </Typography>
//           <Typography as="a" href="#" className="cursor-pointer">
//             যোগাযোগ
//           </Typography>
//           <Button variant="gradient" size="sm" fullWidth>
//             লগইন
//           </Button>
//           <Button variant="gradient" size="sm" fullWidth>
//             লগইন
//           </Button>
//         </div>
//       </Collapse>
//     </Navbar>
//   );
// }

// export default AppNavbar;

 
