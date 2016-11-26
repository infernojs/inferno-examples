import Component from 'inferno-component';

const { render } = Inferno;

class App extends Component {
	render() {
		return <div>testing</div>
	}
}

render(<App />, document.getElementById('app'));
