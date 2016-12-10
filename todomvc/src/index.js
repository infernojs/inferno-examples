import Inferno from 'inferno';
import Component from 'inferno-component';
import { ENTER, filters, read } from './share';
import { Item, itemSCU } from './item';
import { Head, Foot } from './base';
import Model from './model';

const model = new Model();

class App extends Component {
	constructor(args) {
		super(args);

		// re-render on `inform()`
		model.sub(this.setState.bind(this, {}));

		this.add = this.add.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.clearCompleted = this.clearCompleted.bind(this);
	}

	update(arr) {
		this.setState({todos: arr});
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

	add(ev) {
		if (ev.which !== ENTER) return;

		const val = ev.target.value.trim();
		if (val) {
			model.add(val);
			ev.target.value = '';
		}
	}

	focus(todo) {
		this.setState({editing: todo.id});
	}

	save(todo, val) {
		this.setState({editing: 0});
		model.save(todo, val);
	}

	remove(todo) {
		model.del(todo);
	}

	toggleOne(todo) {
		model.toggleOne(todo);
	}

	toggleAll(ev) {
		model.toggleAll(ev.target.checked);
	}

	clearCompleted() {
		model.clearCompleted();
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
				<Head onEnter={ this.add } />

				{ num ? (
					<section className="main">
						<input className="toggle-all" type="checkbox"
							onClick={ this.toggleAll } checked={ numAct === 0 }
						/>

						<ul className="todo-list">
							{
								shown.map(function (t) {
									return (
										<Item data={t}
											doSave={ self.save.bind(self, t) }
											doFocus={ self.focus.bind(self, t) }
											doRemove={ self.remove.bind(self, t) }
											doToggle={ self.toggleOne.bind(self, t) }
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
					<Foot onClear={ this.clearCompleted }
						left={numAct} done={numDone} route={state.route}
					/>
				) : null }
			</div>
		)
	}
}

Inferno.render(<App />, document.getElementById('app'));
