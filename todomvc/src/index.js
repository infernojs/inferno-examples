import Inferno from 'inferno';
import Component from 'inferno-component';
import { ENTER, filters, read } from './share';
import { Head, Foot } from './base';
import Model from './model';
import Item from './item';

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

	add(e) {
		if (e.which !== ENTER) return;

		const val = e.target.value.trim();
		if (!val) return;

		e.target.value = '';

		this.update(
			model.add(val)
		);
	}

	edit(todo, val) {
		val = val.trim();
		if (!val) {
			return this.remove(todo);
		}

		this.update(
			model.put(todo, {title: val, editing: 0})
		);
	}

	focus(todo) {
		this.update(
			model.put(todo, {editing: 1})
		);
	}

	blur(todo) {
		this.update(
			model.put(todo, {editing: 0})
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
											onBlur={ self.blur.bind(self, t) }
											onFocus={ self.focus.bind(self, t) }
											doDelete={ self.remove.bind(self, t) }
											doToggle={ self.toggleOne.bind(self, t) }
											doSave={ self.edit.bind(self, t) }
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
