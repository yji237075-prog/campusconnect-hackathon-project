"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [qid, setQid] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const captchaQuestion = "5 + 3 = ?";
  const captchaAnswer = "8";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (captcha !== captchaAnswer) {
      setError("Captcha Incorrect");
      setLoading(false);
      return;
    }

    const success = login(qid, name, password);
    if (success) {
      router.push("/home");
    } else {
      setError("Invalid Credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#001F3F] to-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="https://quantumuniversity.edu.in/images/og_logo.png"
                alt="Quantum University"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-2xl">Quantum University</CardTitle>
            <CardDescription>Login to CampusConnect</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qid">QID</Label>
                <Input
                  id="qid"
                  type="text"
                  placeholder="25030170"
                  value={qid}
                  onChange={(e) => setQid(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Abhinav Parihar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="captcha">Captcha: {captchaQuestion}</Label>
                <Input
                  id="captcha"
                  type="text"
                  placeholder="Enter answer"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-sm text-destructive">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
            <div className="mt-4 text-center space-y-2">
              <div className="text-sm">
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
                {" | "}
                <Link href="/forgot-id" className="text-primary hover:underline">
                  Forgot ID?
                </Link>
              </div>
              <div className="text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}