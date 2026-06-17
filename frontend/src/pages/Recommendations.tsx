import React, { useState } from 'react';
import { Lightbulb, ArrowRight, CheckCircle2, Flame, Leaf, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const recommendationsData = [
  {
    id: 1,
    title: 'Switch to LED Bulbs',
    description: 'Replace all incandescent bulbs with LEDs. They use 75% less energy and last 25 times longer.',
    impact: 'Low Impact',
    difficulty: 'Easy',
    savings: '$50/year',
    icon: <Lightbulb size={24} className="text-yellow-500" />,
    color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
  },
  {
    id: 2,
    title: 'Start Composting',
    description: 'Compost organic waste instead of throwing it away to reduce methane emissions from landfills.',
    impact: 'Medium Impact',
    difficulty: 'Medium',
    savings: 'Soil Health',
    icon: <Leaf size={24} className="text-green-500" />,
    color: 'bg-green-500/10 border-green-500/20 text-green-500'
  },
  {
    id: 3,
    title: 'Install Solar Panels',
    description: 'Generate your own clean electricity and reduce your reliance on fossil-fuel heavy grids.',
    impact: 'High Impact',
    difficulty: 'Hard',
    savings: '$1,500/year',
    icon: <Zap size={24} className="text-primary-500" />,
    color: 'bg-primary-500/10 border-primary-500/20 text-primary-500'
  },
  {
    id: 4,
    title: 'Meatless Mondays',
    description: 'Skip meat just one day a week to significantly lower your dietary carbon footprint.',
    impact: 'Medium Impact',
    difficulty: 'Easy',
    savings: '$200/year',
    icon: <Flame size={24} className="text-orange-500" />,
    color: 'bg-orange-500/10 border-orange-500/20 text-orange-500'
  }
];

const Recommendations = () => {
  const [filter, setFilter] = useState<string>('All');
  const [actionPlan, setActionPlan] = useState<number[]>([]);

  const filteredRecs = recommendationsData.filter(rec => filter === 'All' || rec.difficulty === filter);

  const toggleAction = (id: number) => {
    if (actionPlan.includes(id)) {
      setActionPlan(actionPlan.filter(item => item !== id));
    } else {
      setActionPlan([...actionPlan, id]);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Recommendations</h1>
          <p className="text-gray-400">AI-driven suggestions to optimize your carbon footprint.</p>
        </div>
        
        <div className="flex space-x-2 bg-gray-900 p-1 rounded-lg">
          {['All', 'Easy', 'Medium', 'Hard'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {actionPlan.length > 0 && (
        <div className="bg-primary-900/20 border border-primary-500/30 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle2 className="text-primary-500 mr-2" /> My Action Plan
          </h2>
          <div className="flex flex-wrap gap-3">
            {recommendationsData.filter(r => actionPlan.includes(r.id)).map(rec => (
              <div key={`plan-${rec.id}`} className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 flex items-center">
                {rec.icon}
                <span className="text-white ml-2 text-sm font-medium">{rec.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredRecs.map((rec) => {
            const isCommitted = actionPlan.includes(rec.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={rec.id}
                className={`border rounded-2xl p-6 transition-all ${isCommitted ? 'bg-gray-800 border-primary-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${rec.color}`}>
                    {rec.icon}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    rec.difficulty === 'Easy' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                    rec.difficulty === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                    'bg-red-500/10 border-red-500/20 text-red-500'
                  }`}>
                    {rec.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{rec.title}</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">
                  {rec.description}
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Impact</span>
                    <span className="text-sm font-medium text-white">{rec.impact}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Savings</span>
                    <span className="text-sm font-medium text-green-400">{rec.savings}</span>
                  </div>
                  <button 
                    onClick={() => toggleAction(rec.id)}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isCommitted 
                        ? 'bg-gray-700 text-white border border-gray-600' 
                        : 'bg-primary-600 hover:bg-primary-500 text-white'
                    }`}
                  >
                    {isCommitted ? 'Committed' : 'Commit'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Recommendations;
