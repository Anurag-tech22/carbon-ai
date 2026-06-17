import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Sun, Wind, CheckCircle2, ArrowRight, Factory, Droplets, FlaskConical, Briefcase } from 'lucide-react';
import { useStore } from '../store';

const offsetProjects = [
  {
    id: 'trees',
    title: 'Reforestation Project',
    location: 'Amazon Rainforest, Brazil',
    description: 'Fund the planting and protection of native tree species to restore deforested areas and capture CO2.',
    impact: '1 Tonne CO2e',
    tonnes: 1,
    cost: '$15.00',
    price: 15,
    icon: <TreePine size={32} className="text-green-500" />,
    color: 'border-green-500/30 bg-green-500/5',
    boost: 5
  },
  {
    id: 'solar',
    title: 'Community Solar Farm',
    location: 'Rajasthan, India',
    description: 'Replace fossil fuel energy grids with clean, renewable solar power for local communities.',
    impact: '2.5 Tonnes CO2e',
    tonnes: 2.5,
    cost: '$35.00',
    price: 35,
    icon: <Sun size={32} className="text-yellow-500" />,
    color: 'border-yellow-500/30 bg-yellow-500/5',
    boost: 12
  },
  {
    id: 'wind',
    title: 'Offshore Wind Initiative',
    location: 'North Sea, Europe',
    description: 'Invest in large-scale offshore wind turbines to generate massive amounts of zero-emission electricity.',
    impact: '5 Tonnes CO2e',
    tonnes: 5,
    cost: '$60.00',
    price: 60,
    icon: <Wind size={32} className="text-blue-500" />,
    color: 'border-blue-500/30 bg-blue-500/5',
    boost: 25
  },
  {
    id: 'dac',
    title: 'Direct Air Capture (DAC)',
    location: 'Iceland',
    description: 'Fund advanced technology facilities that suck CO2 directly out of the ambient air and pump it underground.',
    impact: '10 Tonnes CO2e',
    tonnes: 10,
    cost: '$250.00',
    price: 250,
    icon: <Factory size={32} className="text-purple-500" />,
    color: 'border-purple-500/30 bg-purple-500/5',
    boost: 45
  },
  {
    id: 'kelp',
    title: 'Ocean Kelp Farming',
    location: 'Coast of California, USA',
    description: 'Support the cultivation of giant kelp forests, which grow incredibly fast and sink carbon into the deep ocean.',
    impact: '3 Tonnes CO2e',
    tonnes: 3,
    cost: '$45.00',
    price: 45,
    icon: <Droplets size={32} className="text-cyan-500" />,
    color: 'border-cyan-500/30 bg-cyan-500/5',
    boost: 15
  },
  {
    id: 'methane',
    title: 'Landfill Methane Capture',
    location: 'Global Sites',
    description: 'Capture and destroy methane (a greenhouse gas 80x more potent than CO2) leaking from old landfills.',
    impact: '8 Tonnes CO2e',
    tonnes: 8,
    cost: '$80.00',
    price: 80,
    icon: <FlaskConical size={32} className="text-orange-500" />,
    color: 'border-orange-500/30 bg-orange-500/5',
    boost: 35
  }
];

const Offsets = () => {
  const { carbonScore, setScore, totalEmissions } = useStore();
  const [purchased, setPurchased] = useState<string[]>([]);

  const handlePurchase = (id: string, boost: number) => {
    if (purchased.includes(id)) return;
    
    // Mock purchase: increase carbon score
    const newScore = Math.min(100, (carbonScore || 65) + boost);
    setScore(newScore, totalEmissions || 6500);
    setPurchased([...purchased, id]);
  };

  const totalSpent = purchased.reduce((total, id) => {
    const proj = offsetProjects.find(p => p.id === id);
    return total + (proj ? proj.price : 0);
  }, 0);

  const totalOffset = purchased.reduce((total, id) => {
    const proj = offsetProjects.find(p => p.id === id);
    return total + (proj ? proj.tonnes : 0);
  }, 0);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Offset Marketplace</h1>
        <p className="text-gray-400">Fund verified, high-impact climate projects to balance your unavoidable emissions.</p>
      </div>

      {/* Portfolio Dashboard */}
      <AnimatePresence>
        {purchased.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-900 border border-primary-500/30 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5"><Briefcase size={120} /></div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <CheckCircle2 className="text-primary-500 mr-2" /> My Impact Portfolio
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Projects Funded</p>
                <p className="text-3xl font-black text-white">{purchased.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Total CO2e Offset</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-primary-400">{totalOffset.toFixed(1)}</span>
                  <span className="text-gray-400 font-medium">Tonnes</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Total Contribution</p>
                <p className="text-3xl font-black text-green-400">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offsetProjects.map((project, index) => {
          const isBought = purchased.includes(project.id);
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-2xl p-6 flex flex-col h-full transition-all ${project.color} ${isBought ? 'opacity-50 grayscale' : 'hover:-translate-y-1'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-gray-900 border border-gray-800">
                  {project.icon}
                </div>
                <div className="text-right">
                  <span className="block text-xl font-bold text-white">{project.cost}</span>
                  <span className="text-xs text-gray-500 uppercase font-semibold">One-time</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-xs text-gray-400 mb-4 flex items-center">
                <GlobeIcon className="w-3 h-3 mr-1" /> {project.location}
              </p>
              
              <p className="text-sm text-gray-300 mb-6 flex-1">
                {project.description}
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-800">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Estimated Impact</span>
                  <span className="font-bold text-primary-400">-{project.impact}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Score Boost</span>
                  <span className="font-bold text-green-400">+{project.boost} pts</span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(project.id, project.boost)}
                disabled={isBought}
                className={`w-full py-3 rounded-xl font-medium flex items-center justify-center transition-all ${
                  isBought 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700' 
                    : 'bg-primary-600 hover:bg-primary-500 text-white'
                }`}
              >
                {isBought ? (
                  <><CheckCircle2 size={18} className="mr-2" /> Added to Portfolio</>
                ) : (
                  <>Fund Project <ArrowRight size={18} className="ml-2" /></>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Verified Gold Standard</h3>
          <p className="text-gray-400 max-w-xl">All projects in our marketplace are independently verified by the Gold Standard and Verra frameworks to ensure your contribution makes a real, permanent impact.</p>
        </div>
        <div className="mt-6 md:mt-0 px-6 py-3 bg-gray-800 rounded-lg text-sm text-gray-300 font-medium border border-gray-700">
          100% Transparency Guarantee
        </div>
      </div>
    </div>
  );
};

// Helper icon
const GlobeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

export default Offsets;
