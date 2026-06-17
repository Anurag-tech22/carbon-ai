import React, { useState } from 'react';
import { Trophy, CheckCircle2, Flame, Medal, Award, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const activeChallenges = [
  {
    id: 1,
    title: "Zero Waste Week",
    description: "Produce absolutely no landfill waste for 7 consecutive days.",
    participants: 12450,
    progress: 65, // percentage
    points: 500,
    joined: true
  },
  {
    id: 2,
    title: "Public Transit Pioneer",
    description: "Take the bus or train instead of driving for all your commutes this month.",
    participants: 8320,
    progress: 30,
    points: 750,
    joined: false
  },
  {
    id: 3,
    title: "Meat-Free Month",
    description: "Commit to a 100% plant-based diet for 30 days.",
    participants: 45100,
    progress: 85,
    points: 1000,
    joined: false
  }
];

const badges = [
  { name: 'First Step', icon: <Star size={24} />, color: 'text-yellow-500', bg: 'bg-yellow-500/20 border-yellow-500/30', unlocked: true },
  { name: 'Eco Warrior', icon: <Medal size={24} />, color: 'text-primary-500', bg: 'bg-primary-500/20 border-primary-500/30', unlocked: true },
  { name: 'Zero Waste', icon: <Award size={24} />, color: 'text-purple-500', bg: 'bg-purple-500/20 border-purple-500/30', unlocked: false },
  { name: 'Transit Pro', icon: <Trophy size={24} />, color: 'text-blue-500', bg: 'bg-blue-500/20 border-blue-500/30', unlocked: false },
];

const Challenges = () => {
  const [challenges, setChallenges] = useState(activeChallenges);

  const toggleJoin = (id: number) => {
    setChallenges(challenges.map(c => c.id === id ? { ...c, joined: !c.joined } : c));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Community Challenges</h1>
        <p className="text-gray-400">Join global movements and unlock exclusive eco-badges.</p>
      </div>

      {/* Gamification Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Streak */}
        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/20 rounded-2xl p-6 flex items-center">
          <div className="p-4 bg-orange-500/20 rounded-full mr-6">
            <Flame size={40} className="text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-orange-200/70 font-semibold uppercase tracking-wider mb-1">Current Streak</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-black text-white">14</span>
              <span className="text-orange-400 font-medium">Days</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Log in tomorrow to keep it alive!</p>
          </div>
        </div>

        {/* Badges */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">My Badges</h3>
            <span className="text-sm font-medium text-primary-400">2 / 15 Unlocked</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {badges.map((badge, idx) => (
              <div key={idx} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${badge.unlocked ? badge.bg : 'bg-gray-800 border-gray-700 opacity-50 grayscale'}`}>
                <div className={`mb-2 ${badge.color}`}>
                  {badge.icon}
                </div>
                <span className="text-xs font-bold text-white text-center">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 flex items-center">
        <Users className="mr-3 text-primary-500" /> Active Global Challenges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gray-900 border rounded-2xl p-6 flex flex-col transition-all ${challenge.joined ? 'border-primary-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-gray-800 hover:border-gray-700'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-primary-500/10 text-primary-400 text-xs font-bold px-3 py-1 rounded-full">
                {challenge.points} PTS
              </div>
              <div className="flex items-center text-xs text-gray-400 font-medium">
                <Users size={14} className="mr-1" /> {(challenge.participants / 1000).toFixed(1)}k joined
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-400 mb-6 flex-1">
              {challenge.description}
            </p>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-gray-400">Community Progress</span>
                <span className="text-primary-400">{challenge.progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
              </div>
            </div>

            <button 
              onClick={() => toggleJoin(challenge.id)}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center transition-colors ${
                challenge.joined 
                  ? 'bg-gray-800 text-primary-400 border border-primary-500/30 hover:bg-gray-700' 
                  : 'bg-primary-600 hover:bg-primary-500 text-white'
              }`}
            >
              {challenge.joined ? <><CheckCircle2 size={18} className="mr-2" /> Joined</> : 'Join Challenge'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
