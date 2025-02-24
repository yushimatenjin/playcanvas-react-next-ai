"use client";

import { motion } from "motion/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { HeroCanvas } from "./components/HeroCanvas";
import { SkillsCanvas } from "./components/SkillsCanvas";

// セクションコンポーネント
const Section = ({
  children,
  className = "",
  onIntersect,
}: {
  children: React.ReactNode;
  className?: string;
  onIntersect?: () => void;
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!onIntersect || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={`min-h-screen flex flex-col items-center justify-center px-4 relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

// Primitiveの設定の型定義
export interface PrimitiveConfig {
  type: 'box' | 'sphere' | 'cone' | 'cylinder' | 'capsule';
  scale: number;
  rotation: number[];
}

// ランダムなPrimitiveの設定を生成する関数
const generateRandomPrimitiveConfig = (): PrimitiveConfig => {
  const primitiveTypes: PrimitiveConfig['type'][] = ['box', 'sphere', 'cone', 'cylinder', 'capsule'];
  const randomType = primitiveTypes[Math.floor(Math.random() * primitiveTypes.length)];
  const randomScale = 2.5 + Math.random() * 0.5;
  const randomRotation = [
    Math.random() * 360,
    Math.random() * 360,
    Math.random() * 360
  ];

  return {
    type: randomType,
    scale: randomScale,
    rotation: randomRotation,
  };
};

// 最大表示数
const MAX_VISIBLE_CANVASES = 3;

export default function Portfolio() {
  const [canvases, setCanvases] = useState([
    { id: 1, config: generateRandomPrimitiveConfig() }
  ]);

  const addCanvas = useCallback(() => {
    setCanvases(prev => {
      const newCanvas = { 
        id: prev[prev.length - 1].id + 1, 
        config: generateRandomPrimitiveConfig() 
      };
      
      // 最新のMAX_VISIBLE_CANVASES個だけを保持
      const updatedCanvases = [...prev, newCanvas].slice(-MAX_VISIBLE_CANVASES);
      
      return updatedCanvases;
    });
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Section className="hero-gradient">
        <HeroCanvas />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.h1
              className="text-6xl md:text-7xl font-bold text-background tracking-tight relative"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.1
              }}
            >
              <motion.span className="inline-block">
                Multiple Canvas
              </motion.span>
            </motion.h1>
          </motion.div>
          <motion.div
            className="mt-4 flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {["Developer", "Designer", "Creator"].map((text, i) => (
              <motion.span
                key={text}
                className="text-sm text-background/80 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </Section>
      {canvases.map((canvas, index) => (
        <Section
          key={canvas.id}
          onIntersect={index === canvases.length - 1 ? addCanvas : undefined}
        >
          <SkillsCanvas primitiveConfig={canvas.config} />
        </Section>
      ))}
    </main>
  );
}
