import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", icon: Github, href: "https://github.com/Muneeb502" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/muneeb-ur-rehman-99580b277/" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div>
            <Link href="#home" className="text-lg font-bold text-primary mb-2 block">
              NeuroSecNet
            </Link>
            <p className="text-sm text-muted-foreground">
              Innovating at the intersection of AI, Cybersecurity, and Networking.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-md font-semibold mb-3">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button key={item.label} variant="link" asChild className="p-0 h-auto justify-start text-muted-foreground hover:text-primary">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
          </div>

          {/* Social Links and Contact */}
          <div>
            <h3 className="text-md font-semibold mb-3">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              {socialLinks.map((link) => (
                <Button key={link.label} variant="ghost" size="icon" asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    <link.icon className="h-5 w-5 text-muted-foreground hover:text-primary" />
                  </a>
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Email: <a href="mailto:mu0476080@gmail.com" className="hover:text-primary hover:underline">mu0476080@gmail.com</a>
            </p>
             <p className="text-sm text-muted-foreground">
              Phone: +92 (306) 161-9009
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} NeuroSecNet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
