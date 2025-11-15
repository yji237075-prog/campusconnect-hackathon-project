"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, AlertCircle, Info, CheckCircle } from "lucide-react";

const notices = [
  {
    id: 1,
    title: "Mid-Semester Examination Schedule Released",
    description: "The mid-semester examination schedule for all departments has been published. Please check your respective department portals.",
    date: "2024-01-15",
    category: "Academic",
    priority: "high",
    icon: AlertCircle
  },
  {
    id: 2,
    title: "Annual Tech Fest 2024 - Registration Open",
    description: "Register now for Quantum University's Annual Tech Fest. Multiple competitions, workshops, and guest speakers from industry leaders.",
    date: "2024-01-12",
    category: "Events",
    priority: "medium",
    icon: Info
  },
  {
    id: 3,
    title: "Library Hours Extended During Exam Week",
    description: "The central library will remain open 24/7 during the examination week (Jan 20-27). Students can access all facilities.",
    date: "2024-01-10",
    category: "Facilities",
    priority: "medium",
    icon: CheckCircle
  },
  {
    id: 4,
    title: "New Cafeteria Menu Launch",
    description: "We're excited to announce a new menu with healthier options and diverse cuisines. Check out the updated menu at the main cafeteria.",
    date: "2024-01-08",
    category: "Facilities",
    priority: "low",
    icon: Info
  },
  {
    id: 5,
    title: "Campus Recruitment Drive - Tech Companies",
    description: "Leading tech companies will be visiting campus for placements next week. Eligible students should register through the placement portal.",
    date: "2024-01-05",
    category: "Placement",
    priority: "high",
    icon: AlertCircle
  },
  {
    id: 6,
    title: "Guest Lecture on AI and Machine Learning",
    description: "Dr. Sarah Johnson from MIT will deliver a guest lecture on 'Future of AI' on January 22nd at the Main Auditorium.",
    date: "2024-01-03",
    category: "Academic",
    priority: "medium",
    icon: Info
  }
];

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-orange-500",
  low: "bg-green-500"
};

export default function NoticesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Campus Notices
            </h1>
            <p className="text-muted-foreground">
              Stay updated with latest announcements and campus information
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {notices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500`}>
                          <notice.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle>{notice.title}</CardTitle>
                            <div className={`w-2 h-2 rounded-full ${priorityColors[notice.priority as keyof typeof priorityColors]}`} />
                          </div>
                          <CardDescription>{notice.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">{notice.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(notice.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <Badge 
                        variant={notice.priority === 'high' ? 'destructive' : 'outline'}
                        className="capitalize"
                      >
                        {notice.priority} Priority
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
