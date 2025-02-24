"use client";

import { Color } from "playcanvas";
import type { PrimitiveConfig } from "../components/SceneCanvas";
import type { PostEffectsSettings } from "../hooks/usePostEffects";

export interface VisualPreset {
	id: string;
	name: string;
	postEffects: Partial<PostEffectsSettings>;
	primitive: PrimitiveConfig;
	lightColor: Color;
	accentLightColor: Color;
	backgroundColor: Color;
}

export const visualPresets: VisualPreset[] = [
	{
		id: "cosmic",
		name: "Cosmic Dream",
		postEffects: {
			bloom: {
				enabled: true,
				intensity: 1.2,
				lastMipLevel: 4,
			},
			grading: {
				enabled: true,
				brightness: 1.15,
				contrast: 1.25,
				saturation: 1.5,
				tint: { r: 1, g: 0.95, b: 1, a: 1 },
			},
			vignette: {
				enabled: true,
				intensity: 0.85,
				inner: 0.3,
				outer: 1.5,
				curvature: 0.75,
			},
			ssao: {
				type: "hbao",
				intensity: 0.6,
				radius: 32,
				samples: 16,
				power: 6,
				minAngle: 10,
				scale: 1,
				blurEnabled: true,
			},
		},
		primitive: {
			type: "sphere",
			scale: 2,
		},
		lightColor: new Color(0.8, 0.6, 1.0),
		accentLightColor: new Color(1.0, 0.4, 0.8),
		backgroundColor: new Color(0.05, 0.02, 0.1),
	},
	{
		id: "ocean",
		name: "Deep Ocean",
		postEffects: {
			bloom: {
				enabled: true,
				intensity: 0.7,
				lastMipLevel: 3,
			},
			grading: {
				enabled: true,
				brightness: 0.95,
				contrast: 1.15,
				saturation: 1.3,
				tint: { r: 0.9, g: 1, b: 1, a: 1 },
			},
			vignette: {
				enabled: true,
				intensity: 0.7,
				inner: 0.25,
				outer: 1.6,
				curvature: 0.85,
			},
			ssao: {
				type: "hbao",
				intensity: 0.5,
				radius: 28,
				samples: 14,
				power: 6,
				minAngle: 10,
				scale: 1,
				blurEnabled: true,
			},
		},
		primitive: {
			type: "torus",
			scale: 1.8,
		},
		lightColor: new Color(0.4, 0.8, 1.0),
		accentLightColor: new Color(0.2, 0.6, 0.8),
		backgroundColor: new Color(0.02, 0.05, 0.1),
	},
	{
		id: "sunset",
		name: "Golden Sunset",
		postEffects: {
			bloom: {
				enabled: true,
				intensity: 0.9,
				lastMipLevel: 3,
			},
			grading: {
				enabled: true,
				brightness: 1.1,
				contrast: 1.2,
				saturation: 1.4,
				tint: { r: 1, g: 0.85, b: 0.7, a: 1 },
			},
			vignette: {
				enabled: true,
				intensity: 0.65,
				inner: 0.35,
				outer: 1.7,
				curvature: 0.8,
			},
			ssao: {
				type: "hbao",
				intensity: 0.45,
				radius: 25,
				samples: 12,
				power: 6,
				minAngle: 10,
				scale: 1,
				blurEnabled: true,
			},
		},
		primitive: {
			type: "cylinder",
			scale: 1.5,
		},
		lightColor: new Color(1.0, 0.8, 0.4),
		accentLightColor: new Color(1.0, 0.4, 0.2),
		backgroundColor: new Color(0.1, 0.05, 0.02),
	},
	{
		id: "neon",
		name: "Neon City",
		postEffects: {
			bloom: {
				enabled: true,
				intensity: 1.1,
				lastMipLevel: 4,
			},
			grading: {
				enabled: true,
				brightness: 1.15,
				contrast: 1.3,
				saturation: 1.6,
				tint: { r: 0.85, g: 1, b: 0.9, a: 1 },
			},
			vignette: {
				enabled: true,
				intensity: 0.75,
				inner: 0.25,
				outer: 1.8,
				curvature: 0.9,
			},
			ssao: {
				type: "hbao",
				intensity: 0.55,
				radius: 30,
				samples: 16,
				power: 6,
				minAngle: 10,
				scale: 1,
				blurEnabled: true,
			},
		},
		primitive: {
			type: "box",
			scale: 1.6,
		},
		lightColor: new Color(0.2, 1.0, 0.6),
		accentLightColor: new Color(1.0, 0.2, 0.8),
		backgroundColor: new Color(0.02, 0.02, 0.05),
	},
	{
		id: "frost",
		name: "Arctic Frost",
		postEffects: {
			bloom: {
				enabled: true,
				intensity: 0.8,
				lastMipLevel: 3,
			},
			grading: {
				enabled: true,
				brightness: 1.1,
				contrast: 1.15,
				saturation: 1.2,
				tint: { r: 0.95, g: 1, b: 1, a: 1 },
			},
			vignette: {
				enabled: true,
				intensity: 0.5,
				inner: 0.45,
				outer: 1.5,
				curvature: 0.75,
			},
			ssao: {
				type: "hbao",
				intensity: 0.4,
				radius: 24,
				samples: 12,
				power: 6,
				minAngle: 10,
				scale: 1,
				blurEnabled: true,
			},
		},
		primitive: {
			type: "cone",
			scale: 1.7,
		},
		lightColor: new Color(0.8, 0.9, 1.0),
		accentLightColor: new Color(0.6, 0.8, 1.0),
		backgroundColor: new Color(0.04, 0.06, 0.08),
	},
];
