
"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cpu, HardDrive, ShieldCheck, Users, Send, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import ScrollAnimationWrapper from "@/components/scroll-animation-wrapper";

// Dynamically import the ParticlesBackground component to ensure it only loads on the client
const ParticlesBackground = dynamic(() => import('@/components/particles-background'), { ssr: false });
const ContactForm = dynamic(() => import('@/components/contact-form'), { ssr: false });

const services = [
  { id: 'webdev', title: "Web Development", description: "Building modern, scalable web applications.", icon: Code },
  { id: 'cyber', title: "Cybersecurity", description: "Protecting your digital assets from threats.", icon: ShieldCheck },
  { id: 'ai', title: "AI Solutions", description: "Leveraging AI for business growth and innovation.", icon: Cpu },
  { id: 'networking', title: "Networking", description: "Designing robust and efficient network infrastructures.", icon: HardDrive },
];

const projects = [
  { title: "Project Alpha", description: "Developed an AI-powered threat detection system.", tech: ["Python", "TensorFlow", "React"] },
  { title: "Project Beta", description: "Created a secure e-commerce platform with advanced analytics.", tech: ["Node.js", "Next.js", "PostgreSQL"] },
  { title: "Project Gamma", description: "Designed a scalable cloud network for a large enterprise.", tech: ["AWS", "Terraform", "Kubernetes"] },
];

// Updated team members with corrected image paths (relative to /public)
// Fallback will show initials if image path is empty or invalid.
const teamMembers = [
  { name: "Matiullah Khan", role: "CEO & Founder", image: "/images/matiullah.jpg" }, // Example path
  { name: "Muhammad Afzaal", role: "Senior Network Engineer", image: "" }, // Will use fallback
  { name: "Muneeb ur Rehman", role: "Senior Data Scientist", image: "/images/muneeb.jpg" }, // Corrected path
  { name: "Salman Aijaz", role: "MERN Stack Developer", image: "/images/salman.jpg" }, // Example path
];

export default function Home() {
  const { toast } = useToast();

  // Function to safely generate initials
  const getInitials = (name: string): string => {
    if (!name) return "";
    return name
      .split(' ')
      .map(n => n[0])
      .filter(Boolean) // Ensure we don't get undefined if name is empty or has extra spaces
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-background via-background/90 to-background/80">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <ParticlesBackground />
        </Suspense>
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-400 to-red-600 animate-pulse">
            NeuroSecNet
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
            Where Intelligence Meets Security.
          </p>
          <Button size="lg" className="mt-8 group" onClick={() => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
              servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Explore Our Services <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto px-4">
         <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="text-center hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-secondary/50">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm border-border/60">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-wrap gap-2 pt-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="team" className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center transition-transform duration-300 hover:scale-105">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary shadow-md transition-shadow hover:shadow-lg">
                  {/* AvatarImage will attempt to load the src. If it fails or src is empty, AvatarFallback will be displayed. */}
                  <AvatarImage src={member.image} alt={member.name} />
                  {/* AvatarFallback displays initials if the image doesn't load */}
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </ScrollAnimationWrapper>
      </section>

      {/* Careers Section */}
      <section id="careers" className="bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
         <ScrollAnimationWrapper>
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals passionate about technology and innovation. Explore opportunities to grow with NeuroSecNet.
            </p>
            {/* Optional: List job openings here or provide a contact/resume submission */}
            <Button size="lg" variant="outline" className="group">
              View Open Positions <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Don't see a fitting role? Send us your resume at <a href="mailto:careers@neurosecnet.example" className="text-primary hover:underline">careers@neurosecnet.example</a>.
            </p>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
             <Suspense fallback={<div className="text-center">Loading contact form...</div>}>
                <ContactForm />
             </Suspense>
          </div>
        </ScrollAnimationWrapper>
      </section>

    </div>
  );
}
