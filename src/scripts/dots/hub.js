import { getColor } from "../classes/global"
export default {
	hitbox(dot, {w, h, scale, ctx}) {
		let s = dot.size

		let x = dot.nether[0] + w/2,
			y = dot.nether[1] + h/2
		return [{
			w: s,
			h: s,
			x: x - s/2,
			y: y - s/2,
		}]
	},
	draw(dot, {w, h, scale, ctx}, hover) {
		let x = dot.nether[0] + w/2,
			y = dot.nether[1] + h/2,
			s = dot.size

		let mod = hover ? "fill" : "stroke"

		ctx.lineWidth = s / 8
		ctx.strokeStyle = ctx.fillStyle = getColor(dot.branch)
		ctx.beginPath()
		ctx.arc(x, y, (s-ctx.lineWidth)/2, 0, 6.29)
		ctx.closePath()
		ctx.stroke()
		if (hover)
			ctx.fill()
	}
}