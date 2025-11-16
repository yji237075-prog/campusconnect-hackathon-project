"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Award, Clock, BookOpen, Users, ExternalLink } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "Full Stack Web Development",
    provider: "crio",
    duration: "12 weeks",
    level: "Intermediate",
    enrolled: 245,
    description: "Master modern web development with React, Node.js, and MongoDB",
    skills: ["React", "Node.js", "MongoDB", "REST APIs"],
    color: "from-blue-500 to-blue-600",
    link: "https://www.crio.do/programs/software-development-fellowship-program/?utm_source=google-ads-search&utm_campaign=SD_Course&campaignid=23022218858&utm_medium=Search_SD_Phrase_Sep_25&utm_content=Ad1&utm_term=software%20development%20certification%20courses&utm_network=g&matchtype=p&gad_source=1&gad_campaignid=23022218858&gbraid=0AAAAAClbo8ska_4krrkfD99D8qwprE0CF&gclid=Cj0KCQiA5uDIBhDAARIsAOxj0CFwmHagGK7VmjaXtfxHklLu89dAw_nIAkzRvy7MgRYQCaDQVrJfNa8aAuxzEALw_wcB"
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    provider: "Scaler",
    duration: "16 weeks",
    level: "Advanced",
    enrolled: 189,
    description: "Learn data analysis, ML algorithms, and AI fundamentals",
    skills: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
    color: "from-green-500 to-green-600",
    link: "https://www.scaler.com/event/learn-data-science-machine-learning/?utm_source=ads&utm_medium=googlesearch&utm_campaign=perf_scaler-dsml_requestcallback_ads_googlesearch_dsa-new_key-metros_25-45&utm_content=dsa-data-science-new&utm_term=&param1=693360064288&param2=c&param3=&gad_source=1&gad_campaignid=21088132974&gbraid=0AAAAADQ037xCZi9M-LgE-Wd6-KEdewXOS&gclid=Cj0KCQiA5uDIBhDAARIsAOxj0CH0gkab-vMfF9AHc1eBQWdIOtmLIxZ0XFdS03rfcCm8BMCnrDl5VAcaAti6EALw_wcB"
  },
  {
    id: 3,
    title: "Cloud Computing with AWS",
    provider: "Intellipaat",
    duration: "8 weeks",
    level: "Intermediate",
    enrolled: 312,
    description: "Master cloud architecture and AWS services",
    skills: ["AWS", "EC2", "S3", "Lambda"],
    color: "from-orange-500 to-orange-600",
    link: "https://intellipaat.com/course-cat/cloud-computing-courses/?US=&utm_source=google&utm_medium=display&utm_campaign=p_performance-max_generic_in_secondary_new_june_2024&gad_source=1&gad_campaignid=21363892982&gbraid=0AAAAADqDZ6OkwzGXU9AgNL3yGMLqprEv_&gclid=Cj0KCQiA5uDIBhDAARIsAOxj0CHlQV18Tsq-VJLyj_Meq01ajdc8WE-RSyiVg8Y74pJA8j7UnoeiO-MaAj6xEALw_wcB"
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    provider: "ISC",
    duration: "10 weeks",
    level: "Beginner",
    enrolled: 276,
    description: "Learn security principles, ethical hacking, and risk management",
    skills: ["Network Security", "Penetration Testing", "Cryptography"],
    color: "from-red-500 to-red-600",
    link: "https://www.isc2.org/landing/1mcc?utm_source=google&utm_medium=cpc&utm_campaign=GBL-B2C-1MCC&utm_term=search&utm_content=GBL-B2C-1MCC&gad_source=1&gad_campaignid=22034116007&gbraid=0AAAAAD-S_-NIWLbdE1msquPJF55ab5BY3&gclid=Cj0KCQiA5uDIBhDAARIsAOxj0CHVFGVcOwjBQqcP9tydGuKKh_QqDeIMwi_r9jrksC0pSfdskMsCbzsaAgBlEALw_wcB"
  },
  {
    id: 5,
    title: "Mobile App Development",
    provider: "IBM",
    duration: "14 weeks",
    level: "Intermediate",
    enrolled: 198,
    description: "Build native mobile apps for iOS and Android",
    skills: ["React Native", "Flutter", "Firebase", "API Integration"],
    color: "from-purple-500 to-purple-600",
    link: "https://www.ibm.com/new/training/announcing-the-ios-and-android-mobile-app-developer-professional-certificate-from-ibm"
  },
  {
    id: 6,
    title: "Blockchain Technology",
    provider: "AI CERTS Team",
    duration: "10 weeks",
    level: "Advanced",
    enrolled: 143,
    description: "Understanding blockchain, smart contracts, and DApps",
    skills: ["Ethereum", "Solidity", "Web3.js", "Smart Contracts"],
    color: "from-indigo-500 to-indigo-600",
    link: "https://www.coursera.org/specializations/from-blocks-to-build-blockchain-dev-essentials?action=enroll"
  },
  {
    id: 7,
    title: "UX Design Mastery",
    provider: "Google",
    duration: "8 weeks",
    level: "Beginner",
    enrolled: 321,
    description: "Learn design thinking, prototyping, and user research",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    color: "from-pink-500 to-pink-600",
    link: "https://www.coursera.org/professional-certificates/google-ux-design"
  },
  {
    id: 8,
    title: "DevOps Engineering",
    provider: "IBM",
    duration: "12 weeks",
    level: "Advanced",
    enrolled: 167,
    description: "Master CI/CD, containerization, and infrastructure automation",
    skills: ["Docker", "Kubernetes", "Jenkins", "Terraform"],
    color: "from-teal-500 to-teal-600",
    link: "https://www.coursera.org/professional-certificates/devops-and-software-engineering"
  },
  {
    id: 9,
    title: "Digital Marketing",
    provider: "Career 247",
    duration: "6 weeks",
    level: "Beginner",
    enrolled: 289,
    description: "Learn SEO, social media marketing, and analytics",
    skills: ["SEO", "Google Analytics", "Content Marketing", "Social Media"],
    color: "from-yellow-500 to-yellow-600",
    link: "https://career247.com/job-assisted-programs/digital-marketing?utm_source=Ads+Google+C247&utm_medium=Search+Ads&utm_campaign=DM+Ads&gad_source=1&gad_campaignid=22946267971&gbraid=0AAAAArEX7v_Tz928vkaHxhxQ4kUSy-O5t&gclid=Cj0KCQiA5uDIBhDAARIsAOxj0CG3v-3RaCRdm963VVfjV18pWofYrS0nUZi1K_18zTIYY4IeEd8VtrQaAnlwEALw_wcB"
  }
];

const levelColors = {
  "Beginner": "bg-green-500",
  "Intermediate": "bg-blue-500",
  "Advanced": "bg-purple-500"
};

export default function CertificationsPage() {
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
              Professional Certifications
            </h1>
            <p className="text-muted-foreground">
              Enhance your skills with industry-recognized certification courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={p-3 rounded-lg bg-gradient-to-br ${cert.color}}>
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <Badge className={levelColors[cert.level as keyof typeof levelColors]}>
                        {cert.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {cert.provider}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      {cert.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {cert.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        {cert.enrolled} students enrolled
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Self-paced learning
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto space-y-2">
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full mb-2">
                          Enroll Now
                        </Button>
                      </a>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </a>
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
