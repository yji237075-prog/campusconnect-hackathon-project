"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [qid, setQid] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const result = forgotPassword(qid);
    if (result) {
      setMessage(result);
    } else {
      setError("QID not found in our records");
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
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>Enter your QID to reset your password</CardDescription>
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
              {message && (
                <div className="p-3 text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-md">
                  {message}
                </div>
              )}
              {error && (
                <div className="text-sm text-destructive">{error}</div>
              )}
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-sm text-primary hover:underline inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}