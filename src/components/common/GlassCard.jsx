import React, { forwardRef } from 'react';

const GlassCard = forwardRef(({ children, className = "", onClick }, ref) => (
    <div 
        ref={ref}
        onClick={onClick} 
        className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all ${className}`}
    >
        {children}
    </div>
));

GlassCard.displayName = 'GlassCard';

export default GlassCard;
