import Component from 'inferno-component';
import { ESCAPE, ENTER, isEqual } from './util';

export default class Item extends Component {
	constructor({data, ...props}) {
		super(props);
		this.todo = data;
		this.state = {text: data.title};
	}

	render({data, doToggle, doDelete, doSave, onBlur, onFocus}) {
		console.log('updated item render');
		const {title, completed, editing} = data;

		return (
			<li>
				<div className="view">
					<input className="toggle" type="checkbox"
						checked={ completed } onclick={ doToggle }
					/>

					<label ondblclick={ onFocus }>{ title }</label>

					<button className="destroy" onclick={ doDelete }></button>
				</div>

				<input className="edit"
					value={ editing && title }
					onblur={ onBlur }
				/>
			</li>
		);
	}
}
