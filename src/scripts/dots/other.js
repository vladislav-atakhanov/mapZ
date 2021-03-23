import { getColor, clamp } from "../classes/global"
export default {
	alpha: 0,
	hitbox(dot, {w, h, scale, ctx}) {
		let s = dot.size

		let x = dot.nether[0] + w/2,
			y = dot.nether[1] + h/2

		return [
			// Dot
			{
				w: s,
				h: s,
				x: x - s/2,
				y: y - s/2,
			}
		]
	},
	draw(dot, {w, h, scale, ctx}, hover) {
		let x = dot.nether[0] + w/2,
			y = dot.nether[1] + h/2,
			s = dot.size

		let mod = hover ? "fill" : "stroke"

		let alpha = this.alpha


		ctx.lineWidth = .5
		ctx.strokeStyle = ctx.fillStyle = getColor(dot.branch)
		ctx.beginPath()
		ctx.moveTo(
			x + Math.cos(alpha) * s/2,
			y + Math.sin(alpha) * s/2
		)
		ctx.lineTo(
			x + Math.cos(alpha + Math.PI/2) * s/2,
			y + Math.sin(alpha + Math.PI/2) * s/2
		)
		ctx.lineTo(
			x + Math.cos(alpha - Math.PI) * s/2,
			y + Math.sin(alpha - Math.PI) * s/2
		)
		ctx.lineTo(
			x + Math.cos(alpha - Math.PI/2) * s/2,
			y + Math.sin(alpha - Math.PI/2) * s/2
		)
		ctx.closePath()
		ctx.stroke()
		if (hover)
			ctx.fill()
	}
}