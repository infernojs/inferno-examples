import { assign, isEqual } from './share';

const STOR = window.localStorage;
const STOR_ID = 'todos-inferno';

export default class Model {
	get() {
		return (this.data = JSON.parse(STOR.getItem(STOR_ID) || '[]'));
	}

	set(arr) {
		this.data = arr || this.data || [];
		STOR.setItem(STOR_ID, JSON.stringify(this.data));
		return this.data;
	}

	add(str) {
		return this.set(
			this.data.concat({title: str, completed: false})
		);
	}

	put(todo, obj) {
		return this.set(
			this.data.map(function (t) {
				return isEqual(t, todo) ? assign(todo, obj) : t;
			})
		);
	}

	del(todo) {
		return this.set(
			this.data.filter(function (t) {
				return !isEqual(t, todo);
			})
		);
	}

	toggle(todo) {
		return this.put(todo, {completed: !todo.completed});
	}

	toggleAll(bool) {
		return this.set(
			this.data.map(function (t) {
				return assign(t, {completed: bool});
			})
		);
	}

	clearCompleted() {
		return this.set(
			this.data.filter(function (t) {
				return !t.completed;
			})
		);
	}
}
