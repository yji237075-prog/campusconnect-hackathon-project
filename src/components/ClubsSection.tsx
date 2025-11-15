"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, UserCircle } from "lucide-react";
import clubsData from "@/backend/clubs.json";

interface SubClub {
  name: string;
  president: string;
  coordinator: string;
  phone: string;
}

interface Club {
  id: string;
  name: string;
  icon: string;
  color: string;
  subClubs: SubClub[];
}

export const ClubsSection = () => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClubClick = (club: Club) => {
    setSelectedClub(club);
    setIsOpen(true);
  };

  return (
    <>
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 text-white"
        >
          Campus Clubs
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {clubsData.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-500"
                onClick={() => handleClubClick(club as Club)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`text-5xl mb-3 bg-gradient-to-br ${club.color} bg-clip-text text-transparent font-bold`}>
                    {club.icon}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">{club.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Club Details Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl flex items-center gap-3">
              <span className="text-4xl">{selectedClub?.icon}</span>
              <span className={`bg-gradient-to-r ${selectedClub?.color} bg-clip-text text-transparent`}>
                {selectedClub?.name}
              </span>
            </DialogTitle>
            <DialogDescription>
              Explore sub-clubs and their leadership details
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <AnimatePresence>
              {selectedClub?.subClubs.map((subClub, index) => (
                <motion.div
                  key={subClub.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-l-4" style={{
                    borderLeftColor: `hsl(${index * 60}, 70%, 50%)`
                  }}>
                    <CardHeader>
                      <CardTitle className="text-lg">{subClub.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <UserCircle className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">President</p>
                          <p className="text-sm font-semibold">{subClub.president}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Coordinator</p>
                          <p className="text-sm font-semibold">{subClub.coordinator}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Contact</p>
                          <p className="text-sm font-semibold">{subClub.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
