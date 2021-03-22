import { Control } from "./Control"
import { Dot } from "./elements"

export default class Map extends Control {
	constructor(data) {
		let el = document.querySelector(".map")
		super(el.querySelector(".map__canvas"))
		this.el = el


		this.mousePosEl = el.querySelector(".map__mouse")

		this.setSize(innerWidth, innerHeight)

		this.data = data
		this.dots = data.dots.map(d => new Dot(d))

		this._draw(this)

		this._scale(2)
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
			let config = {ctx, w, h, scale: this.scale}
			let isHover = d.isHover(this.mouse, config)
			if (isHover) hover = d
			d.draw(config, isHover)
		})

		this.mouse.target = hover
		this.el.style.cursor = hover ? "pointer" : "default"
		this.drawMouse()
	}
	_drawing() {
		let w = this.width,
			h = this.height
		this.drawing = this.dots.filter(dot => dot.isInViewBox(this.viewBox, {w, h}))
	}
}