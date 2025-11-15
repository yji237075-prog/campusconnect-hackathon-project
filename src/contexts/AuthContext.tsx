"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import usersData from "@/backend/users.json";

interface User {
  qid: string;
  name: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (qid: string, name: string, password: string) => boolean;
  signup: (qid: string, name: string, password: string) => boolean;
  logout: () => void;
  forgotPassword: (qid: string) => string | null;
  forgotId: (name: string, email: string) => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(usersData);

  useEffect(() => {
    const storedUser = localStorage.getItem("campusConnectUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (qid: string, name: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.qid.trim() === qid.trim() && 
             u.name.toLowerCase().trim() === name.toLowerCase().trim() && 
             u.password === password
    );
    if (foundUser) {
      const userData = {
        qid: foundUser.qid,
        name: foundUser.name,
        password: foundUser.password
      };
      setUser(userData);
      localStorage.setItem("campusConnectUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (qid: string, name: string, password: string): boolean => {
    const exists = users.some((u) => u.qid === qid);
    if (!exists) {
      const newUser = { qid, name, password };
      setUsers([...users, newUser]);
      const userData = { qid, name, password };
      setUser(userData);
      localStorage.setItem("campusConnectUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("campusConnectUser");
  };

  const forgotPassword = (qid: string): string | null => {
    const foundUser = users.find((u) => u.qid === qid);
    if (foundUser) {
      return "Reset link sent to registered email (mock).";
    }
    return null;
  };

  const forgotId = (name: string, email: string): string | null => {
    const foundUser = users.find((u) => u.name.toLowerCase().trim() === name.toLowerCase().trim());
    if (foundUser) {
      return foundUser.qid;
    }
    return "No record found";
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, forgotPassword, forgotId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}