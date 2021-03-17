export default function(ctx, dot, mode, color) {
	let endColor = "#83BA73",
		endPortal = "#061914"

	let x = dot.x - dot.r,
		y = dot.y - dot.r,
		s = dot.r*2,
		b = s / 5

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