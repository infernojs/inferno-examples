import Component from 'inferno-component';

const { render } = Inferno;
const model = new Model();

class App extends Component {
	state = {
		todos: model.get()
	};

	render(_, {todos}) {
		console.log(todos);
		return <div>testing</div>
	}
}

render(<App />, document.getElementById('app'));
