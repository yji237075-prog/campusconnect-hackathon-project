"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const navLinks = user ? [
    { href: "/home", label: "Home" },
    { href: "/notices", label: "Notices" },
    { href: "/lost-found", label: "Lost & Found" },
    { href: "/clubs-events", label: "Clubs & Events" },
    { href: "/internships", label: "Internships" },
    { href: "/complaints", label: "Complaints" },
    { href: "/certifications", label: "Certifications" },
    { href: "/about", label: "About" },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={user ? "/home" : "/login"} className="flex items-center space-x-3">
            <Image
              src="https://quantumuniversity.edu.in/images/og_logo.png"
              alt="Quantum University"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-pink-500 drop-shadow-[0_0_8px_#ff4d94] font-extrabold text-3xl">
              CampusConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button variant="ghost" size="sm">
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {user && (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {user.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="rounded-full"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/40 py-4"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <span className="text-sm text-muted-foreground px-4">
                    {user.name}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}