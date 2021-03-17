import { clamp, getColor } from "./global"

export class Canvas {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = this.canvas.getContext("2d")

		this.width = this.canvas.width
		this.height = this.canvas.height
	}
	setSize(width, height) {
		this.width = this.canvas.width = width
		this.height = this.canvas.height = height
	}
}

export class Map extends Canvas {
	constructor(canvas) {
		super(canvas)
		this.pos = {
			x: 0,
			z: 0
		}
		this.scale = 1
		this.mouse = {
			x: -this.width, y: -this.height
		}
		this.viewBox = {
			x: 0,
			y: 0,
			w: this.width / this.scale,
			h: this.height
		}
		this.init()
	}
	setSize(width, height) {
		super.setSize(width, height)
		this.viewBox.w = this.width / this.scale
		this.viewBox.h = this.height / this.scale
	}

	clear(color) {
		this.ctx.fillStyle = getColor(color)
		this.ctx.fillRect(this.viewBox.x, this.viewBox.y, this.viewBox.w, this.viewBox.h)
	}

	init() {

		this.mc = new Hammer.Manager(document.body)
		let pinch = new Hammer.Pinch()

		// add to the Manager
		this.mc.add([pinch]);


		this.mc.on("pinch", e => this.pinchEvent.call(this, e))
		this.mc.on("pinchend", e => this.pinchEndEvent.call(this, e))

		this.canvas.addEventListener("wheel", e => this.wheelEvent.call(this, e))
		this.canvas.addEventListener("pointermove", e => this.moveEvent.call(this, e))

		this.canvas.addEventListener("pointerdown", e => this.downEvent.call(this, e))
		this.canvas.addEventListener("pointerup", e => this.upEvent.call(this, e))

		this.canvas.onclick = this.clickEvent.bind(this)
		window.onresize = () => this.setSize(innerWidth, innerHeight)
	}
	move(x, y) {
        this.ctx.translate(-this.pos.x, -this.pos.z)

        this.pos.x += x
        this.pos.z += y

        this.ctx.translate(this.pos.x, this.pos.z)
		this.viewBox.x -= x
		this.viewBox.y -= y

        return this
    }

	_scale(zoom, x, y) {
		let min = 0.2,
			max = 20
		if (
			this.scale * zoom > max ||
			this.scale * zoom < min
		) return

		let ctx = this.ctx,
			w = this.width,
			h = this.height

		x = x ? x : w/2
		y = y ? y : h/2

		ctx.translate(this.viewBox.x, this.viewBox.y)

		this.viewBox.x -= x * (1 / zoom - 1) / this.scale
		this.viewBox.y -= y * (1 / zoom - 1) / this.scale

		ctx.scale(zoom, zoom)
		ctx.translate(-this.viewBox.x, -this.viewBox.y)

		this.scale *= zoom
		this.scale = clamp(this.scale, min, max)
		this.viewBox.w = w / this.scale
		this.viewBox.h = h / this.scale
	}

	_mouse(e) {
		let w = this.width,
			h = this.height,
			viewBox = this.viewBox

		this.mouse.x = viewBox.x + viewBox.w * e.clientX / w - w/2,
		this.mouse.y = viewBox.y + viewBox.h * e.clientY / h - h/2

	}
	drawMouse() {
		let	x = Math.round(this.mouse.x),
			y = Math.round(this.mouse.y)

		this.mousePosEl.innerText = `${x} ${y}`
	}
}

Map.prototype.wheelEvent = function(e) {
	e.preventDefault()

	e.preventDefault()
	let x = e.clientX - this.canvas.offsetLeft
	let y = e.clientY - this.canvas.offsetTop
	let scroll = e.deltaY < 0 ? 1 : -2

	this._scale(
		Math.exp(scroll * 0.05),
		x, y
	)
}

Map.prototype.downEvent = function(e) {
	this.mouseDownPos = {x: e.clientX, y: e.clientY}
	this.pointerDown = true
}
Map.prototype.upEvent = function(e) {
	this.pointerDown = false
	this.el.style.cursor = "default"
}
Map.prototype.moveEvent = function(e) {
	e.preventDefault()
	this._mouse.call(this, e)

	if (!this.pointerDown || this.isZoom) return

	this.move(
		(e.clientX - this.mouseDownPos.x) / this.scale,
		(e.clientY - this.mouseDownPos.y) / this.scale
	)
	this.mouseDownPos.x = e.clientX
	this.mouseDownPos.y = e.clientY
}


Map.prototype.pinchEvent = function(e) {

	let x1 = e.pointers[0].clientX, y1 = e.pointers[0].clientY,
		x2 = e.pointers[1].clientX, y2 = e.pointers[1].clientY

	let dx = x1 - x2,
		dy = y1 - y2
	let len = Math.sqrt(dx * dx + dy * dy)

	if (this.pinchLen !== undefined) {
		this._scale(
			1 - (this.pinchLen - len) / 50,
			(x1 + x2) / 2,
			(y1 + y2) / 2
		)
	}
	this.pinchLen = len
	this.isZoom = true
}

Map.prototype.pinchEndEvent = function(e) {
	this.pinchLen = undefined
	this.isZoom = false
}

Map.prototype.clickEvent = function() {
	if (!this.mouse.target) return
	this.info.showInformation(this.mouse.target)
}