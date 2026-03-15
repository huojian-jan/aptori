import React from 'react';

/**
 * TechSheepLogo
 * 科技风格 + 羊元素的组合标识：
 * 设计理念：
 * 1. 外圈：代表电路/芯片的轨道圆环（科技感 & 保护感）。
 * 2. 内部：抽象化的羊头（耳朵 + 角 + 下巴），使用几何线条避免卡通幼态，保持专业。
 * 3. 额头芯片 + 眼睛点：体现“智能 / 输入 / 打字训练”主题。
 * 4. 颜色：主色 #1890ff（与现有主题一致），辅以渐变与浅蓝点缀。
 */
export const TechSheepLogo: React.FC<{ size?: number } & React.SVGProps<SVGSVGElement>> = ({ size = 44, ...rest }) => {
  const stroke = '#1890ff';
  const accent = '#52b4ff';
  const glow = 'rgba(24,144,255,0.25)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role="img"
      aria-label="huojian 科技羊 Logo"
      {...rest}
    >
      {/* 外圈双层科技圆环 */}
      <circle cx="60" cy="60" r="54" stroke={stroke} strokeWidth="4" opacity="0.9" />
      <circle cx="60" cy="60" r="48" stroke={accent} strokeWidth="2" strokeDasharray="6 10" />
      <circle cx="60" cy="60" r="58" stroke={glow} strokeWidth="2" />

      {/* 连接点 (电路节点) */}
      <circle cx="60" cy="6" r="4" fill={stroke} />
      <circle cx="112" cy="60" r="4" fill={stroke} />
      <circle cx="60" cy="114" r="4" fill={stroke} />
      <circle cx="8" cy="60" r="4" fill={stroke} />

      {/* 羊头主体轮廓（几何抽象） */}
      <path
        d="M40 55c0-16 9-30 20-30s20 14 20 30v4c0 14-9 26-20 26s-20-12-20-26v-4Z"
        fill="url(#wool)"
        stroke={stroke}
        strokeWidth="3"
      />

      {/* 羊角（抽象成对称弧形 + 断点电路感） */}
      <path
        d="M38 50c-6-2-10-8-10-14 0-8 6-14 14-14 5 0 9 3 12 7"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M82 50c6-2 10-8 10-14 0-8-6-14-14-14-5 0-9 3-12 7"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 芯片额头区域 */}
      <rect x="52" y="42" width="16" height="14" rx="2" fill="#ffffff" stroke={accent} strokeWidth="2" />
      <path d="M56 42v-6m8 6v-6m-12 8h-6m18 0h6m-18 12h-6m18 0h6m-8-8h-8" stroke={accent} strokeWidth="2" strokeLinecap="round" />

      {/* 眼睛 */}
      <circle cx="53" cy="63" r="3" fill={stroke} />
      <circle cx="67" cy="63" r="3" fill={stroke} />

      {/* 下巴/嘴部 - 简洁几何 */}
      <path d="M56 74c2 2 6 2 8 0" stroke={accent} strokeWidth="2" strokeLinecap="round" />

      {/* 阴影光晕 */}
      <ellipse cx="60" cy="95" rx="24" ry="8" fill="rgba(24,144,255,0.08)" />

      {/* 渐变定义 */}
      <defs>
        <linearGradient id="wool" x1="40" y1="25" x2="80" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e6f7ff" />
          <stop offset="60%" stopColor="#cceeff" />
          <stop offset="100%" stopColor="#b3e5ff" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TechSheepLogo;
