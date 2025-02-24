"use client";

import { Entity } from "@playcanvas/react";
import { Render, Script } from "@playcanvas/react/components";
import { Light } from "@playcanvas/react/components";
import { Color } from "playcanvas";
import { memo } from "react";
import type { PostEffectsSettings } from "../hooks/usePostEffects";
import { RotationScript } from "../scripts/RotationScript";
import { BaseCanvas } from "./BaseCanvas";

export interface PrimitiveConfig {
	type: "box" | "sphere" | "cylinder" | "cone" | "torus";
	scale: number;
}

interface SceneCanvasProps {
	primitiveConfig: PrimitiveConfig;
	postEffects?: Partial<PostEffectsSettings>;
	lightColor?: Color;
	accentLightColor?: Color;
	backgroundColor?: Color;
	className?: string;
}

const SceneCanvasComponent = ({
	primitiveConfig,
	postEffects,
	lightColor = new Color(0.8, 0.8, 1.0),
	accentLightColor = new Color(0.333, 0.235, 0.604),
	backgroundColor = new Color(0.059, 0.09, 0.165),
	className,
}: SceneCanvasProps) => {
	return (
		<BaseCanvas
			cameraPosition={[0, 2, 8]}
			cameraConfig={{
				fov: 45,
				clearColor: backgroundColor,
			}}
			postEffects={postEffects}
			className={className}
		>
			{/* メインライト */}
			<Entity name="main-light" position={[4, 8, 4]} rotation={[-45, 45, 0]}>
				<Light
					type="directional"
					// @ts-ignore
					intensity={1.2}
					color={lightColor}
				/>
			</Entity>

			{/* フィルライト */}
			<Entity name="fill-light" position={[-2, 3, -2]} rotation={[-30, -45, 0]}>
				<Light
					type="directional"
					// @ts-ignore
					intensity={0.4}
					color={lightColor}
				/>
			</Entity>

			{/* アクセントライト */}
			<Entity name="accent-light" position={[3, 1, 3]} rotation={[30, 45, 0]}>
				<Light
					type="spot"
					// @ts-ignore
					intensity={1.5}
					color={accentLightColor}
					range={15}
					innerConeAngle={25}
					outerConeAngle={35}
				/>
			</Entity>

			{/* プリミティブオブジェクト */}
			<Entity
				name="primitive-object"
				position={[0, 0, 0]}
				scale={[
					primitiveConfig.scale,
					primitiveConfig.scale,
					primitiveConfig.scale,
				]}
			>
				<Render type={primitiveConfig.type} />
				<Script
					script={RotationScript}
					rotationPattern="random"
					rotationSpeed={0.5}
				/>
			</Entity>
		</BaseCanvas>
	);
};

// パフォーマンス最適化のためメモ化
export const SceneCanvas = memo(SceneCanvasComponent);
