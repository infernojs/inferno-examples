import Inferno from 'inferno';
import Component from 'inferno-component';
import { ESCAPE, ENTER, isEqual } from './share';

export default class Item extends Component {
	constructor(args) {
		// theres probably a better way
		const data = args.data;
		delete args.data

		super(args);

		this.todo = data;
		this.state = {text: data.title};
		this.editor = null;
	}

	componentWillReceiveProps(props) {
		this.setText(props.data.title);
	}

	shouldComponentUpdate(props, state) {
		return !(isEqual(props.data, this.todo) && state.text === this.state.text);
	}

	componentWillUpdate(props) {
		this.todo = props.data;
	}

	componentDidUpdate() {
		this.editor.focus();
	}

	setText(str) {
		this.setState({text: str});
	}

	render(props, state) {
		const self = this;
		const todo = self.todo;

		const cls = [];
		todo.editing && cls.push('editing');
		todo.completed && cls.push('completed');

		const handleKeydown = function (e) {
			if (e.which === ESCAPE) return props.onBlur();
			if (e.which === ENTER) return props.doSave(state.text);
		};

		// tmp fix
		const handleBlur = function () {
			props.doSave(state.text);
		};

		const handleInput = function (e) {
			self.setText(e.target.value);
		};

		return (
			<li className={ cls.join(' ') }>
				<div className="view">
					<input className="toggle" type="checkbox"
						checked={ todo.completed } onClick={ props.doToggle }
					/>

					<label ondblclick={ props.onFocus }>{ todo.title }</label>

					<button className="destroy" onClick={ props.doDelete }></button>
				</div>

				<input className="edit"
					ref={function (el) { self.editor = el }}
					value={ todo.editing && state.text }
					onblur={ handleBlur }
					oninput={ handleInput }
					onkeydown={ handleKeydown }
				/>
			</li>
		);
	}
}
