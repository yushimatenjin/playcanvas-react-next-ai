"use client"

import { Script as PcScript, Vec3 } from 'playcanvas';

interface RotationScriptProps {
  speed?: number;
  rotationPattern?: 'elegant' | 'random';
}

export class RotationScript extends PcScript {
  // PlayCanvasのスクリプトプロパティを定義
  static attributes = {
    speed: { type: 'number', default: 1 },
    rotationPattern: { type: 'string', default: 'elegant' }
  };

  // プロパティの型定義
  declare speed: number;
  declare rotationPattern: string;
  private time: number = 0;
  private timeOffset: number = 0;
  private basePosition: Vec3;

  initialize() {
    this.speed = this.speed || 1;
    this.rotationPattern = this.rotationPattern || 'elegant';
    this.timeOffset = Math.random() * Math.PI * 2;
    this.basePosition = new Vec3().copy(this.entity.getLocalPosition());
  }

  update(dt: number) {
    this.time += dt * 0.5 * this.speed;
    
    if (this.rotationPattern === 'elegant') {
      this.updateElegantRotation();
    } else {
      this.updateRandomRotation(dt);
    }
  }

  private updateElegantRotation() {
    // スムーズな回転
    this.entity.setLocalEulerAngles(
      Math.sin(this.time * 0.5) * 5,
      this.time * 15,
      Math.cos(this.time * 0.5) * 5
    );

    // 浮遊アニメーション
    const floatOffset = Math.sin(this.time) * 0.2;
    this.entity.setLocalPosition(
      this.basePosition.x,
      this.basePosition.y + floatOffset,
      this.basePosition.z
    );
  }

  private updateRandomRotation(dt: number) {
    const time = (Date.now() * 0.001) + this.timeOffset;
    
    this.entity.rotate(
      dt * (Math.sin(time * 0.7) * 15), 
      dt * (Math.cos(time * 0.5) * 20),
      dt * (Math.sin(time * 0.3) * 10)
    );
  }
}