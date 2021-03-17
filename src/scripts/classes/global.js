export function clamp(value, min, max) {
	if (value < min) return min
	if (value > max) return max
	return value
}

export function getColor(color) {
	return getComputedStyle(document.documentElement).getPropertyValue("--"+color) || color
}