import Component from 'inferno-component';
import { ENTER } from './share';

const { render } = Inferno;
const model = new Model();

class App extends Component {
	state = {
		todos: model.get()
	};

	add = e => {
		if (e.which !== ENTER) return;

		const val = e.target.value.trim();
		if (!val) return;

		e.target.value = '';
		this.setState({
			todos: model.add(val)
		});
	};

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
							{ todos.map(t =>  <li>{ t.title }</li>) }
						</ul>
					</section>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
