"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  content: string;
}

const botResponses: Record<string, string> = {
  "hello": "Hello! I'm CampusAI. How can I assist you today?",
  "hi": "Hi there! How can I help you with campus information?",
  "help": "I can help you with: \n• Lost & Found items\n• Campus notices\n• Club events\n• Internship opportunities\n• Certifications\n• File complaints",
  "lost": "You can report lost items in the Lost & Found section. Navigate to Lost & Found from the menu.",
  "found": "You can report found items in the Lost & Found section. We'll help connect items with their owners.",
  "clubs": "Check out the Clubs & Events page to see all active student organizations and upcoming events!",
  "internship": "Visit our Internships page to explore opportunities and get AI-powered recommendations!",
  "complaint": "You can file complaints through the Complaints section. Our AI will help categorize and route it appropriately.",
  "certification": "Browse available certification courses in the Certifications section.",
  "notice": "Check the Notices page for all campus announcements and updates.",
  "default": "I'm here to help! Ask me about lost items, clubs, internships, certifications, or notices."
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Welcome to CampusAI! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    // Simple keyword matching for bot response
    const lowerInput = input.toLowerCase();
    let response = botResponses.default;

    for (const [key, value] of Object.entries(botResponses)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      const botMessage: Message = { role: "bot", content: response };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-purple-600" />
          CampusAI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4 mb-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`flex-shrink-0 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                    {message.role === "user" ? (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
