import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useStore } from '../store';
import { Activity, Leaf, Zap, Car, ShoppingBag, Plane, Trash2 } from 'lucide-react';

const Simulator = () => {
  const { carbonScore, totalEmissions } = useStore();
  const baseScore = carbonScore || 65;
  const baseEmissions = totalEmissions || 6500;

  // New detailed simulator state
  const [actions, setActions] = useState({
    driveLess: 0, // % reduction
    vegan: false,
    solar: false,
    reduceShopping: 0, // % reduction
    fewerFlights: 0, // number of flights reduced
    compost: false
  });

  // Calculate projected score based on actions
  const projection = useMemo(() => {
    let reduction = 0;
    
    reduction += (actions.driveLess / 100) * 1500; // up to 1.5 tonnes
    if (actions.vegan) reduction += 800; // 0.8 tonnes
    if (actions.solar) reduction += 2000; // 2 tonnes
    reduction += (actions.reduceShopping / 100) * 500; // up to 0.5 tonnes
    reduction += actions.fewerFlights * 400; // 0.4 tonnes per flight
    if (actions.compost) reduction += 150; // 0.15 tonnes

    const projectedEmissions = Math.max(0, baseEmissions - reduction);
    const reductionPercent = (reduction / baseEmissions) * 100;
    const newScore = Math.min(100, baseScore + (reductionPercent * 0.5));
    
    return { projectedEmissions, newScore, reduction };
  }, [actions, baseScore, baseEmissions]);

  // Generate 5-year graph data
  const graphData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearlyReduction = projection.reduction / 5; // Spread reduction over 5 years
    
    return Array.from({ length: 6 }).map((_, i) => ({
      year: currentYear + i,
      baseline: baseEmissions,
      projected: Math.max(0, baseEmissions - (yearlyReduction * i))
    }));
  }, [baseEmissions, projection.reduction]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Impact Simulator</h1>
        <p className="text-gray-400">Play with the variables below to visualize your 5-year emission reduction trajectory.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sliders Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Activity className="mr-2 text-primary-500" /> Adjust Your Habits
            </h3>

            {/* Drive Less */}
            <div className="mb-6">
              <label className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                <span className="flex items-center"><Car size={16} className="mr-2 text-blue-400"/> Drive Less</span>
                <span className="text-white">{actions.driveLess}%</span>
              </label>
              <input 
                type="range" min="0" max="100" step="5" 
                value={actions.driveLess} 
                onChange={e => setActions({...actions, driveLess: parseInt(e.target.value)})}
                className="w-full accent-blue-500" 
              />
            </div>

            {/* Reduce Shopping */}
            <div className="mb-6">
              <label className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                <span className="flex items-center"><ShoppingBag size={16} className="mr-2 text-purple-400"/> Reduce Shopping</span>
                <span className="text-white">{actions.reduceShopping}%</span>
              </label>
              <input 
                type="range" min="0" max="100" step="10" 
                value={actions.reduceShopping} 
                onChange={e => setActions({...actions, reduceShopping: parseInt(e.target.value)})}
                className="w-full accent-purple-500" 
              />
            </div>

            {/* Fewer Flights */}
            <div className="mb-6">
              <label className="flex justify-between text-sm font-medium text-gray-400 mb-2">
                <span className="flex items-center"><Plane size={16} className="mr-2 text-cyan-400"/> Cancel Flights/Year</span>
                <span className="text-white">{actions.fewerFlights} flights</span>
              </label>
              <input 
                type="range" min="0" max="5" step="1" 
                value={actions.fewerFlights} 
                onChange={e => setActions({...actions, fewerFlights: parseInt(e.target.value)})}
                className="w-full accent-cyan-500" 
              />
            </div>

            <div className="h-px bg-gray-800 my-6"></div>

            {/* Toggles */}
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${actions.vegan ? 'bg-green-500/20 text-green-500' : 'bg-gray-800 text-gray-500'}`}>
                    <Leaf size={18} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white group-hover:text-primary-400 transition-colors">Plant-based Diet</span>
                    <span className="text-xs text-gray-500">Go fully vegetarian</span>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${actions.vegan ? 'bg-primary-500' : 'bg-gray-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${actions.vegan ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
                {/* Hidden input for accessibility */}
                <input type="checkbox" className="hidden" checked={actions.vegan} onChange={e => setActions({...actions, vegan: e.target.checked})} />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${actions.solar ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-800 text-gray-500'}`}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white group-hover:text-primary-400 transition-colors">Solar Energy</span>
                    <span className="text-xs text-gray-500">Switch home to renewables</span>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${actions.solar ? 'bg-primary-500' : 'bg-gray-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${actions.solar ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
                <input type="checkbox" className="hidden" checked={actions.solar} onChange={e => setActions({...actions, solar: e.target.checked})} />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${actions.compost ? 'bg-orange-500/20 text-orange-500' : 'bg-gray-800 text-gray-500'}`}>
                    <Trash2 size={18} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white group-hover:text-primary-400 transition-colors">Composting</span>
                    <span className="text-xs text-gray-500">Eliminate food waste</span>
                  </div>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${actions.compost ? 'bg-primary-500' : 'bg-gray-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${actions.compost ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
                <input type="checkbox" className="hidden" checked={actions.compost} onChange={e => setActions({...actions, compost: e.target.checked})} />
              </label>
            </div>
          </div>
        </div>

        {/* Chart Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Leaf size={64} /></div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Projected Score</p>
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-black text-white">{Math.round(projection.newScore)}</span>
                <span className="text-sm text-green-400 font-medium mb-1">+{Math.round(projection.newScore - baseScore)} pts</span>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={64} /></div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Emissions Prevented</p>
              <div className="flex items-end space-x-3">
                <span className="text-4xl font-black text-white">{Math.round(projection.reduction)}</span>
                <span className="text-sm text-gray-400 mb-1">kg CO2e / yr</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-[400px]">
            <h3 className="text-lg font-bold text-white mb-6">5-Year Emission Trajectory</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="year" stroke="#4b5563" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="projected" name="Projected" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProjected)" />
                <Line type="monotone" dataKey="baseline" name="Baseline" stroke="#4b5563" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default React.memo(Simulator);
