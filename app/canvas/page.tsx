"use client"

import { useRef, useMemo } from 'react';
import { SceneCanvas } from './components/SceneCanvas';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { visualPresets } from './presets/visualPresets';
import { PostEffectsSettings } from './hooks/usePostEffects';
import './globals.css';

export default function CanvasPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { sections, currentSectionIndex, scrollProgress, sectionProgress } = useInfiniteScroll(containerRef, {
    threshold: 0.7,
    loadMoreTrigger: 3
  });

  // スクロール位置に基づいてポストエフェクトを補間（改善版）
  const getInterpolatedEffects = (preset: typeof visualPresets[0], progress: number): Partial<PostEffectsSettings> => {
    const effects = { ...preset.postEffects };
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const smoothProgress = easeInOut(progress);
    
    if (effects.bloom) {
      // よりダイナミックなブルーム効果
      effects.bloom.intensity = (effects.bloom.intensity || 0) * 
        (1 + Math.sin(progress * Math.PI * 2) * 0.4 + Math.sin(progress * Math.PI) * 0.3);
      effects.bloom.lastMipLevel = Math.max(2, Math.floor(3 + Math.sin(progress * Math.PI) * 1));
    }
    
    if (effects.vignette) {
      // スクロールに応じてビネットを動的に調整
      effects.vignette.intensity = (effects.vignette.intensity || 0) * 
        (1 + Math.cos(progress * Math.PI * 2) * 0.3);
      effects.vignette.curvature = (effects.vignette.curvature || 0) * 
        (1 + Math.sin(progress * Math.PI) * 0.2);
    }
    
    if (effects.grading) {
      // カラーグレーディングの動的な調整
      effects.grading.saturation = (effects.grading.saturation || 1) * 
        (1 + Math.sin(progress * Math.PI * 2) * 0.15);
      effects.grading.contrast = (effects.grading.contrast || 1) * 
        (1 + Math.sin(progress * Math.PI) * 0.1);
      effects.grading.brightness = (effects.grading.brightness || 1) * 
        (1 + Math.sin(progress * Math.PI * 2) * 0.05);
    }
    
    return effects;
  };

  return (
    <main 
      ref={containerRef}
      className="min-h-screen bg-black text-white relative"
    >
      {sections.map((sectionIndex) => {
        const preset = visualPresets[sectionIndex % visualPresets.length];
        
        return (
          <section
            key={sectionIndex}
            className="h-screen w-full sticky top-0"
          >
            <SceneCanvas
              primitiveConfig={preset.primitive}
              postEffects={getInterpolatedEffects(preset, sectionProgress)}
              lightColor={preset.lightColor}
              accentLightColor={preset.accentLightColor}
              backgroundColor={preset.backgroundColor}
              className="w-full h-full"
            />
            
            {/* コンテンツオーバーレイ（改善版） */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    to bottom,
                    rgba(0,0,0,${0.5 + Math.sin(sectionProgress * Math.PI) * 0.2}) 0%,
                    rgba(0,0,0,${0.2 + Math.sin(sectionProgress * Math.PI) * 0.1}) 20%,
                    rgba(0,0,0,${0.2 + Math.sin(sectionProgress * Math.PI) * 0.1}) 80%,
                    rgba(0,0,0,${0.5 + Math.sin(sectionProgress * Math.PI) * 0.2}) 100%
                  )
                `,
                backdropFilter: 'blur(8px)'
              }}
            />
            
            {/* プリセット名とインジケーター */}
            <div 
              className="absolute inset-x-0 bottom-0 pb-16 text-center"
              style={{
                transform: `translateY(${Math.sin(sectionProgress * Math.PI) * 20}px)`,
                opacity: 1 - Math.abs(sectionProgress - 0.5) * 2,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="backdrop-blur-xl bg-black/50 py-8 px-6 mx-auto max-w-md rounded-t-3xl shadow-2xl border border-white/10">
                <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] tracking-wide bg-gradient-to-r from-white to-white/80 bg-clip-text">
                  {preset.name}
                </h2>
                <p className="text-white/90 mb-6 max-w-sm mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  Scroll to explore more visual experiences
                </p>
                <div className="flex gap-3 justify-center">
                  {visualPresets.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSectionIndex % visualPresets.length
                          ? 'bg-white scale-125 shadow-lg'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to preset ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* スクロールプログレス */}
            <div className="fixed top-0 left-0 w-full h-1 bg-white/10">
              <div
                className="h-full bg-white/50 backdrop-blur-sm transition-all duration-300"
                style={{ 
                  width: `${scrollProgress * 100}%`,
                  boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}
              />
            </div>
          </section>
        );
      })}
    </main>
  );
}
