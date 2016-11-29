import Component from 'inferno-component';
import { ENTER } from './share';

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

	focus = todo => this.update(
		model.put(todo, {editing: 1})
	);

	remove = todo => this.update(
		model.del(todo)
	);

	toggleOne = todo => this.update(
		model.toggle(todo)
	);

	render(_, {todos}) {
		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input className="new-todo" autofocus onkeydown={ this.add }
						autocomplete="off" placeholder="What needs to be done?"
					/>
				</header>

				<section className="main">
					<input className="toggle-all" type="checkbox" />

						<ul className="todo-list">
							{
								todos.map(t =>
									<li>
										<div className="view">
											<input className="toggle" type="checkbox"
												checked={ t.completed } onclick={ this.toggleOne }
											/>

											<label ondblclick={ this.focus }>{ t.title }</label>

											<button className="destroy" onclick={ this.remove }></button>
										</div>
									</li>
								)
							}
						</ul>
					</section>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
