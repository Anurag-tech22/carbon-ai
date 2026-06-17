import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calculator, Lightbulb, MessageSquare, Menu, BarChart2, Trophy, Github, Twitter, Linkedin, Leaf, Mail, Target, ShoppingCart, User, Settings, CreditCard, LogOut, ChevronDown, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 font-sans selection:bg-primary-500/30">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <div className="flex items-center gap-2 text-primary-400 font-bold text-lg tracking-tight">
            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-950 rounded-full" />
            </div>
            Carbon Compass
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/calculator" icon={<Calculator size={20} />} label="Calculator" />
          <NavItem to="/recommendations" icon={<Lightbulb size={20} />} label="Recommendations" />
          <NavItem to="/simulator" icon={<BarChart2 size={20} />} label="Simulator" />
          <NavItem to="/challenges" icon={<Trophy size={20} />} label="Challenges" />
          <NavItem to="/leaderboard" icon={<Target size={20} />} label="Leaderboard" />
          <NavItem to="/offsets" icon={<ShoppingCart size={20} />} label="Offset Market" />
          <NavItem to="/coach" icon={<MessageSquare size={20} />} label="AI Coach" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Global Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-20">
          
          <div className="flex items-center md:hidden">
            <button aria-label="Toggle Menu" className="p-2 text-gray-400 hover:text-white mr-2">
              <Menu size={24} />
            </button>
            <div className="text-primary-400 font-bold">Carbon Compass</div>
          </div>

          <div className="hidden md:flex flex-1 items-center max-w-xl">
            {/* Global Leveling System */}
            <div className="w-full flex items-center space-x-4 bg-gray-950 border border-gray-800 rounded-full px-4 py-2">
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-500" />
                <span className="text-sm font-bold text-white">Lvl 4</span>
              </div>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 w-3/4 rounded-full"></div>
              </div>
              <span className="text-xs text-gray-400 font-medium">1500 / 2000 XP</span>
            </div>
          </div>

          <div className="flex items-center ml-auto">
            {/* User Profile Dropdown */}
            <div className="relative group cursor-pointer">
              <div className="flex items-center space-x-3 bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-full pl-1 pr-3 py-1 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold uppercase">
                  {username ? username.substring(0, 2) : 'US'}
                </div>
                <span className="text-sm font-medium text-white hidden md:block">{username || 'User'}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              
              {/* Dropdown Menu (Hover) */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                <div className="p-2 space-y-1">
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"><User size={16} className="mr-3" /> Profile</a>
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"><Settings size={16} className="mr-3" /> Settings</a>
                  <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"><CreditCard size={16} className="mr-3" /> Billing</a>
                  <div className="h-px bg-gray-800 my-1"></div>
                  <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"><LogOut size={16} className="mr-3" /> Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-transparent flex flex-col relative z-10">
          <div className="p-4 md:p-8 flex-1">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </div>

          {/* Global Fat Footer */}
          <footer className="border-t border-gray-800 bg-gray-950 px-6 py-6 text-xs text-gray-500 mt-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Leaf className="text-primary-500 w-5 h-5" />
                  <span className="text-base font-bold text-white tracking-tight">Carbon Compass AI</span>
                </div>
                <p className="text-gray-400 mb-3 leading-relaxed">
                  Empowering individuals to understand, track, and reduce their carbon footprint.
                </p>
                <div className="flex items-center space-x-3">
                  <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Twitter size={16} /></a>
                  <a href="#" aria-label="Github" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Github size={16} /></a>
                  <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white hover:-translate-y-1 transition-all"><Linkedin size={16} /></a>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Platform</h3>
                <ul className="space-y-1.5">
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Calculator</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Simulator</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Offset Marketplace</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Leaderboards</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Resources</h3>
                <ul className="space-y-1.5">
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Sustainability Blog</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Carbon Offset Guide</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">API Documentation</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
                <p className="text-gray-400 mb-2">Get the latest tips directly to your inbox.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter email" 
                    aria-label="Email address for newsletter"
                    className="bg-gray-900 border border-gray-700 text-white rounded-l-lg px-3 py-1.5 w-full focus:outline-none focus:border-primary-500"
                  />
                  <button aria-label="Subscribe" className="bg-primary-600 hover:bg-primary-500 text-white px-3 py-1.5 rounded-r-lg transition-colors">
                    <Mail size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                <span>AI Engine Online &bull; Secure Connection</span>
              </div>
              <div>
                &copy; {new Date().getFullYear()} Carbon Compass AI. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
          isActive 
            ? 'bg-primary-500/10 text-primary-400' 
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

export default Layout;
