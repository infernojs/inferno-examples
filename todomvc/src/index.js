import Component from 'inferno-component';
import { ENTER } from './share';
import { Head } from './base';
import Model from './model';
import Item from './item';

const { render } = Inferno;
const model = new Model();

class App extends Component {
	state = {
		todos: model.get()
	};

	update = arr => this.setState({todos: arr});

	add = e => {
		if (e.which !== ENTER) return;

		const val = e.target.value.trim();
		if (!val) return;

		e.target.value = '';
		this.update(
			model.add(val)
		);
	};

	edit = (todo, val) => this.update(
		model.put(todo, {title: val.trim(), editing: 0})
	);

	focus = todo => this.update(
		model.put(todo, {editing: 1})
	);

	blur = todo => this.update(
		model.put(todo, {editing: 0})
	);

	remove = todo => this.update(
		model.del(todo)
	);

	toggleOne = todo => this.update(
		model.toggle(todo)
	);

	toggleAll = ev => this.update(
		model.toggleAll(ev.target.checked)
	);

	render(_, {todos}) {
		const num = todos.length;
		const numDone = todos.filter(t => t.completed).length;
		const numAct = num - numDone;

		return (
			<div>
				<Head onEnter={ this.add } />

				<section className="main">
					<input className="toggle-all" type="checkbox"
						onclick={ this.toggleAll }
						checked={ numAct === 0 }
					/>

						<ul className="todo-list">
							{
								todos.map(t =>
									<Item data={t}
										onBlur={ () => this.blur(t) }
										onFocus={ () => this.focus(t) }
										doDelete={ () => this.remove(t) }
										doSave={ val => this.edit(t, val) }
										doToggle={ () => this.toggleOne(t) }
									/>
								)
							}
						</ul>
					</section>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
