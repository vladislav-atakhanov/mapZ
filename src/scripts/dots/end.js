export default {
	hitbox(dot, {w, h, scale, ctx}) {
		let s = dot.size
		ctx.font = s + "px JetBrains Mono";
		let textSize = ctx.measureText(dot.title)
		return [
			{
				w: s,
				h: s,
				x: dot.nether[0] + w/2 - s/2,
				y: dot.nether[1] + h/2 - s/2,
			}
		]
	},
	draw(dot, {w, h, scale, ctx}, hover) {
		let s = dot.size,
			x = dot.nether[0] + w/2 - s/2,
			y = dot.nether[1] + h/2 - s/2,
			b = s / 5

		let mode = hover ? "fill" : "stroke"

		let endColor = "#83BA73",
		endPortal = "#061914"

		ctx.strokeStyle = endColor

		let horizontal = [x, y+b, b*5, b*3]
		let vertical = [x+b, y, b*3, b*5]

		ctx.strokeRect(...horizontal)
		ctx.strokeRect(...vertical)

		if (mode == "fill") {
			ctx.fillStyle = endColor
			ctx.fillRect(...horizontal)
			ctx.fillRect(...vertical)

			ctx.fillStyle = endPortal
			ctx.fillRect(x+b, y+b, b*3, b*3)
		}
	}
}