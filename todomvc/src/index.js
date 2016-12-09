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
		this.state = {
			route: read(),
			todos: model.get()
		};
	}

	update(arr) {
		this.setState({todos: arr});
	}

	componentWillMount() {
		window.onhashchange = function () {
			this.setState({route: read()});
		}.bind(this);
	}

	add(ev) {
		if (ev.which !== ENTER) return;

		const val = ev.target.value.trim();
		if (!val) return;

		ev.target.value = '';

		this.update(
			model.add(val)
		);
	}

	save(todo, val) {
		val = val.trim();

		if (!val) {
			return this.remove(todo);
		}

		this.update(
			model.put(todo, {title: val, editing: 0, text: val})
		);
	}

	edit(todo, val) {
		this.update(
			model.put(todo, {editing: 1, text: val})
		);
	}

	remove(todo) {
		this.update(
			model.del(todo)
		);
	}

	toggleOne(todo) {
		this.update(
			model.toggle(todo)
		);
	}

	toggleAll(ev) {
		this.update(
			model.toggleAll(ev.target.checked)
		);
	}

	clearCompleted() {
		this.update(
			model.clearCompleted()
		);
	}

	render(_, state) {
		const self = this;
		const num = state.todos.length;
		const shown = state.todos.filter(filters[state.route]);
		const numDone = state.todos.filter(filters.completed).length;
		const numAct = num - numDone;

		return (
			<div>
				<Head onEnter={ self.add.bind(self) } />

				{ num ? (
					<section className="main">
						<input className="toggle-all" type="checkbox"
							onClick={ self.toggleAll.bind(self) } checked={ numAct === 0 }
						/>

						<ul className="todo-list">
							{
								shown.map(function (t) {
									return (
										<Item data={t}
											onComponentShouldUpdate={ itemSCU }
											doEdit={ self.edit.bind(self, t) }
											doSave={ self.save.bind(self, t) }
											doRemove={ self.remove.bind(self, t) }
											doToggle={ self.toggleOne.bind(self, t) }
										/>
									);
								})
							}
						</ul>
					</section>
				) : null }

				{ (numAct || numDone) ? (
					<Foot onClear={ self.clearCompleted.bind(self) }
						left={numAct} done={numDone} route={state.route}
					/>
				) : null }
			</div>
		)
	}
}

Inferno.render(<App />, document.getElementById('app'));
