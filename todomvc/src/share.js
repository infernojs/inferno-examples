/**
 * Shared funcs/values
 */

export const ENTER = 13;
export const ESCAPE = 27;

export const filters = {
	all: function () {
		return true;
	},
	active: function (t) {
		return !t.completed;
	},
	completed: function (t) {
		return t.completed;
	}
};

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

export function uuid() {
	let random, i, uuid = '';
	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
	}
	return uuid;
}

export function pluralize(num, str) {
	return num === 1 ? str : `${str}s`;
}

/**
 * Are two Objects equal values?
 * @param  {Object} a
 * @param  {Object} b
 * @return {Boolean}
 */
// export function isEqual(a, b) {
// 	// Create arrays of property names
// 	const aProps = Object.getOwnPropertyNames(a);
// 	const bProps = Object.getOwnPropertyNames(b);

// 	if (aProps.length !== bProps.length) return false;

// 	for (let i = 0; i < aProps.length; i++) {
// 		const k = aProps[i];
// 		if (a[k] !== b[k]) return false;
// 	}

// 	return true;
// }
