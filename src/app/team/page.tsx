"use client"

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const teamMembers = [
  {
    name: "Dhruv Koli",
    role: "",
    image: "/Dhruv.png",
    description: "",
    social: {
      linkedin: "https://www.linkedin.com/in/dhruvkoli",
      github: "https://github.com/dask-58",
      twitter: "https://twitter.com/dask_58",
    }
  },
  {
    name: "Amritanshu Aditya",
    role: "",
    image: "/Amar.jpeg",
    description: "",
    social: {
      linkedin: "",
      github: "",
      twitter: "",
    }
  },
  {
    name: "Barghav Abhilash",
    role: "",
    image: "/Barghav.jpeg",
    description: "",
    social: {
      linkedin: "https://www.linkedin.com/in/barghav-abhilash-b-r-2ab2ba29a/",
      github: "https://github.com/Meow-Codes",
      instagram: "https://www.instagram.com/abhilash_2557/",
    }
  },
  {
    name: "K V Modak",
    role: "",
    image: "/Modak.jpeg",
    description: "",
    social: {
      linkedin: "https://www.linkedin.com/in/kv-modak-45aaa12aa/",
      github: "https://github.com/mod756", 
      instagram: "https://www.instagram.com/modak_756/",
    }
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function TeamPage() {
  useEffect(() => {
    const cardElements = document.querySelectorAll('.team-card');
    const imageElements = document.querySelectorAll('.team-image');
    
    cardElements.forEach((card: Element) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    imageElements.forEach((image: Element) => {
      gsap.fromTo(
        image,
        {
          opacity: 0,
          scale: 0.8,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-white mb-10">Meet Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gray-800 border-gray-700 team-card">
            <div className="relative w-full h-48 rounded-t-2xl overflow-hidden team-image">
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-t-2xl"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-center mt-4 text-xl font-semibold text-white">
                {member.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-300 font-medium mb-2">{member.role}</p>
              <p className="text-gray-400 text-sm text-center mb-4">{member.description}</p>
              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
