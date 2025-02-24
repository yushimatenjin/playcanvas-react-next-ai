"use client";

import { Color, Script as PcScript } from "playcanvas";

interface LightConfig {
	color?: Color;
	intensity?: number;
	range?: number;
	innerConeAngle?: number;
	outerConeAngle?: number;
}

export class LightSetup extends PcScript {
	// デフォルトの設定
	private static readonly DEFAULT_CONFIGS: Record<string, LightConfig> = {
		ambient: {
			color: new Color(0.8, 0.8, 1.0),
			intensity: 0.7,
		},
		"accent-light": {
			color: new Color(0.333, 0.235, 0.604),
			intensity: 0.5,
			range: 20,
			innerConeAngle: 30,
			outerConeAngle: 45,
		},
	};

	initialize() {
		const light = this.entity.light;
		if (!light) return;

		const config = LightSetup.DEFAULT_CONFIGS[this.entity.name] || {};

		if (config.color) {
			light.color = config.color;
		}

		if (config.intensity !== undefined) {
			light.intensity = config.intensity;
		}

		if (config.range !== undefined) {
			light.range = config.range;
		}

		if (config.innerConeAngle !== undefined) {
			light.innerConeAngle = config.innerConeAngle;
		}

		if (config.outerConeAngle !== undefined) {
			light.outerConeAngle = config.outerConeAngle;
		}
	}
}
