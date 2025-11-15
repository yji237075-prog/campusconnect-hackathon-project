"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Building2, MapPin, Clock } from "lucide-react";

const internships = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Google",
    location: "Remote",
    duration: "3 months",
    type: "Full-time",
    skills: ["React", "Node.js", "TypeScript"],
    url: "https://www.indeed.com/q-software-engineering-intern-jobs.html"
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Microsoft",
    location: "Hybrid",
    duration: "6 months",
    type: "Full-time",
    skills: ["Python", "Machine Learning", "SQL"],
    url: "https://www.indeed.com/q-data-science-intern-jobs.html"
  },
  {
    id: 3,
    title: "Product Management Intern",
    company: "Amazon",
    location: "On-site",
    duration: "4 months",
    type: "Full-time",
    skills: ["Product Strategy", "Analytics", "Communication"],
    url: "https://www.indeed.com/q-product-management-intern-jobs.html"
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "Adobe",
    location: "Remote",
    duration: "3 months",
    type: "Part-time",
    skills: ["Figma", "User Research", "Prototyping"],
    url: "https://www.indeed.com/q-ui-ux-design-intern-jobs.html"
  },
  {
    id: 5,
    title: "Cybersecurity Intern",
    company: "Cisco",
    location: "On-site",
    duration: "6 months",
    type: "Full-time",
    skills: ["Network Security", "Ethical Hacking", "Risk Assessment"],
    url: "https://www.indeed.com/q-cybersecurity-intern-jobs.html"
  },
  {
    id: 6,
    title: "Machine Learning Intern",
    company: "Tesla",
    location: "Hybrid",
    duration: "5 months",
    type: "Full-time",
    skills: ["TensorFlow", "Deep Learning", "Computer Vision"],
    url: "https://www.indeed.com/q-machine-learning-intern-jobs.html"
  }
];

export default function InternshipsPage() {
  const [showRecommender, setShowRecommender] = useState(false);
  const [formData, setFormData] = useState({
    skills: "",
    interest: "",
    location: ""
  });
  const [recommendations, setRecommendations] = useState<typeof internships>([]);

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple AI-like recommendation based on keywords
    const filtered = internships.filter(intern => {
      const skillMatch = formData.skills.toLowerCase();
      const interestMatch = formData.interest.toLowerCase();
      
      return (
        intern.skills.some(skill => skill.toLowerCase().includes(skillMatch)) ||
        intern.title.toLowerCase().includes(interestMatch) ||
        intern.location.toLowerCase().includes(formData.location.toLowerCase())
      );
    });
    
    setRecommendations(filtered.length > 0 ? filtered : internships.slice(0, 3));
    setShowRecommender(false);
  };

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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Internship Opportunities
                </h1>
                <p className="text-muted-foreground">
                  Explore internships and get AI-powered recommendations
                </p>
              </div>
              <Button
                onClick={() => setShowRecommender(!showRecommender)}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                AI Recommender
              </Button>
            </div>

            {showRecommender && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                      AI-Powered Recommendation Engine
                    </CardTitle>
                    <CardDescription>
                      Tell us about your skills and interests to get personalized internship recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRecommend} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="skills">Primary Skills</Label>
                          <Input
                            id="skills"
                            placeholder="e.g., React, Python"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interest">Area of Interest</Label>
                          <Input
                            id="interest"
                            placeholder="e.g., Software, Data Science"
                            value={formData.interest}
                            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Preferred Location</Label>
                          <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="onsite">On-site</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Get Recommendations
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h2 className="text-2xl font-bold">Recommended For You</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {recommendations.map((intern, index) => (
                  <InternshipCard key={`rec-${intern.id}`} intern={intern} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          <h2 className="text-2xl font-bold mb-4">All Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((intern, index) => (
              <InternshipCard key={intern.id} intern={intern} index={index} />
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function InternshipCard({ intern, index }: { intern: typeof internships[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <Badge>{intern.type}</Badge>
          </div>
          <CardTitle className="text-xl">{intern.title}</CardTitle>
          <CardDescription className="text-lg font-semibold text-foreground">
            {intern.company}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {intern.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              {intern.duration}
            </div>
            <div className="flex flex-wrap gap-2">
              {intern.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => window.open(intern.url, '_blank')}
          >
            Apply on Indeed
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
