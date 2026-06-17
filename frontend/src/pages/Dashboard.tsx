import React from 'react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, Activity, Wallet, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { carbonScore, totalEmissions } = useStore();
  const score = carbonScore || 0;
  const emissions = totalEmissions || 0;

  // Grade calculation
  const getGrade = (s: number) => {
    if (s >= 90) return { letter: 'A+', color: 'text-green-500' };
    if (s >= 80) return { letter: 'A', color: 'text-green-400' };
    if (s >= 70) return { letter: 'B', color: 'text-yellow-400' };
    if (s >= 60) return { letter: 'C', color: 'text-orange-400' };
    return { letter: 'D', color: 'text-red-500' };
  };

  const grade = getGrade(score);

  const activities = [
    { id: 1, title: 'Purchased Offset: Amazon Trees', time: '2 hours ago', icon: <Leaf className="text-green-500" size={16}/> },
    { id: 2, title: 'Joined Challenge: Meat-Free Month', time: '1 day ago', icon: <ShieldCheck className="text-primary-500" size={16}/> },
    { id: 3, title: 'Updated Footprint Assessment', time: '3 days ago', icon: <Activity className="text-blue-500" size={16}/> },
  ];

  const friends = [
    { id: 1, name: 'Sarah M.', action: 'Reached Level 4!', time: '10m ago' },
    { id: 2, name: 'David L.', action: 'Offset 5 Tonnes', time: '2h ago' },
    { id: 3, name: 'Emma T.', action: 'Joined Transit Pioneer', time: '5h ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Here's a snapshot of your environmental impact.</p>
        </div>
        <Link to="/calculator" className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
          Update Assessment <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Score Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Leaf size={150} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-2">Your Carbon Score</p>
              <div className="flex items-baseline space-x-4 mb-2">
                <span className="text-6xl font-black text-white">{score}</span>
                <span className="text-xl text-gray-500 font-medium">/ 100</span>
              </div>
              <p className="text-gray-400">
                Estimated emissions: <span className="text-white font-bold">{emissions.toLocaleString()} kg CO2e/year</span>
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 bg-gray-950/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center min-w-[150px]">
              <p className="text-sm text-gray-400 font-semibold mb-1">Eco Grade</p>
              <span className={`text-5xl font-black ${grade.color}`}>{grade.letter}</span>
            </div>
          </div>
        </motion.div>

        {/* Carbon Wallet */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Wallet size={20} /></div>
            <h2 className="text-lg font-bold text-white">Carbon Wallet</h2>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Offset Balance</p>
              <p className="text-3xl font-bold text-green-400">8.5 <span className="text-base text-gray-500 font-normal">Tonnes</span></p>
            </div>
            <div className="h-px bg-gray-800 my-4"></div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Impact Credits</p>
              <p className="text-xl font-bold text-primary-400">1,250 <span className="text-sm text-gray-500 font-normal">pts</span></p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Clock size={20} /></div>
            <h2 className="text-lg font-bold text-white">Your Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {activities.map(act => (
              <div key={act.id} className="flex items-center p-3 hover:bg-gray-800 rounded-xl transition-colors">
                <div className="mr-4 p-2 bg-gray-950 rounded-lg border border-gray-800">{act.icon}</div>
                <div>
                  <p className="text-white text-sm font-medium">{act.title}</p>
                  <p className="text-xs text-gray-500">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Friends Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Users size={20} /></div>
            <h2 className="text-lg font-bold text-white">Community & Friends</h2>
          </div>
          <div className="space-y-4">
            {friends.map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-xl transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs mr-3">
                    {friend.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{friend.name}</p>
                    <p className="text-xs text-primary-400 font-semibold">{friend.action}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{friend.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
