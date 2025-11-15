"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Music, Code, Palette, Trophy, Heart, Mic } from "lucide-react";

const clubs = [
  {
    id: 1,
    name: "Coding Club",
    description: "Learn programming, participate in hackathons, and build projects together",
    members: 450,
    category: "Technical",
    icon: Code,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    name: "Music Society",
    description: "Express yourself through music, performances, and jam sessions",
    members: 280,
    category: "Cultural",
    icon: Music,
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 3,
    name: "Art & Design Club",
    description: "Explore creativity through painting, digital art, and design projects",
    members: 210,
    category: "Cultural",
    icon: Palette,
    color: "from-pink-500 to-pink-600"
  },
  {
    id: 4,
    name: "Sports Committee",
    description: "Organize sports events, tournaments, and fitness activities",
    members: 520,
    category: "Sports",
    icon: Trophy,
    color: "from-green-500 to-green-600"
  },
  {
    id: 5,
    name: "Social Service Club",
    description: "Make a difference through community service and social initiatives",
    members: 195,
    category: "Social",
    icon: Heart,
    color: "from-red-500 to-red-600"
  },
  {
    id: 6,
    name: "Debate Society",
    description: "Improve public speaking and debating skills through competitions",
    members: 165,
    category: "Cultural",
    icon: Mic,
    color: "from-orange-500 to-orange-600"
  }
];

const events = [
  {
    id: 1,
    title: "TechFest 2024",
    description: "Annual technology festival with hackathons, workshops, and tech talks",
    date: "2024-02-15",
    time: "9:00 AM",
    location: "Main Auditorium",
    category: "Technical",
    attendees: 500
  },
  {
    id: 2,
    title: "Cultural Night",
    description: "Showcase your talent in music, dance, and drama performances",
    date: "2024-02-20",
    time: "6:00 PM",
    location: "Open Air Theatre",
    category: "Cultural",
    attendees: 800
  },
  {
    id: 3,
    title: "Startup Summit",
    description: "Meet entrepreneurs, investors, and learn about startup ecosystem",
    date: "2024-02-25",
    time: "10:00 AM",
    location: "Convention Center",
    category: "Business",
    attendees: 300
  },
  {
    id: 4,
    title: "Sports Week",
    description: "Inter-department sports competitions and tournaments",
    date: "2024-03-01",
    time: "8:00 AM",
    location: "Sports Complex",
    category: "Sports",
    attendees: 1000
  },
  {
    id: 5,
    title: "Art Exhibition",
    description: "Display of student artwork, photography, and digital designs",
    date: "2024-03-05",
    time: "11:00 AM",
    location: "Art Gallery",
    category: "Cultural",
    attendees: 250
  },
  {
    id: 6,
    title: "Blood Donation Camp",
    description: "Contribute to society by donating blood and saving lives",
    date: "2024-03-10",
    time: "9:00 AM",
    location: "Medical Center",
    category: "Social",
    attendees: 200
  }
];

export default function ClubsEventsPage() {
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
              Clubs & Events
            </h1>
            <p className="text-muted-foreground">
              Join clubs and participate in exciting campus events
            </p>
          </motion.div>

          <Tabs defaultValue="clubs" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="clubs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club, index) => (
                  <motion.div
                    key={club.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${club.color}`}>
                            <club.icon className="h-6 w-6 text-white" />
                          </div>
                          <Badge>{club.category}</Badge>
                        </div>
                        <CardTitle>{club.name}</CardTitle>
                        <CardDescription>{club.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <Users className="mr-2 h-4 w-4" />
                          {club.members} members
                        </div>
                        <Button className="w-full">Join Club</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                          <Badge>{event.category}</Badge>
                        </div>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })} at {event.time}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-2 h-4 w-4" />
                            {event.attendees} attendees expected
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button className="flex-1">Register</Button>
                          <Button variant="outline" className="flex-1">Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
}
