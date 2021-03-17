import { Map } from "./Map"

import { Dot } from "./elements"

export default class SPBedrockMap extends Map {
	constructor(data) {
		let el = document.querySelector(".map")
		super(el.querySelector(".map__canvas"))
		this.el = el


		this.mousePosEl = el.querySelector(".map__mouse")

		this.setSize(innerWidth, innerHeight)

		this.data = data
		this.dots = data.dots.map(d => new Dot(d))

		this._draw(this)
	}
	_draw() {
		this.draw()
		requestAnimationFrame(this._draw.bind(this))
	}
	draw() {
		let ctx = this.ctx,
			w = this.width,
			h = this.height

		this.clear("bg")

		let hover
		this._drawing()

		this.drawing.forEach(d => {
			d.draw({ctx, w, h, scale: this.scale})
			let isHover = d.isHover(this.mouse, {w, h})
			if (isHover) hover = d
		})

		this.mouse.target = hover
		this.el.style.cursor = hover ? "pointer" : "default"
		if (hover)
			hover.drawHover({ctx, h, w, scale: this.scale})

		this.drawMouse()
	}
	_drawing() {
		let w = this.width,
			h = this.height
		this.drawing = this.dots.filter(dot => dot.isInViewBox(this.viewBox, {w, h}))
	}
}

SPBedrockMap.prototype.grid = function() {
	let ctx = this.ctx,
		w = this.width,
		h = this.height

	let count = 1000
	let step = 100
	let length = count * step

	function line(a, b) {
		ctx.beginPath()
		ctx.moveTo(a[0], a[1])
		ctx.lineTo(b[0], b[1])
		ctx.closePath()
		ctx.stroke()
	}

	ctx.strokeStyle = "gray"
	ctx.lineWidth = 1
	for (let i = -count*step/2; i < count*step/2; i += step) {
		line(
			[i + w/2, h/2-length/2],
			[i + w/2, h/2+length/2]
		)
		line(
			[w/2-length/2, i + h/2],
			[w/2+length/2, i + h/2]
		)
	}
	ctx.strokeStyle = getColor("text")
	ctx.lineWidth = 2
	line(
		[w/2, h/2-length/2],
		[w/2, h/2+length/2]
	)
	line(
		[w/2-length/2, h/2],
		[w/2+length/2, h/2]
	)
}