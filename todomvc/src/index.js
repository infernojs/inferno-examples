import Inferno from 'inferno';
import Component from 'inferno-component';
import { ENTER, filters, read } from './share';
import { Item, itemSCU } from './item';
import { Head, Foot } from './base';
import Model from './model';

const model = new Model();

function toggleOne(todo) {
	model.toggleOne(todo);
}

function toggleAll(e) {
	model.toggleAll(e.target.checked);
}

function clearCompleted() {
	model.clearCompleted();
}

function addTodo(e) {
	if (e.which !== ENTER) return;
	const val = e.target.value.trim();
	if (val) {
		model.add(val);
		e.target.value = '';
	}
}

function removeTodo(todo) {
	model.del(todo);
}

class App extends Component {
	constructor(args) {
		super(args);
		// re-render on `inform()`
		model.sub(this.setState.bind(this, {}));
		this.focus = this.focus.bind(this);
		this.save = this.save.bind(this);
	}

	setRoute() {
		this.setState({
			route: String(location.hash || '').split('/').pop() || 'all'
		});
	}

	componentWillMount() {
		// handle hash-route changes
		addEventListener('hashchange', this.setRoute.bind(this));
		// find curr route
		this.setRoute();
	}

	save(todo, val) {
		this.setState({editing: 0});
		model.save(todo, val);
	}

	focus(todo) {
		this.setState({editing: todo.id});
	}

	render(_, state) {
		const todos = model.data;

		const self = this;
		const num = todos.length;
		const shown = todos.filter(filters[state.route]);
		const numDone = todos.filter(filters.completed).length;
		const numAct = num - numDone;

		return (
			<div>
				<Head onEnter={ addTodo } />

				{ num ? (
					<section className="main">
						<input className="toggle-all" type="checkbox"
							onClick={ toggleAll } checked={ numAct === 0 }
						/>

						<ul className="todo-list">
							{
								shown.map(function (t) {
									return (
										<Item data={t}
											doSave={ self.save } doFocus={ self.focus }
											doRemove={ removeTodo } doToggle={ toggleOne }
											onComponentShouldUpdate={ itemSCU }
											editing={ t.id === state.editing }
										/>
									);
								})
							}
						</ul>
					</section>
				) : null }

				{ (numAct || numDone) ? (
					<Foot onClear={ clearCompleted }
						left={numAct} done={numDone} route={state.route}
					/>
				) : null }
			</div>
		)
	}
}

Inferno.render(<App />, document.getElementById('app'));
