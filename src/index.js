import Hammer from "./scripts/hammer"
import Map from "./scripts/classes/Map"
import Information from "./scripts/classes/Information"

let map, info
(async () => {
	let data = await fetch("data.json").then(r => r.json())
	map = new Map(data)
	info = new Information()
	map.info = info

	if (window.matchMedia) {
		if(window.matchMedia('(prefers-color-scheme: dark)').matches)
			document.documentElement.classList.add("page--dark")
	}
})()
