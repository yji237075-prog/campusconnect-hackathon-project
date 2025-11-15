"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { ClubsSection } from "@/components/ClubsSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Bell, 
  Search, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Award,
  Info
} from "lucide-react";

const navigationCards = [
  {
    title: "Notices",
    description: "View campus announcements and updates",
    icon: Bell,
    href: "/notices",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Lost & Found",
    description: "Report or search for lost items",
    icon: Search,
    href: "/lost-found",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Clubs & Events",
    description: "Join clubs and attend campus events",
    icon: Users,
    href: "/clubs-events",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Internships",
    description: "Explore internship opportunities",
    icon: Briefcase,
    href: "/internships",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Complaints",
    description: "Submit feedback and complaints",
    icon: MessageSquare,
    href: "/complaints",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Certifications",
    description: "Browse certification courses",
    icon: Award,
    href: "/certifications",
    color: "from-indigo-500 to-indigo-600"
  }
];

export default function HomePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-pink-500 drop-shadow-[0_0_8px_#ff4d94] font-extrabold text-3xl md:text-5xl mb-4">
              CampusConnect
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your Campus, Connected.
            </p>
          </motion.div>

          {/* Clubs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ClubsSection />
          </motion.div>

          {/* ChatBot Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <ChatBot />
          </motion.div>

          {/* Navigation Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Link href={card.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-pink-500 hover:scale-105">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-2`}>
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}