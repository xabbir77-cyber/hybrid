import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const VideoPlayer = ({ url, isActive, isMuted, onToggleMute, poster }) => {
    const [playing, setPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);

    useEffect(() => {
        setPlaying(isActive);
    }, [isActive]);

    return (
        <div className="relative w-full h-full bg-black group overflow-hidden">
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 animate-pulse">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <ReactPlayer
                ref={playerRef}
                url={url}
                playing={playing}
                muted={isMuted}
                loop
                width="100%"
                height="100%"
                playsinline
                onReady={() => setLoaded(true)}
                onProgress={(p) => setProgress(p.played * 100)}
                style={{ objectFit: 'cover' }}
                config={{
                    file: {
                        attributes: {
                            style: { objectFit: 'cover', width: '100%', height: '100%' },
                            preload: 'auto'
                        }
                    }
                }}
            />

            {/* Overlays */}
            <div 
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => setPlaying(!playing)}
            >
                {/* Center Play/Pause Icon on Toggle */}
                <AnimatePresence>
                    {!playing && loaded && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="p-6 bg-black/40 backdrop-blur-xl rounded-full border border-white/10">
                                <Play size={48} fill="white" className="text-white" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setPlaying(!playing)} className="text-white">
                            {playing ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <button onClick={onToggleMute} className="text-white">
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                    </div>
                    <button className="text-white"><Maximize size={20} /></button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-purple-600 to-blue-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
