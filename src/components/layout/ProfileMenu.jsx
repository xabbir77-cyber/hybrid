import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Shield, UserCircle, LogOut, Moon, Users } from 'lucide-react';
import { auth } from '../../services/firebase';

const ProfileMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div className="relative">
            <motion.div 
                className="relative p-[2px] rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 cursor-pointer shadow-lg neon-glow-cyan"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <img 
                    src={user?.photoURL || 'https://i.pravatar.cc/150?u=guest'} 
                    className="w-10 h-10 rounded-full border-2 border-black object-cover" 
                    alt="profile" 
                />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-cyan-400 border-2 border-black rounded-full neon-glow-cyan"></div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                        <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 10, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 15, scale: 0.9, filter: 'blur(10px)' }}
                            className="absolute top-full right-0 mt-2 w-72 glass-effect rounded-2xl overflow-hidden shadow-2xl z-50 p-2"
                        >
                            {/* Top Section */}
                            <div className="p-4 flex flex-col items-center text-center border-b border-white/10 mb-2">
                                <img 
                                    src={user?.photoURL || 'https://i.pravatar.cc/150?u=guest'} 
                                    className="w-20 h-20 rounded-full border-4 border-white/5 mb-3 object-cover shadow-2xl" 
                                    alt="profile large" 
                                />
                                <h3 className="text-white font-black tracking-tight">{user?.displayName || 'Hybrid User'}</h3>
                                <p className="text-[10px] text-cyan-400 font-mono mb-4 uppercase">#87654321</p>
                                <button className="w-full py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl text-xs font-black uppercase transition-all duration-300">
                                    View Profile
                                </button>
                            </div>

                            {/* Middle Section */}
                            <div className="space-y-1 mb-2">
                                {[
                                    { icon: Settings, label: 'Settings & Privacy' },
                                    { icon: Users, label: 'Account Switcher' },
                                    { icon: Shield, label: 'Display Customization', hasToggle: true },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <item.icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                                            <span className="text-xs font-medium text-gray-300 group-hover:text-white">{item.label}</span>
                                        </div>
                                        {item.hasToggle && (
                                            <div className="w-8 h-4 bg-cyan-500/20 rounded-full relative flex items-center px-1">
                                                <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Section */}
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                            >
                                <LogOut size={16} className="group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-bold uppercase tracking-widest">Log Out</span>
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileMenu;
