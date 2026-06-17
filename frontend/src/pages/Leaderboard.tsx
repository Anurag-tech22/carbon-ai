import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Globe, MapPin, Medal, ArrowUp } from 'lucide-react';
import { useStore } from '../store';

const initialLeaderboard = [
  { id: 1, name: "EcoWarrior99", score: 98, location: "Global", trend: "up" },
  { id: 2, name: "GreenEarth", score: 95, location: "Global", trend: "up" },
  { id: 3, name: "SustainableSam", score: 92, location: "Local", trend: "flat" },
  { id: 4, name: "PlanetFirst", score: 88, location: "Global", trend: "up" },
  { id: 5, name: "CarbonZero", score: 85, location: "Local", trend: "down" },
];

const Leaderboard = () => {
  const { carbonScore } = useStore();
  const userScore = carbonScore || 65;
  const [filter, setFilter] = useState<'Global' | 'Local'>('Global');

  // Insert user into mock leaderboard
  const combinedBoard = [...initialLeaderboard, { id: 'user', name: "You", score: userScore, location: filter, trend: "up" }]
    .filter(u => filter === 'Global' || u.location === 'Local' || u.id === 'user')
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Leaderboard</h1>
          <p className="text-gray-400">See how your footprint compares to others.</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-1 flex">
          <button 
            onClick={() => setFilter('Global')}
            className={`px-4 py-2 rounded-md flex items-center transition-colors ${filter === 'Global' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Globe size={16} className="mr-2" /> Global
          </button>
          <button 
            onClick={() => setFilter('Local')}
            className={`px-4 py-2 rounded-md flex items-center transition-colors ${filter === 'Local' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <MapPin size={16} className="mr-2" /> Local
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <Medal className="text-yellow-500 w-12 h-12 mb-2" />
          <h3 className="text-xl font-bold text-white">Top 10%</h3>
          <p className="text-sm text-yellow-200/70">Your Current Tier</p>
        </div>
        <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/5 border border-primary-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center md:col-span-2">
          <Trophy className="text-primary-500 w-12 h-12 mb-2" />
          <h3 className="text-xl font-bold text-white">Global Challenge: 1M Trees</h3>
          <p className="text-sm text-primary-200/70">The community has saved enough carbon to plant 450,000 trees this month!</p>
          <div className="w-full bg-gray-900 rounded-full h-2 mt-4 overflow-hidden">
            <div className="bg-primary-500 h-2 rounded-full w-[45%]"></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 bg-gray-950/50 flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="w-16">Rank</div>
          <div className="flex-1">Pioneer</div>
          <div className="w-24 text-right">Score</div>
        </div>
        
        <div className="divide-y divide-gray-800">
          <AnimatePresence>
            {combinedBoard.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`px-6 py-4 flex items-center justify-between ${user.id === 'user' ? 'bg-primary-900/10' : 'hover:bg-gray-800/50'} transition-colors`}
              >
                <div className="w-16 font-mono text-gray-400">
                  #{index + 1}
                </div>
                <div className="flex-1 flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${user.id === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <span className={`font-medium ${user.id === 'user' ? 'text-primary-400 font-bold' : 'text-gray-200'}`}>
                      {user.name}
                    </span>
                    {user.id === 'user' && <span className="ml-2 text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">You</span>}
                  </div>
                </div>
                <div className="w-24 flex items-center justify-end space-x-3">
                  {user.trend === 'up' && <ArrowUp size={14} className="text-green-500" />}
                  <span className="font-bold text-white text-lg">{user.score}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
