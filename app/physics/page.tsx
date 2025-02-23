// @ts-nocheck
"use client";

import {  Entity } from "@playcanvas/react";
import {
	Camera,
	Collision,
	EnvAtlas,
	Light,
	Render,
	RigidBody,
	Script,
} from "@playcanvas/react/components";
import { useApp, useMaterial } from "@playcanvas/react/hooks";
import { motion } from "motion/react";
import {
	CameraComponent,
	Color,
	EVENT_MOUSEMOVE,
	EVENT_TOUCHMOVE,
	Script as PcScript,
	StandardMaterial,
	Vec2,
	Vec3,
} from "playcanvas";
import type React from "react";
import { useState } from "react";
import { StaticPostEffects } from "../../utils/PostEffect";
import { useEnvAtlas } from "../../utils/hooks";
import { NUM_SHAPES, SHAPES, rand } from "./utils/constants";

interface ShapeColliderProps {
	children: React.ReactNode;
	scale?: number;
	material?: StandardMaterial
	type?: "sphere" | "capsule";
	hide?: boolean;
	position?: [number, number, number];
}

const ShapeCollider: React.FC<ShapeColliderProps> = ({
	children,
	scale = 1,
	material,
	type = "sphere",
	hide = false,
	...props
}) => (
	<Entity {...props} scale={[scale, scale, scale]}>
		{children}
		{!hide && <Render type={type} material={material} />}
		<Collision type={type} radius={scale * 0.5} />
	</Entity>
);

const Physics = () => {
	const [isActive, setIsActive] = useState(true);
	const app = useApp();
	const { data: envMap, isPending: isEnvLoading } = useEnvAtlas(
		"./environment-map.png",
	);

	// マテリアルの設定
	const matA = useMaterial({
		diffuse: new Color(0.75, 0.63, 0.63),
		emissive: new Color(1, 0, 0)
	});
	const matB = useMaterial({
		diffuse: new Color(0.63, 0.75, 0.63),
		emissive: new Color(0, 1, 0)
	});
	const matC = useMaterial({
		diffuse: new Color(0.63, 0.63, 0.75),
		emissive: new Color(0, 0, 1)
	});
	const materials = [matA, matB, matC];

	// // 重力を無効化
	app.systems.rigidbody.gravity.set(0, 0, 0);

	const tmpVec = new Vec3();
	const tmpVec2 = new Vec3();
	const swirl = new Vec3();

	class MoverScript extends PcScript {
		scale = 1;
		update(dt) {
			const delta = Math.min(0.1, dt);

			// Get the current position vector
			tmpVec.copy(this.entity.getLocalPosition()).normalize();

			// Create a perpendicular vector for swirling (cross product with up vector)
			swirl.cross(tmpVec, Vec3.RIGHT).mulScalar(0.4);

			// Combine radial and tangential forces
			tmpVec2.set(
				(-20 * tmpVec.x + 40 * swirl.x) * delta * this.scale,
				-50 * tmpVec.y * delta * this.scale,
				(-20 * tmpVec.z + 40 * swirl.z) * delta * this.scale,
			);

			this.entity.rigidbody?.applyImpulse(tmpVec2);
		}
	}

	class FollowPointerScript extends PcScript {
		pointer = new Vec3();

		initialize() {
			// Get the camera
			const [activeCamera] = this.app.root
				.findComponents("camera")
				.filter((camera) => !camera.renderTarget)
				.sort((a, b) => a.priority - b.priority);

			const onPointerMove = (e) => {
				const dist = activeCamera.entity.getPosition().z;
				activeCamera.screenToWorld(e.x, e.y, dist, this.pointer);
			};

			this.app.mouse?.on(EVENT_MOUSEMOVE, onPointerMove);
			this.app.touch?.on(EVENT_TOUCHMOVE, onPointerMove);
		}

		update(dt) {
			this.entity.setLocalPosition(
				this.pointer.x,
				this.pointer.y,
				this.pointer.z,
			);
		}
	}

	return (
		<>
			<Entity>
				<EnvAtlas asset={envMap} showSkybox={false} />

				<Entity name="camera" position={[0, 0, 20]}>
					<Camera clearColor={new Color(1, 0.75, 0.75)} fov={32.5} />
					<StaticPostEffects />
					<Light type="directional" />
				</Entity>

				<ShapeCollider type="sphere" hide>
					<Script script={FollowPointerScript} />
					<RigidBody type="kinematic" />
				</ShapeCollider>

				{SHAPES.map(({ scale }, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: i * 0.02, duration: 0.5 }}
					>
						<ShapeCollider
							type={Math.random() > 0.2 ? "sphere" : "capsule"}
							position={[rand(40), rand(40) - 50, rand(40) - 20]}
							scale={scale}
							material={materials[i % materials.length]}
						>
							<Script script={MoverScript} scale={scale * 0.3} />
							<RigidBody
								type="dynamic"
								linearDamping={0.75}
								angularDamping={0.9}
								friction={0.9}
							/>
						</ShapeCollider>
					</motion.div>
				))}
			</Entity>
		</>
	);
};

export default function Page() {
	return <Physics />;
}
