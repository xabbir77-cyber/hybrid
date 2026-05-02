import React from 'react';

const SkeletonLoader = ({ className = "" }) => (
    <div className={`animate-pulse bg-white/5 rounded-2xl ${className}`}>
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] animate-shimmer"></div>
    </div>
);

export const SkeletonPost = () => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-6 space-y-4">
        <div className="flex items-center gap-3">
            <SkeletonLoader className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
                <SkeletonLoader className="w-24 h-3" />
                <SkeletonLoader className="w-16 h-2" />
            </div>
        </div>
        <SkeletonLoader className="w-full aspect-video rounded-xl" />
        <div className="space-y-2">
            <SkeletonLoader className="w-full h-3" />
            <SkeletonLoader className="w-2/3 h-3" />
        </div>
    </div>
);

export default SkeletonLoader;
