"use client";

import { Entity } from "@playcanvas/react";
import { Camera, Light, Render } from "@playcanvas/react/components";
import React, { useState } from "react";
import { StaticPostEffects } from "../../utils/PostEffect";
import { setMouseCursor } from "../../utils/cursor";
import { MotionEntity, MotionLight } from "./MotionEntity";
import { MouseRotation } from "./components/MouseRotation";

const Example = () => {
	const [hovered, setHovered] = useState(false);

	const onPointerOver = () => {
		setMouseCursor("pointer");
		setHovered(true);
	};
	const onPointerOut = () => {
		setMouseCursor("auto");
		setHovered(false);
	};

	const rotation: [number, number, number, number] = [0, 0, 90, 0];
	const scale: [number, number, number] = hovered ? [1.2, 1.2, 1.2] : [1, 1, 1];

	return (
		<>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div
					className="absolute inset-60 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 blur-[100px] opacity-50 transition-opacity duration-500"
					style={{ opacity: hovered ? 0.5 : 0 }}
				/>
				<h1
					className="font-bold text-8xl text-white text-center transition-all duration-300"
					style={{
						transform: `scale(${hovered ? 1.2 : 1})`,
						opacity: hovered ? 0.8 : 1,
					}}
				>
					Play
				</h1>
			</div>

			<Entity>
				<Entity name="camera" position={[0, 0, 5]}>
					<Camera fov={45} />
					<StaticPostEffects />
					<MotionLight intensity={hovered ? 1.3 : 0.3} />
				</Entity>

				{/* Create some environment lighting */}
				<Entity>
					<Light type="directional" />
				</Entity>

				{/* Create some additional lighting */}
				<Entity rotation={[0, -45, 23, 0] as [number, number, number, number]}>
					<MotionLight intensity={hovered ? 1.3 : 0.3} color="red" />
				</Entity>
				<Entity rotation={[0, -45, -23, 0] as [number, number, number, number]}>
					<MotionLight intensity={hovered ? 1.3 : 0.3} color="blue" />
				</Entity>

				{/* Create a capsule buttons that animates when hovered */}
				<MotionEntity
					name="button"
					onPointerOver={onPointerOver}
					onPointerOut={onPointerOut}
					animate={{ rotation, scale }}
				>
					<Render type="capsule" />

					{/* Create a decoration that animates when hovered */}
					<MotionEntity
						name="decoration"
						scale={[0, 0, 0] as [number, number, number]}
						animate={{
							scale: hovered
								? ([0.5, 0.5, 0.5] as [number, number, number])
								: ([0, 0, 0] as [number, number, number]),
							position: hovered
								? ([0, 0, 0] as [number, number, number])
								: ([0, 0, -1] as [number, number, number]),
						}}
					>
						<MouseRotation />
						<Entity
							position={[2, 1.9, -1]}
							rotation={[23, -34, 45, 0] as [number, number, number, number]}
							scale={[0.8, 0.8, 0.8] as [number, number, number]}
						>
							<Render type="box" />
						</Entity>
						<Entity
							position={[-2, -1.8, -1]}
							rotation={[43, 34, 0, 0] as [number, number, number, number]}
							scale={[0.8, 0.8, 0.8] as [number, number, number]}
						>
							<Render type="torus" />
						</Entity>
						<Entity
							position={[1.9, 0, -3]}
							scale={[0.8, 0.8, 0.8] as [number, number, number]}
						>
							<Render type="sphere" />
						</Entity>
						<Entity
							position={[-1.9, 0, -1]}
							scale={[0.8, 0.8, 0.8] as [number, number, number]}
						>
							<Render type="cone" />
						</Entity>
					</MotionEntity>
				</MotionEntity>
			</Entity>
		</>
	);
};

export default function Page() {
	return <Example />;
}
