import { assign, uuid } from './share';

const STOR_ID = 'todos-inferno';

function store(data) {
	if (data) return localStorage[STOR_ID] = JSON.stringify(data);
	const store = localStorage[STOR_ID];
	return store && JSON.parse(store) || [];
}

export default class Model {
	constructor() {
		this.data = store() || [];
		this.onChanges = [];
	}

	sub(fn) {
		this.onChanges = this.onChanges.concat(fn);
	}

	inform() {
		store(this.data);
		this.onChanges.forEach(function (fn) {
			fn();
		});
	}

	add(str) {
		this.data = this.data.concat({
			id: uuid(),
			title: str,
			completed: false
		});
		this.inform();
	}

	put(todo, obj) {
		this.data = this.data.map(function (t) {
			return t !== todo ? t : assign(todo, obj);
		});
		this.inform();
	}

	save(todo, str) {
		this.put(todo, {title: str});
	}

	del(todo) {
		this.data = this.data.filter(function (t) {
			return t !== todo;
		});
		this.inform();
	}

	toggleOne(todo) {
		this.put(todo, {completed: !todo.completed});
	}

	toggleAll(bool) {
		this.data = this.data.map(function (t) {
			return assign(t, {completed: bool});
		});
		this.inform();
	}

	clearCompleted() {
		this.data = this.data.filter(function (t) {
			return !t.completed;
		});
		this.inform();
	}
}
