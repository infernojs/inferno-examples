/**
 * Shared funcs/values
 */

export const ENTER = 13;
export const ESCAPE = 27;

/**
 * Modified `Object.assign` shim
 * - always writes to new object
 * @return {Object}
 */
export function assign() {
	let src;
	let tar = {};
	for (let s = 0; s < arguments.length; s++) {
		src = Object(arguments[s]);
		for (const k in src) {
			tar[k] = src[k];
		}
	}
	return tar;
}

/**
 * Are two Objects equal values?
 * @param  {Object} a
 * @param  {Object} b
 * @return {Boolean}
 */
export function isEqual(a, b) {
	// Create arrays of property names
	const aProps = Object.getOwnPropertyNames(a);
	const bProps = Object.getOwnPropertyNames(b);

	if (aProps.length !== bProps.length) return false;

	for (let i = 0; i < aProps.length; i++) {
		const k = aProps[i];
		if (a[k] !== b[k]) return false;
	}

	return true;
}
