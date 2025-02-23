"use client";
import { Container, Entity } from "@playcanvas/react";
import { Camera, EnvAtlas, Light } from "@playcanvas/react/components";
import { OrbitControls } from "@playcanvas/react/scripts";
import { Color } from "playcanvas";
import { useEnvAtlas, useModel } from "../../utils/hooks";

const Scene = () => {
	const { data: envMap, isPending: isEnvLoading } = useEnvAtlas(
		"./environment-map.png",
	);
	const { data: model, isPending: isModeLoading } = useModel("./guitar.glb", {
		autoRelease: true,
	});

	if (isEnvLoading || isModeLoading || !envMap || !model) return null;
	return (
		<>
			<EnvAtlas asset={envMap} />
			<Entity name="light" rotation={[45, 45, 0]}>
				{/* @ts-ignore */}
				<Light type="directional" color={Color.WHITE} />
			</Entity>
			<Entity name="camera" position={[0, 0.5, 2]}>
				<Camera clearColor="#ccccff" />
				<OrbitControls inertiaFactor={0.6} distanceMin={1.4} />
			</Entity>
			<Entity name="model">
				<Container name="guitar" asset={model} />
			</Entity>
		</>
	);
};

export default Scene;
