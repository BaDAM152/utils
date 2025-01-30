"use client"

import { Button } from "@/components/ui/button";
import { Upload, Flame, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FileUpload } from "@/components/FileUpload";
import { Login } from "@/components/Login";

export default function Home() {
  // const router = useRouter();
  const titleRef = useRef(null);
  const uploadBtnRef = useRef(null);
  const teamBtnRef = useRef(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    gsap.set("#theGradient", { attr: { x1: -1000, x2: 0 } });
    gsap.to("#theGradient", {
      duration: 3,
      attr: { x1: 1000, x2: 2000 },
      repeat: 0,
      yoyo: true,
      repeatDelay: 0.5,
      ease: "none"
    });

    gsap.fromTo(uploadBtnRef.current, 
      { x: "-100%", opacity: 0 }, 
      {
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        delay: 0.3
      }
    );

    gsap.fromTo(teamBtnRef.current, 
      { x: "100%", opacity: 0 }, 
      {
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power2.out",
        delay: 0.6
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center space-y-12">
        <div ref={titleRef} className="w-full max-w-6xl min-w-9xl">
          <svg viewBox="0 0 1000 200" className="w-full h-auto min-h-[100px] md:min-h-[150px]">
            <defs>
              <mask id="masker">
                <rect className="gradientBox" fill="url(#theGradient)" x="0" y="0" width="1000" height="200"/>
              </mask>
              <linearGradient id="theGradient" gradientUnits="userSpaceOnUse" x1="-1000" y1="100" x2="0" y2="100">
                <stop offset="0" style={{stopColor: "#fff"}}/>
                <stop offset="1" style={{stopColor: "#000"}}/>
              </linearGradient>
            </defs>
            <g mask="url(#masker)">
              <text transform="translate(500 140)" textAnchor="middle" fontSize="130" fill="#fff">HUKUM!</text>
            </g>
          </svg>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center">
          <Button 
            ref={uploadBtnRef}
            size="lg" 
            className="flex items-center gap-3 px-6 py-3 transition-all duration-2000 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:via-blue-500 hover:to-cyan-400 text-white"
            onClick={() => setIsUploadOpen(true)}
          >
            <Upload className="w-5 h-5" />
            <span className="font-medium">Upload Images</span>
          </Button>
          <FileUpload isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
          <Button 
            ref={teamBtnRef}
            variant="secondary"
            size="lg"
            className="flex items-center gap-3 px-6 py-3 transition-all duration-2000 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 text-white"
            onClick={() => setIsLoginOpen(true)}
          >
            <LogIn className="w-5 h-5" />
            <span className="font-medium">Login / Sign Up</span>
          </Button>
          <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
      </main>
    </div>
  );
}
