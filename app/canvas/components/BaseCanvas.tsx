"use client";

import { Application, Entity } from "@playcanvas/react";
import { Camera, Light, Script } from "@playcanvas/react/components";
import { Color, FILLMODE_KEEP_ASPECT, RESOLUTION_AUTO } from "playcanvas";
import { type ReactNode, useRef } from "react";
import { StaticPostEffects } from "../../../utils/PostEffect";
import { useCanvasResize } from "../hooks/useCanvasResize";
import {
	DEFAULT_POST_EFFECTS,
	type PostEffectsSettings,
	mergePostEffects,
} from "../hooks/usePostEffects";
import { LightSetup } from "../scripts/LightSetup";

export interface BaseCanvasProps {
	children?: ReactNode;
	cameraPosition?: [number, number, number];
	cameraConfig?: {
		fov?: number;
		clearColor?: Color;
	};
	postEffects?: Partial<PostEffectsSettings>;
	className?: string;
	style?: React.CSSProperties;
}

export const BaseCanvas = ({
	children,
	cameraPosition = [0, 0, 10],
	cameraConfig = {},
	postEffects = {},
	className = "canvas-container",
	style = {},
}: BaseCanvasProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	useCanvasResize(containerRef);

	const defaultStyle: React.CSSProperties = {
		perspective: "1000px",
		height: "100vh",
		width: "100%",
		...style,
	};

	// PostEffectsの設定をマージ
	const effects = mergePostEffects(postEffects);

	return (
		<div ref={containerRef} className={className} style={defaultStyle}>
			<Application
				fillMode={FILLMODE_KEEP_ASPECT}
				resolutionMode={RESOLUTION_AUTO}
				graphicsDeviceOptions={{
					alpha: true,
				}}
			>
				{/* カメラ設定 */}
				<Entity name="camera" position={cameraPosition}>
					<Camera
						type="perspective"
						fov={cameraConfig.fov ?? 45}
						clearColor={
							cameraConfig.clearColor ?? new Color(0.059, 0.09, 0.165)
						}
					/>
					<StaticPostEffects {...effects} />
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

				{/* 子要素 */}
				{children}
			</Application>
		</div>
	);
};
