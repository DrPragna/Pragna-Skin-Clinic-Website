'use client';

/**
 * Artistic Elements
 * 
 * Reusable visual components for adding artistic flair to pages
 * without overwhelming with images. Uses geometry, gradients, and subtle patterns.
 */

// Decorative gradient blob - soft, organic shape
export function GradientBlob({ 
  className = '',
  color = 'maroon',
  size = 'lg',
}: {
  className?: string;
  color?: 'maroon' | 'terracotta' | 'rose';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeClasses = {
    sm: 'w-[200px] h-[200px]',
    md: 'w-[400px] h-[400px]',
    lg: 'w-[600px] h-[600px]',
    xl: 'w-[800px] h-[800px]',
  };
  
  const colorClasses = {
    maroon: 'from-maroon/10 to-transparent',
    terracotta: 'from-terracotta/15 to-transparent',
    rose: 'from-rose-gold/10 to-transparent',
  };
  
  return (
    <div 
      className={`
        absolute bg-gradient-radial ${colorClasses[color]} ${sizeClasses[size]}
        rounded-full blur-3xl pointer-events-none
        ${className}
      `}
    />
  );
}

// Concentric circles - elegant geometric pattern
export function ConcentricCircles({ 
  className = '',
  count = 3,
  color = 'maroon',
  animated = false,
}: {
  className?: string;
  count?: number;
  color?: 'maroon' | 'terracotta' | 'charcoal';
  animated?: boolean;
}) {
  const colorClasses = {
    maroon: 'border-maroon/10',
    terracotta: 'border-terracotta/20',
    charcoal: 'border-charcoal/5',
  };
  
  const sizes = [80, 120, 160, 200, 240];
  
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className={`
            absolute border ${colorClasses[color]} rounded-full
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ 
            width: sizes[i], 
            height: sizes[i],
            animationDelay: animated ? `${i * 0.2}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}

// Noise texture overlay
export function NoiseTexture({ 
  opacity = 0.03,
  className = '',
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// Decorative line - horizontal accent
export function DecorativeLine({ 
  className = '',
  variant = 'gradient',
}: {
  className?: string;
  variant?: 'gradient' | 'solid' | 'dashed';
}) {
  const variantClasses = {
    gradient: 'bg-gradient-to-r from-transparent via-maroon/30 to-transparent',
    solid: 'bg-maroon/20',
    dashed: 'border-t border-dashed border-maroon/20 bg-transparent',
  };
  
  return (
    <div 
      className={`
        h-px w-full max-w-xs mx-auto
        ${variantClasses[variant]}
        ${className}
      `}
    />
  );
}

// Image placeholder with artistic treatment
export function ImagePlaceholder({ 
  className = '',
  aspectRatio = 'square',
  label = 'Image needed',
}: {
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  label?: string;
}) {
  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
  };
  
  return (
    <div 
      className={`
        ${aspectClasses[aspectRatio]}
        bg-gradient-to-br from-maroon/5 via-beige-warm to-terracotta/10 
        rounded-[2rem] relative overflow-hidden
        ${className}
      `}
    >
      {/* Decorative circles */}
      <ConcentricCircles count={3} animated />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
      
      {/* Label */}
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-maroon/30 text-sm italic">{label}</p>
      </div>
    </div>
  );
}

// Floating orb - animated background element
export function FloatingOrb({ 
  className = '',
  color = 'terracotta',
  size = 'md',
}: {
  className?: string;
  color?: 'maroon' | 'terracotta' | 'rose';
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };
  
  const colorClasses = {
    maroon: 'bg-maroon/20',
    terracotta: 'bg-terracotta/30',
    rose: 'bg-rose-gold/20',
  };
  
  return (
    <div 
      className={`
        absolute ${sizeClasses[size]} ${colorClasses[color]}
        rounded-full blur-2xl pointer-events-none
        animate-float-slow
        ${className}
      `}
    />
  );
}

// Section divider with artistic treatment
export function SectionDivider({ 
  variant = 'wave',
  flip = false,
}: {
  variant?: 'wave' | 'curve' | 'angle';
  flip?: boolean;
}) {
  const paths = {
    wave: 'M0,64 C320,128 480,0 640,64 L640,128 L0,128 Z',
    curve: 'M0,128 Q320,0 640,128 L640,128 L0,128 Z',
    angle: 'M0,128 L640,64 L640,128 L0,128 Z',
  };
  
  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''}`}>
      <svg 
        viewBox="0 0 640 128" 
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path 
          d={paths[variant]} 
          fill="currentColor" 
          className="text-white"
        />
      </svg>
    </div>
  );
}

// Animated reveal wrapper
export function RevealOnScroll({ 
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div 
      className={`opacity-0 animate-fade-in-up ${className}`}
      style={{ 
        animationDelay: `${delay}s`, 
        animationFillMode: 'forwards' 
      }}
    >
      {children}
    </div>
  );
}

// Staggered children animation wrapper
export function StaggeredReveal({ 
  children,
  className = '',
  staggerDelay = 0.1,
  baseDelay = 0,
}: {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <div 
          key={i}
          className="opacity-0 animate-fade-in-up"
          style={{ 
            animationDelay: `${baseDelay + (i * staggerDelay)}s`, 
            animationFillMode: 'forwards' 
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

