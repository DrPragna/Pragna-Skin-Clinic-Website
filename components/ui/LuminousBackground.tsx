'use client';

import React from 'react';

interface LuminousBackgroundProps {
  pillar: string;
  variant: 'family' | 'sub-treatment' | 'condition';
}

const PILLAR_COLORS: Record<string, { primary: string; secondary: string; accent: string }> = {
  'Skin': {
    primary: '#C28E79', // Terracotta
    secondary: '#8B5A4A', // Deep Burgundy
    accent: '#F3D7CD', // Light Terracotta
  },
  'Hair': {
    primary: '#CDAA5C', // True Gold
    secondary: '#A68A3D', // Deep Gold
    accent: '#F5F2EB', // Light Gold
  },
  'Body': {
    primary: '#9E8C6B', // Clay/Olive
    secondary: '#736243', // Deep Olive
    accent: '#F2F2EE', // Light Olive
  },
  'Wellness': {
    primary: '#87A896', // Sage
    secondary: '#527862', // Forest
    accent: '#ECF2EE', // Light Sage
  },
  'Others': {
    primary: '#87A896', // Sage fallback
    secondary: '#527862', // Forest fallback
    accent: '#ECF2EE', // Light Sage fallback
  }
};

export function LuminousBackground({ pillar, variant }: LuminousBackgroundProps) {
  const colors = PILLAR_COLORS[pillar] || PILLAR_COLORS['Others'];

  // Base background color
  // Condition pages now use a "Dimmed" dark theme to match the user's preference for contrast
  const baseBg = variant === 'condition' ? 'bg-[#0F0F0F]' : 'bg-[#111111]';

  return (
    <div className={`absolute inset-0 overflow-hidden ${baseBg}`}>
      {/* 1. Base Gradient Layer */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          background: variant === 'condition'
            ? `radial-gradient(circle at 50% 50%, ${colors.primary}, transparent 70%)` // Switch to Primary for consistency
            : `radial-gradient(circle at 50% 50%, ${colors.primary}, transparent 70%)`
        }}
      />

      {/* 2. Animated Mesh Orbs */}
      <div className="absolute inset-0 w-full h-full transform-gpu">
        {variant === 'family' && (
          <div className="relative w-full h-full animate-mesh-rotate">
            {/* Orb 1 - Top Left */}
            <div 
              className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[80px] opacity-60"
              style={{ background: colors.primary }}
            />
            {/* Orb 2 - Bottom Right */}
            <div 
              className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[80px] opacity-50"
              style={{ background: colors.secondary }}
            />
            {/* Orb 3 - Center/Accent */}
            <div 
              className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full blur-[60px] opacity-40 mix-blend-screen"
              style={{ background: colors.accent }}
            />
          </div>
        )}

        {variant === 'sub-treatment' && (
          <div className="relative w-full h-full animate-mesh-drift">
             {/* Orb 1 - Bottom Center - Rising */}
             <div 
              className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full blur-[70px] opacity-50"
              style={{ background: colors.primary }}
            />
            {/* Orb 2 - Top Right - Faint */}
            <div 
              className="absolute top-[10%] right-[10%] w-[40%] h-[40%] rounded-full blur-[80px] opacity-30"
              style={{ background: colors.secondary }}
            />
          </div>
        )}

        {variant === 'condition' && (
          <div className="relative w-full h-full flex items-center justify-center animate-mesh-breathe">
            {/* Single Central Glow - Dark Mode to match Family/Sub-treatment */}
            <div 
              className="w-[60%] h-[60%] rounded-full blur-[90px] opacity-40 mix-blend-screen"
              style={{ background: colors.primary }}
            />
            <div 
              className="absolute w-[40%] h-[40%] rounded-full blur-[80px] opacity-30 mix-blend-screen"
              style={{ background: colors.accent }}
            />
          </div>
        )}
      </div>

      {/* 3. Micro-Grain Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay pointer-events-none" />
      
      {/* 4. Darken overlay for text readability on dark modes */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

