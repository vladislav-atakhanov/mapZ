import Hammer from "./scripts/hammer.js"
import SPBedrockMap from "./scripts/classes/SPBedrockMap.js"
import Information from "./scripts/classes/Information.js"

let map, info
(async () => {
	let data = await fetch("data.json").then(r => r.json())
	map = new SPBedrockMap(data)
	info = new Information()
	map.info = info

	if (window.matchMedia) {
		if(window.matchMedia('(prefers-color-scheme: dark)').matches)
			document.documentElement.classList.add("page--dark")
	}
})()
