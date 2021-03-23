import { getColor, clamp } from "../classes/global"
export default {
	fontSize(s, scale) {
		return clamp(s / scale * 5, s, s*3)
	},
	hitbox(dot, {w, h, scale, ctx}) {
		let s = dot.size,
			fontSize = this.fontSize(s, scale)

		let x = dot.nether[0] + w/2,
			y = dot.nether[1] + h/2

		ctx.font = fontSize + "px JetBrains Mono";
		let textSize = ctx.measureText(dot.title)
		return [
			// Dot
			{
				w: s,
				h: s,
				x: x - s/2,
				y: y - s/2,
			},

			// Text
			{
				w: textSize.width,
				h: fontSize,
				x: x - textSize.width/2,
				y: y - s/2 - fontSize
			}
		]
	},
	draw(dot, {w, h, scale, ctx}, hover) {
		let x = dot.nether[0] + w/2,
			y = dot.nether[1] + h/2,
			s = dot.size,
			fontSize = this.fontSize(s, scale)

		let mod = hover ? "fill" : "stroke"

		ctx.lineWidth = .5
		ctx.strokeStyle = ctx.fillStyle = getColor(dot.branch)
		ctx.beginPath()
		ctx.arc(x, y, (s-ctx.lineWidth)/2, 0, 6.29)
		ctx.closePath()
		ctx.stroke()
		if (hover)
			ctx.fill()
		ctx.fillStyle = getColor("text")
		ctx.font = fontSize + "px JetBrains Mono"
		ctx.textAlign = "center"
		ctx.fillText(dot.title, x, y - s/2)
	}
}