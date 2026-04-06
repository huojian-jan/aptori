import React from 'react';

interface AdSlotProps {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ position, className = '' }) => {
  // 预留广告位占位，上线后替换为 Google AdSense 代码
  return (
    <div className={`ad-slot ad-slot-${position} ${className}`} aria-hidden="true">
      {/* Google AdSense 代码将在此处插入 */}
    </div>
  );
};

export default AdSlot;
