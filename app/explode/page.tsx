// @ts-nocheck
"use client";

import { Entity } from "@playcanvas/react";
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
import { Color, EVENT_MOUSEDOWN, Script as PcScript, Vec3 } from "playcanvas";
import { StaticPostEffects } from "../../utils/PostEffect";
import { useEnvAtlas } from "../../utils/hooks";

// 爆発を制御するスクリプト
class ExplosionController extends PcScript {
	initialize() {
		this.app.mouse?.on(EVENT_MOUSEDOWN, this.onMouseDown, this); // マウスダウンイベントのハンドラ
		this.timeScaleTarget = 1; // タイムスケールの目標値
		this.timeScaleChangeRate = 0.007; // タイムスケールの変化率
		this.isExploding = false; // 爆発中かどうかを示すフラグ

		// コンテキストメニューを無効化
		if (this.app.mouse) {
			this.app.mouse.disableContextMenu();
		}
	}

	update(dt) {
		// ... (update メソッドの内容は変更なし)
		if (this.isExploding && this.app.timeScale > this.timeScaleTarget) {
			this.app.timeScale -= this.timeScaleChangeRate;
			if (this.app.timeScale <= this.timeScaleTarget) {
				this.app.timeScale = this.timeScaleTarget;
				this.isExploding = false;
			}
		}
	}

	onMouseDown(event: { button: number }) {
		this.explode(event.button === 2); // 右クリック(button === 2)ならtrueを渡す
	}

	explode(reverse: boolean) {
		// ... (explode メソッドの内容は変更なし)
		const explosionForce = 1;
		const explosionRadius = 12;
		const rigidbodies = this.app.root.findComponents("rigidbody");

		rigidbodies.forEach((rigidbody) => {
			if (rigidbody) {
				const direction = new Vec3();
				const entityPos = rigidbody.entity.getPosition();
				const thisPos = this.entity.getPosition();
				direction.sub2(entityPos, thisPos);
				const distance = direction.length();

				if (distance < explosionRadius) {
					direction.normalize();
					let force = (1 - distance / explosionRadius) * explosionForce;
					if (reverse) {
						force *= -1;
					}
					direction.mulScalar(force);
					rigidbody.applyImpulse(direction);

					const material = rigidbody.entity?.render?.material;
					if (material) {
						const newMaterial = material.clone();

						const h = Math.random();
						const s = 0.8 + Math.random() * 0.2;
						const v = 0.8 + Math.random() * 0.2;

						const c = v * s;
						const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
						const m = v - c;
						let r, g, b;

						if (h < 1 / 6) {
							r = c;
							g = x;
							b = 0;
						} else if (h < 2 / 6) {
							r = x;
							g = c;
							b = 0;
						} else if (h < 3 / 6) {
							r = 0;
							g = c;
							b = x;
						} else if (h < 4 / 6) {
							r = 0;
							g = x;
							b = c;
						} else if (h < 5 / 6) {
							r = x;
							g = 0;
							b = c;
						} else {
							r = c;
							g = 0;
							b = x;
						}

						const emissiveColor = new Color(r + m, g + m, b + m);

						newMaterial.emissive = emissiveColor;
						newMaterial.emissiveIntensity = 2;
						newMaterial.update();
						rigidbody.entity.render.material = newMaterial;
					}
				}
			}
		});

		this.timeScaleTarget = 0.15;
		this.app.timeScale = 1.0;
		this.isExploding = true;
	}
}

// ... (その他のコンポーネントは変更なし)

// 爆発可能なオブジェクトを生成する関数
const ExplodableObject = ({
	position,
	scale = 0.5,
}: {
	position: [number, number, number];
	scale: number;
}) => {
	// マテリアルの設定 (初期マテリアルはシンプルに)
	const matA = useMaterial({
		diffuse: new Color(0.75, 0.63, 0.63),
		metalness: 0.2, // 金属っぽさを少し下げる
		shininess: 30, // 光沢を少し下げる
	});

	return (
		<Entity position={position} name="explodable" scale={[scale, scale, scale]}>
			<Render type="box" material={matA} />
			<RigidBody
				type="dynamic"
				mass={0.1}
				linearDamping={0.1}
				angularDamping={0.1}
				friction={0.95}
				restitution={0.3}
			/>
			<Collision type="sphere" radius={0.5} />
		</Entity>
	);
};

// スイッチコンポーネント
const Switch = () => {
	return (
		<Entity position={[0, 0.5, 0]}>
			<Script script={ExplosionController} />
		</Entity>
	);
};

// メインシーン
export default function BombScene() {
	const app = useApp();

	const { data: envMap, isPending: isEnvLoading } = useEnvAtlas(
		"./environment-map.png",
	);

	if (app) {
		app.systems.rigidbody.gravity.set(0, 0, 0);
	}

	return (
		<>
			<EnvAtlas asset={envMap} showSkybox={false} />

			{/* カメラ */}
			<Entity position={[0, -25, 0]} rotation={[90, 0, 0]}>
				<Camera clearColor={new Color(0.1, 0.1, 0.1)} />
				<StaticPostEffects />
			</Entity>

			{/* ライト */}
			<Entity position={[0, 10, 0]} rotation={[180, 0, 0]}>
				<Light type="directional" />
			</Entity>

			{/* 地面 */}
			<Entity position={[0, 0, 0]} scale={[100, 0.2, 100]}>
				{/* <Render type="box" /> */}
				<Collision type="box" halfExtents={new Vec3(100, 0.2, 100)} />
				<RigidBody type="static" />
			</Entity>

			{/* スイッチ */}
			<Switch />

			{/* 爆発の影響を受けるオブジェクト */}
			{[...Array(250)].map((_, i) => {
				const x = (Math.random() - 0.5) * 20;
				const y = Math.random() * 6 + 1;
				const z = (Math.random() - 0.5) * 15;
				return (
					<ExplodableObject
						key={i}
						position={[x, y, z]}
						scale={Math.random() * 0.5 + 0.5}
					/>
				);
			})}
		</>
	);
}
