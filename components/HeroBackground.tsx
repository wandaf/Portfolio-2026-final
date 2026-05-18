import React from 'react';
import { GrainGradient } from '@paper-design/shaders-react';

/** Static fallback — always painted so hero is never flat black if WebGL fails (common in Chrome). */
const HERO_CSS_GRADIENT =
  'radial-gradient(ellipse 120% 90% at 72% 18%, #09729f 0%, #2e428a 38%, #0425a9 62%, #043153 82%, #0d0707 100%)';

type HeroBackgroundProps = {
  width: number;
  height: number;
};

const HeroBackground = React.memo(function HeroBackground({ width, height }: HeroBackgroundProps) {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0" style={{ background: HERO_CSS_GRADIENT }} aria-hidden />
      <div className="absolute inset-0">
        <GrainGradient
          width={w}
          height={h}
          colors={['#043153', '#0425a9', '#2e428a', '#09729f']}
          colorBack="#0d0707"
          softness={1}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={0.6}
          offsetX={0.14}
          offsetY={0.06}
        />
      </div>
    </div>
  );
});

export default HeroBackground;
