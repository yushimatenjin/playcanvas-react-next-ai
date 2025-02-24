"use client";

import { Script } from "@playcanvas/react/components";
import { EVENT_MOUSEMOVE, Script as PcScript, Vec2 } from "playcanvas";

export const MouseRotation = () => {
	/**
	 * This is a script that rotates the entity based on the mouse position.
	 * It uses a motion value to animate the rotation of the entity,
	 * and then uses an imperative script to update the rotation of the entity.
	 */
	class MouseRotatesEntity extends PcScript {
		t: Vec2;
		c: Vec2;
		initialize() {
			this.t = new Vec2();
			this.c = new Vec2();
			this.app.mouse.on(EVENT_MOUSEMOVE, (e) => {
				this.t.set(e.x, e.y).mulScalar(2).subScalar(1).divScalar(20);
			});
		}

		update(dt) {
			this.c.lerp(this.c, this.t, 0.4 * dt);
			this.entity.setEulerAngles(this.c.y, this.c.x, 0);
		}
	}
	return <Script script={MouseRotatesEntity} />;
};
