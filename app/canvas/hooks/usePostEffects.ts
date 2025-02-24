"use client"

import { Color } from 'playcanvas';

// PostEffectsの設定型
export interface PostEffectsSettings {
  lighting: {
    exposure: number;
    skyBoxIntensity: number;
  };
  rendering: {
    renderFormat: number;
    renderTargetScale: number;
    sharpness: number;
    samples: number;
    toneMapping: number;
    fog: "none" | "linear" | "exponential";
    fogColor: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
    fogRange: [number, number];
    fogDensity: number;
    renderFormatFallback0: number;
    renderFormatFallback1: number;
    sceneColorMap: boolean;
    sceneDepthMap: boolean;
    fogStart: number;
    fogEnd: number;
  };
  ssao: {
    type: "none" | "ssao" | "hbao";
    intensity: number;
    radius: number;
    samples: number;
    power: number;
    minAngle: number;
    scale: number;
    blurEnabled: boolean;
  };
  bloom: {
    enabled: boolean;
    intensity: number;
    lastMipLevel: number;
  };
  grading: {
    enabled: boolean;
    brightness: number;
    contrast: number;
    saturation: number;
    tint: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  };
  vignette: {
    enabled: boolean;
    intensity: number;
    inner: number;
    outer: number;
    curvature: number;
  };
  taa: {
    enabled: boolean;
    jitter: number;
  };
  fringing: {
    enabled: boolean;
    intensity: number;
  };
}

// デフォルトのポストエフェクト設定
export const DEFAULT_POST_EFFECTS: PostEffectsSettings = {
  lighting: {
    exposure: 1.21,
    skyBoxIntensity: 1.02,
  },
  rendering: {
    renderFormat: 18,
    renderTargetScale: 1,
    sharpness: 0,
    samples: 4,
    toneMapping: 4,
    fog: "none",
    fogColor: {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
    fogRange: [0, 100],
    fogDensity: 0.01,
    renderFormatFallback0: 12,
    renderFormatFallback1: 14,
    sceneColorMap: false,
    sceneDepthMap: false,
    fogStart: 0,
    fogEnd: 100,
  },
  ssao: {
    type: "none",
    intensity: 0.5,
    radius: 30,
    samples: 12,
    power: 6,
    minAngle: 10,
    scale: 1,
    blurEnabled: true,
  },
  bloom: {
    enabled: true,
    intensity: 0.1,
    lastMipLevel: 1,
  },
  grading: {
    enabled: true,
    brightness: 0.83,
    contrast: 1.06,
    saturation: 1.2,
    tint: {
      r: 1,
      g: 0.9333333333333333,
      b: 0.8666666666666667,
      a: 1,
    },
  },
  vignette: {
    enabled: true,
    intensity: 1,
    inner: 0.25,
    outer: 1.52,
    curvature: 0.78,
  },
  taa: {
    enabled: false,
    jitter: 0.4,
  },
  fringing: {
    enabled: true,
    intensity: 10,
  },
};

// 深いマージを行うヘルパー関数
function deepMerge<T extends { [key: string]: any }>(target: T, source: Partial<T>): T {
  const result = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key as keyof T];
    const targetValue = target[key as keyof T];

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object'
    ) {
      result[key as keyof T] = deepMerge(targetValue, sourceValue);
    } else if (sourceValue !== undefined) {
      result[key as keyof T] = sourceValue;
    }
  });

  return result;
}

// カスタム設定とデフォルト設定をマージする関数
export const mergePostEffects = (custom: Partial<PostEffectsSettings> = {}): PostEffectsSettings => {
  return deepMerge(DEFAULT_POST_EFFECTS, custom);
};