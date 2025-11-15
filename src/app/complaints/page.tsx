"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, Sparkles, CheckCircle } from "lucide-react";

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: "",
    qid: "",
    category: "",
    complaint: "",
    suggestions: ""
  });
  const [aiCategory, setAiCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const classifyComplaint = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Infrastructure keywords
    if (lowerText.includes("washroom") || lowerText.includes("leakage") || 
        lowerText.includes("fan") || lowerText.includes("electricity") || 
        lowerText.includes("plumbing")) {
      return "Infrastructure";
    }
    
    // Academic keywords
    if (lowerText.includes("exam") || lowerText.includes("teacher") || 
        lowerText.includes("marks") || lowerText.includes("syllabus") || 
        lowerText.includes("subject")) {
      return "Academic";
    }
    
    // Hostel keywords
    if (lowerText.includes("hostel") || lowerText.includes("mess") || 
        lowerText.includes("room") || lowerText.includes("warden")) {
      return "Hostel";
    }
    
    return "Other";
  };

  const handleComplaintChange = (value: string) => {
    setFormData({ ...formData, complaint: value });
    if (value.trim()) {
      const predicted = classifyComplaint(value);
      setAiCategory(predicted);
    } else {
      setAiCategory("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.suggestions.trim()) {
      alert("Suggestions field is MANDATORY! Please provide your suggestions.");
      return;
    }

    const finalCategory = classifyComplaint(formData.complaint);
    setAiCategory(finalCategory);
    setSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        qid: "",
        category: "",
        complaint: "",
        suggestions: ""
      });
      setSubmitted(false);
      setAiCategory("");
    }, 5000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 text-pink-500 drop-shadow-[0_0_8px_#ff4d94]">
              Submit Complaint
            </h1>
            <p className="text-gray-300">
              Share your feedback and help us improve campus facilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-2 border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-pink-500" />
                      AI Complaint Sorter
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Our AI will automatically categorize your complaint for faster resolution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">Complaint Submitted Successfully!</h3>
                        <p className="text-gray-300 mb-4">
                          AI has categorized your complaint as: <strong className="text-pink-500">{aiCategory}</strong>
                        </p>
                        <p className="text-sm text-gray-400">
                          We'll review and respond within 48 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="qid">QID</Label>
                          <Input
                            id="qid"
                            placeholder="Your QID (e.g., 25030170)"
                            value={formData.qid}
                            onChange={(e) => setFormData({ ...formData, qid: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="academic">Academic</SelectItem>
                              <SelectItem value="hostel">Hostel</SelectItem>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="complaint">Complaint Description</Label>
                          <Textarea
                            id="complaint"
                            placeholder="Describe your complaint in detail... (AI will analyze keywords like: washroom, exam, hostel, etc.)"
                            value={formData.complaint}
                            onChange={(e) => handleComplaintChange(e.target.value)}
                            rows={6}
                            required
                          />
                          {aiCategory && (
                            <div className="flex items-center gap-2 text-sm mt-2 p-2 bg-pink-500/10 border border-pink-500/20 rounded">
                              <Sparkles className="h-4 w-4 text-pink-500" />
                              <span className="text-gray-300">
                                AI Predicted Category: <strong className="text-pink-500">{aiCategory}</strong>
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="suggestions" className="flex items-center gap-2">
                            Suggestions <span className="text-red-500 font-bold">(MANDATORY)</span>
                          </Label>
                          <Textarea
                            id="suggestions"
                            placeholder="What solutions or improvements would you suggest? This field is MANDATORY."
                            value={formData.suggestions}
                            onChange={(e) => setFormData({ ...formData, suggestions: e.target.value })}
                            rows={4}
                            required
                            className="border-pink-500/30"
                          />
                          <p className="text-xs text-red-400">
                            ⚠️ This field is mandatory - Your suggestions help us improve
                          </p>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                          <Send className="mr-2 h-4 w-4" />
                          Submit Complaint
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="border-2 border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-pink-500">AI Classification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-white mb-1">Infrastructure:</p>
                      <p className="text-gray-400">washroom, leakage, fan, electricity, plumbing</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Academic:</p>
                      <p className="text-gray-400">exam, teacher, marks, syllabus, subject</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Hostel:</p>
                      <p className="text-gray-400">hostel, mess, room, warden</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">Other:</p>
                      <p className="text-gray-400">Everything else</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-pink-500">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-white">Describe Issue</h4>
                        <p className="text-sm text-gray-400">
                          Provide detailed information about your complaint
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-white">AI Categorization</h4>
                        <p className="text-sm text-gray-400">
                          Our AI automatically sorts based on keywords
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-white">Quick Resolution</h4>
                        <p className="text-sm text-gray-400">
                          Relevant department will address your concern
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}