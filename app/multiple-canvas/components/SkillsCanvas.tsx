"use client";

import { Application, Entity } from "@playcanvas/react";
import {
	Camera,
	EnvAtlas,
	Light,
	Render,
	Script,
} from "@playcanvas/react/components";
import {
	Color,
	FILLMODE_KEEP_ASPECT,
	Script as PcScript,
	RESOLUTION_AUTO,
	StandardMaterial,
	Vec3,
} from "playcanvas";
import { memo, useEffect, useRef } from "react";
import { StaticPostEffects } from "../../../utils/PostEffect";
import { useEnvAtlas } from "../../../utils/hooks";
import type { PrimitiveConfig } from "../page";

// 回転アニメーションスクリプト
class RotateScript extends PcScript {
	// PlayCanvasのスクリプトプロパティを定義
	static attributes = {
		rotation: { type: "vec3", default: [0, 0, 0] },
	};

	// プロパティの型定義
	rotation!: number[];
	private timeOffset: number;

	initialize() {
		// 初期回転を設定
		const [rotX, rotY, rotZ] = this.rotation;
		this.entity.setLocalEulerAngles(rotX, rotY, rotZ);

		// ランダムな時間オフセットで各インスタンスの動きを個性的に
		this.timeOffset = Math.random() * Math.PI * 2;
	}

	update(dt: number) {
		const time = Date.now() * 0.001 + this.timeOffset;

		// より有機的な回転アニメーション
		this.entity.rotate(
			dt * (Math.sin(time * 0.7) * 15),
			dt * (Math.cos(time * 0.5) * 20),
			dt * (Math.sin(time * 0.3) * 10),
		);
	}
}

interface SkillsCanvasProps {
	primitiveConfig: PrimitiveConfig;
}

const SkillsCanvasComponent = ({ primitiveConfig }: SkillsCanvasProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const resizeObserver = new ResizeObserver(() => {
			// PlayCanvasは自動的にキャンバスをリサイズします
		});

		resizeObserver.observe(container);
		return () => resizeObserver.disconnect();
	}, []);

	return (
		<div
			ref={containerRef}
			className="canvas-container"
			style={{
				perspective: "1000px",
				height: "100vh",
				width: "100%",
			}}
		>
			<Application
				fillMode={FILLMODE_KEEP_ASPECT}
				resolutionMode={RESOLUTION_AUTO}
				graphicsDeviceOptions={{
					alpha: true,
				}}
			>
				{/* カメラ設定 */}
				<Entity name="camera" position={[0, 0, 10]}>
					<Camera
						type="perspective"
						fov={120}
						clearColor={new Color(0.059, 0.09, 0.165)}
					/>
					<StaticPostEffects
						lighting={{
							exposure: 1.5,
							skyBoxIntensity: 1.1,
						}}
						rendering={{
							renderFormat: 18,
							renderTargetScale: 1,
							sharpness: 0.5,
							samples: 4,
							toneMapping: 4,
							fog: "linear",
							fogColor: {
								r: 0.1,
								g: 0.1,
								b: 0.1,
								a: 1,
							},
							fogRange: [0, 150],
							fogDensity: 0.02,
							renderFormatFallback0: 12,
							renderFormatFallback1: 14,
							sceneColorMap: true,
							sceneDepthMap: true,
							fogStart: 0,
							fogEnd: 150,
						}}
						bloom={{
							enabled: true,
							intensity: 0.15,
							lastMipLevel: 2,
						}}
						grading={{
							enabled: true,
							brightness: 0.9,
							contrast: 1.1,
							saturation: 1.3,
							tint: {
								r: 1,
								g: 0.95,
								b: 0.9,
								a: 1,
							},
						}}
						vignette={{
							enabled: true,
							intensity: -1.2,
							inner: 0.3,
							outer: 1.6,
							curvature: 0.8,
						}}
						taa={{
							enabled: true,
							jitter: 0.5,
						}}
						fringing={{
							enabled: true,
							intensity: 12,
						}}
					/>
				</Entity>

				{/* アクセント光 */}
				<Entity name="accent-light" position={[5, 2, 5]} rotation={[45, 45, 0]}>
					<Light
						type="directional"
						// @ts-ignore
						intensity={1}
						color={new Color(1, 0.95, 0.8)}
					/>
				</Entity>
				{/* ランダムなPrimitive */}
				<Entity
					name="random-primitive"
					position={[0, 0, 0]}
					scale={[
						primitiveConfig.scale,
						primitiveConfig.scale,
						primitiveConfig.scale,
					]}
				>
					<Render type={primitiveConfig.type} />
				</Entity>
			</Application>
		</div>
	);
};

// パフォーマンス最適化のためメモ化
export const SkillsCanvas = memo(SkillsCanvasComponent);
