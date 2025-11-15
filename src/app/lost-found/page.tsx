"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus, Calendar, MapPin, Phone, Mail } from "lucide-react";

const lostItems = [
  {
    id: 1,
    name: "Blue Water Bottle",
    description: "Blue stainless steel water bottle",
    location: "Library - 2nd Floor",
    date: "2024-01-14",
    contact: "Campus Reception",
    phone: "+91-XXX-XXX-XXXX",
    email: "reception@quantumuniversity.edu",
    status: "Found"
  },
  {
    id: 2,
    name: "Scientific Calculator",
    description: "Casio scientific calculator in black case",
    location: "Engineering Block - Room 301",
    date: "2024-01-13",
    contact: "Campus Reception",
    phone: "+91-XXX-XXX-XXXX",
    email: "reception@quantumuniversity.edu",
    status: "Found"
  },
  {
    id: 3,
    name: "Red Backpack",
    description: "Red backpack with laptop compartment",
    location: "Main Cafeteria",
    date: "2024-01-12",
    contact: "Campus Reception",
    phone: "+91-XXX-XXX-XXXX",
    email: "reception@quantumuniversity.edu",
    status: "Found"
  },
  {
    id: 4,
    name: "Black Umbrella",
    description: "Black automatic umbrella",
    location: "Sports Complex",
    date: "2024-01-11",
    contact: "Campus Reception",
    phone: "+91-XXX-XXX-XXXX",
    email: "reception@quantumuniversity.edu",
    status: "Found"
  },
  {
    id: 5,
    name: "Student ID Card",
    description: "Quantum University student ID card",
    location: "Admin Building Reception",
    date: "2024-01-10",
    contact: "Campus Reception",
    phone: "+91-XXX-XXX-XXXX",
    email: "reception@quantumuniversity.edu",
    status: "Found"
  }
];

export default function LostFoundPage() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(lostItems);
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterContact: "",
    itemName: "",
    location: "",
    date: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      id: items.length + 1,
      name: formData.itemName,
      description: formData.notes,
      location: formData.location,
      date: formData.date,
      contact: formData.reporterName,
      phone: formData.reporterContact,
      email: "reception@quantumuniversity.edu",
      status: "Found"
    };
    
    setItems([newItem, ...items]);
    setOpen(false);
    alert("Found item reported successfully! Thank you for helping the community.");
    
    setFormData({
      reporterName: "",
      reporterContact: "",
      itemName: "",
      location: "",
      date: "",
      notes: ""
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2 text-pink-500 drop-shadow-[0_0_8px_#ff4d94]">
                Lost & Found
              </h1>
              <p className="text-gray-300">
                Browse found items or report something you've found
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Report a Found Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Report Found Item</DialogTitle>
                  <DialogDescription>
                    Help us reunite lost items with their owners
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reporterName">Reporter Name</Label>
                    <Input
                      id="reporterName"
                      placeholder="Your name"
                      value={formData.reporterName}
                      onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reporterContact">Contact</Label>
                    <Input
                      id="reporterContact"
                      placeholder="Phone or email"
                      value={formData.reporterContact}
                      onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      placeholder="e.g., Blue Water Bottle"
                      value={formData.itemName}
                      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Where you found it"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Additional details about the item..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Report
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 hover:scale-105 border-2 hover:border-pink-500">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <Badge className="bg-green-600 hover:bg-green-700">
                        {item.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span>{item.date}</span>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <p className="font-semibold mb-2 text-foreground">Contact Information:</p>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">{item.contact}</p>
                          <div className="flex items-center text-muted-foreground">
                            <Phone className="mr-2 h-3 w-3" />
                            <span className="text-xs">{item.phone}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="mr-2 h-3 w-3" />
                            <span className="text-xs">{item.email}</span>
                          </div>
                        </div>
                      </div>
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