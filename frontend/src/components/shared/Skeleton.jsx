/**
 * Skeleton loading components for async content
 */
import { motion } from 'framer-motion';

/**
 * Base Skeleton component with shimmer animation
 */
const Skeleton = ({ 
  className = '', 
  variant = 'rect',
  width,
  height,
  animate = true 
}) => {
  const baseClasses = animate 
    ? 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer' 
    : 'bg-gray-200';

  const variants = {
    rect: 'rounded-xl',
    circle: 'rounded-full',
    text: 'rounded h-4',
    small: 'rounded h-3',
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`} 
      style={style}
      aria-hidden="true"
    />
  );
};

/**
 * Full page loading skeleton
 */
export const SkeletonPage = () => (
  <div className="pt-24 pb-16 min-h-screen">
    <div className="max-w-container mx-auto px-4 md:px-8 space-y-8">
      {/* Hero skeleton */}
      <div className="space-y-4 max-w-2xl">
        <Skeleton width="120px" height="24px" />
        <Skeleton width="80%" height="48px" />
        <Skeleton width="60%" height="24px" />
        <Skeleton width="100%" height="20px" />
      </div>
      
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height="200px" />
        ))}
      </div>
    </div>
  </div>
);

/**
 * Card skeleton
 */
export const SkeletonCard = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 space-y-4"
  >
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" width="48px" height="48px" />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height="20px" />
        <Skeleton width="40%" height="14px" />
      </div>
    </div>
    <Skeleton width="100%" height="14px" />
    <Skeleton width="90%" height="14px" />
    <Skeleton width="75%" height="14px" />
    <div className="pt-4 flex gap-3">
      <Skeleton width="50%" height="40px" />
      <Skeleton width="50%" height="40px" />
    </div>
  </motion.div>
);

/**
 * Table skeleton
 */
export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
    {/* Header */}
    <div className="flex gap-4 pb-4 border-b border-gray-100 mb-4">
      {Array.from({ length: cols }, (_, j) => (
        <Skeleton key={j} className="flex-1 h-6" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
        {Array.from({ length: cols }, (_, j) => (
          <Skeleton key={j} className="flex-1 h-10" />
        ))}
      </div>
    ))}
  </div>
);

/**
 * Expert card skeleton
 */
export const SkeletonExpertCard = () => (
  <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
    <div className="flex items-start gap-4 mb-4">
      <Skeleton variant="circle" width="64px" height="64px" />
      <div className="flex-1 space-y-2">
        <Skeleton width="70%" height="20px" />
        <Skeleton width="50%" height="14px" />
        <div className="flex gap-2">
          <Skeleton width="40px" height="16px" />
          <Skeleton width="100px" height="16px" />
        </div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <Skeleton width="100%" height="14px" />
      <Skeleton width="85%" height="14px" />
    </div>
    <div className="flex gap-2 mb-4">
      <Skeleton width="80px" height="24px" className="rounded-full" />
      <Skeleton width="100px" height="24px" className="rounded-full" />
      <Skeleton width="60px" height="24px" className="rounded-full" />
    </div>
    <div className="flex gap-3 pt-4 border-t border-gray-100">
      <Skeleton width="50%" height="40px" />
      <Skeleton width="50%" height="40px" />
    </div>
  </div>
);

/**
 * Plan detail skeleton
 */
export const SkeletonPlanDetail = () => (
  <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 space-y-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" width="32px" height="32px" />
          <Skeleton width="200px" height="28px" />
        </div>
        <Skeleton width="100px" height="16px" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right space-y-1">
          <Skeleton width="60px" height="14px" />
          <Skeleton width="80px" height="32px" />
        </div>
        <Skeleton width="120px" height="40px" />
      </div>
    </div>
    
    <div className="pt-6 border-t border-gray-100">
      <Skeleton width="150px" height="20px" className="mb-4" />
      <div className="space-y-3">
        <Skeleton width="100%" height="16px" />
        <Skeleton width="95%" height="16px" />
        <Skeleton width="88%" height="16px" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <Skeleton height="80px" />
      <Skeleton height="80px" />
    </div>
  </div>
);

/**
 * FAQ skeleton
 */
export const SkeletonFAQ = ({ items = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: items }, (_, i) => (
      <div key={i} className="bg-white rounded-xl p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <Skeleton width="80%" height="20px" />
          <Skeleton variant="circle" width="24px" height="24px" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Breadcrumb skeleton
 */
export const SkeletonBreadcrumb = () => (
  <div className="flex items-center gap-2 mb-8">
    <Skeleton width="60px" height="16px" />
    <Skeleton width="16px" height="16px" />
    <Skeleton width="100px" height="16px" />
  </div>
);

export default Skeleton;
