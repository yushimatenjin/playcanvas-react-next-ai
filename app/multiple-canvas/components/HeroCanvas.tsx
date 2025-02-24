"use client";

import { Application, Entity } from "@playcanvas/react";
import {
  Camera,
  Light,
  Render,
  Script,
  EnvAtlas,
} from "@playcanvas/react/components";
import {
  Script as PcScript,
  FILLMODE_KEEP_ASPECT,
  RESOLUTION_AUTO,
  Color,
  Vec3,
} from "playcanvas";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { StaticPostEffects } from "../../../utils/PostEffect";

// エレガントな回転アニメーション
class ElegantRotation extends PcScript {
  // プロパティの型定義
  declare time: number;
  declare basePosition: Vec3;
  declare speed: number;

  initialize() {
    // @ts-ignore - PlayCanvasの型定義の制限を回避
    this.time = 0;
    // @ts-ignore
    this.basePosition = new Vec3().copy(this.entity.getLocalPosition());
    // @ts-ignore
    this.speed = this.speed || 1;
  }

  update(dt: number) {
    // @ts-ignore
    this.time += dt * 0.5 * this.speed;

    // スムーズな回転
    this.entity.setLocalEulerAngles(
      // @ts-ignore
      Math.sin(this.time * 0.5) * 5,
      // @ts-ignore
      this.time * 15,
      // @ts-ignore
      Math.cos(this.time * 0.5) * 5
    );

    // 浮遊アニメーション
    // @ts-ignore
    const floatOffset = Math.sin(this.time) * 0.2;
    this.entity.setLocalPosition(
      // @ts-ignore
      this.basePosition.x,
      // @ts-ignore
      this.basePosition.y + floatOffset,
      // @ts-ignore
      this.basePosition.z
    );
  }
}

// ライトの設定を管理するカスタムスクリプト
class LightSetup extends PcScript {
  initialize() {
    const light = this.entity.light;
    if (!light) return;

    if (this.entity.name === "ambient") {
      light.color = new Color(0.8, 0.8, 1.0);
      light.intensity = 0.7;
    } else if (this.entity.name === "accent-light") {
      light.color = new Color(0.333, 0.235, 0.604);
      light.intensity = 0.5;
      light.range = 20;
      light.innerConeAngle = 30;
      light.outerConeAngle = 45;
    }
  }
}

export const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {});

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="canvas-container">
      <Application
        fillMode={FILLMODE_KEEP_ASPECT}
        resolutionMode={RESOLUTION_AUTO}
        graphicsDeviceOptions={{
          alpha: true,
        }}
      >
        {/* カメラ設定 */}
        <Entity name="camera" position={[0, 0, 12]}>
          <Camera
            type="perspective"
            fov={45}
            clearColor={new Color(0.059, 0.09, 0.165)}
          />
          <StaticPostEffects 
           bloom={{
            enabled: true,
            intensity: 0.75,
            lastMipLevel: 2,
          }}
            
          />
        </Entity>

        {/* 環境光 */}
        <Entity name="ambient" position={[0, 10, 0]}>
          <Light type="directional" />
          <Script script={LightSetup} />
        </Entity>

        {/* アクセント光 */}
        <Entity name="accent-light" position={[5, 2, 5]}>
          <Light type="spot" />
          <Script script={LightSetup} />
        </Entity>

        {/* メインのジオメトリコンテナ */}
        <Entity name="geometry-container" position={[0, 0, 0]}>
          {/* トーラス */}
          <Entity name="elegant-torus" position={[0, 0, 0]} scale={[2, 2, 0.5]}>
            <Render type="torus" />
            <Script script={ElegantRotation} speed={1} />
          </Entity>

          {/* 装飾用の小さな球体 */}
          {[-2, -1, 0, 1, 2].map((x, i) => (
            <Entity
              key={i}
              name={`sphere-${i}`}
              position={[x * 1.5, Math.sin(x) * 0.5, 0]}
              scale={[0.15, 0.15, 0.15]}
            >
              <Render type="sphere" />
              <Script
                script={ElegantRotation}
                speed={0.5 + Math.random() * 0.5}
              />
            </Entity>
          ))}
        </Entity>
      </Application>
    </div>
  );
};
