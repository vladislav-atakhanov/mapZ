import { clamp, getColor } from "./global"
import Icons from "../icons"


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
		this.fontSize = scale => clamp(this.size / scale, this.size, this.size * 2)
	}
	draw({ctx, w, h, scale}) {

		let fontSize = this.fontSize(scale)
		let s = this.size

		let x = this.nether[0] + w/2,
			y = this.nether[1] + h/2

		let circle = this.circle = {
			x,
			y,
			r: s
		}

		ctx.lineWidth = clamp(1 / scale, 1 / scale, 2)
		this.drawBody(
			ctx,
			{
				x: circle.x,
				y: circle.y,
				r: s
			}, "stroke"
		)
	}
	drawBody(ctx, circle, mode="fill") {
		let type = this.type
		if (Icons[type]) {
			Icons[type](ctx, circle, mode, getColor(this.branch))
		} else {
			ctx[mode + "Style"] = getColor(this.branch)
			ctx.beginPath()
			ctx.arc(
				circle.x,
				circle.y,
				circle.r,
				0,
				6.284
			)
			ctx.closePath()
			ctx[mode]()
		}
	}
	drawHover({ctx, scale}) {
		let circle = this.circle

		this.drawBody(ctx, {
			x: circle.x,
			y: circle.y,
			r: circle.r
		})
	}
	drawTitle({ctx, fontSize, x, y}) {
		ctx.font = fontSize + "px JetBrains Mono, monospace"
		ctx.textAlign = "center"
		ctx.fillText(this.title[0], x, y)
	}
	isHover(mouse, {w, h}) {
		let r = this.circle.r
		return isDotInRect(
			mouse,
			{
				x: this.circle.x - w/2 - r,
				y: this.circle.y - h/2 - r,
				w: r*2,
				h: r*2
			}
		)
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
		case "end": return 2
		case "town": return 4
		case "city": return 5
		case "hub": return 6
		default: return 3
	}
}

function isDotInRect(dot, rect) {
	return  dot.x > rect.x &&
			dot.y > rect.y &&
			dot.x < rect.x + rect.w &&
			dot.y < rect.y + rect.h
}