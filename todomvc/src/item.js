import Component from 'inferno-component';
import { ESCAPE, ENTER, isEqual } from './util';

export default class Item extends Component {
	constructor({data, ...props}) {
		super(props);
		this.todo = data;
		this.state = {text: data.title};
	}

	componentWillUpdate = ({data}) => (this.todo = data);
	componentDidUpdate = () => this.editor.focus();

	render({doToggle, doDelete, doSave, onBlur, onFocus}) {
		console.log('updated item render');
		const {title, completed, editing} = this.todo;

		const cls = [];
		editing && cls.push('editing');
		completed && cls.push('completed');

		return (
			<li className={ cls.join(' ') }>
				<div className="view">
					<input className="toggle" type="checkbox"
						checked={ completed } onclick={ doToggle }
					/>

					<label ondblclick={ onFocus }>{ title }</label>

					<button className="destroy" onclick={ doDelete }></button>
				</div>

				<input className="edit"
					ref={el => { this.editor = el }}
					value={ editing && title }
					onblur={ onBlur }
				/>
			</li>
		);
	}
}
