import { getColor } from "./global"
import Dots from "../dots"


class IElement {
	draw() {}
	isHover() {return false}
	isInViewBox(viewBox) {throw "isInViewBox() is not defined"}
}

export class Dot extends IElement {
	constructor(dot) {
		super()
		Object.keys(dot).forEach(key => {
			this[key] = dot[key]
		})
		this.size = sizeFromType(this.type)
		this.dot = Dots[this.type]
	}
	draw({ctx, w, h, scale}, hover) {
		let x = this.nether[0] + w/2,
			y = this.nether[1] + h/2


		if (this.dot) {
			let config = {w, h, scale, ctx}
			this.dot.draw(this, config, hover)
		}
		else {
			ctx.fillStyle = getColor(this.branch)
			ctx.fillRect(x - this.size/2, y - this.size/2, this.size, this.size)
		}
	}
	isHover(mouse, {w, h, scale, ctx}) {
		if (this.dot) {
			this.hitbox = this.dot.hitbox(this, {w, h, scale, ctx})

			ctx.lineWidth = 1 / scale
			ctx.strokeStyle = "blue"

			// hitbox
			// this.hitbox.forEach(hitbox => ctx.strokeRect(hitbox.x, hitbox.y, hitbox.w, hitbox.h))

			if (this.dot.isHover) return this.dot.isHover(mouse, this.hitbox)
			for (let i = 0; i < this.hitbox.length; i++) {
				let hitbox = this.hitbox[i];
				let hit = isDotInRect(mouse, {
					x: hitbox.x - w/2,
					y: hitbox.y - h/2,
					w: hitbox.w,
					h: hitbox.h,
				})
				if (hit) return hit
			}
		}

		if (!this.hitbox) return false
	}
	isInViewBox(viewBox, {w, h}) {
		return isDotInRect({
			x: this.nether[0] + w/2,
			y: this.nether[1] + h/2
		}, viewBox)
	}
}
function sizeFromType(type) {
	switch (type) {
		case "town": return 3
		case "city": return 4
		case "hub": return 16
		default: return 4
	}
}

function isDotInRect(dot, rect) {
	return  dot.x > rect.x &&
			dot.y > rect.y &&
			dot.x < rect.x + rect.w &&
			dot.y < rect.y + rect.h
}