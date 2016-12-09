import Inferno from 'inferno';
import { ESCAPE, ENTER, isEqual } from './share';

function handleKeydown(e) {
	if (e.which === ENTER) return this.doSave(e.target.value);
	if (e.which === ESCAPE) return this.doSave(this.data.title);
}

function handleBlur(e) {
	this.doSave(e.target.value);
}

function handleFocus() {
	this.doEdit(this.data.title);
}

function handleInput(e) {
	this.doEdit(e.target.value);
}

function setFocusRef(el) {
	this.data.editing && el && el.focus();
}

export function itemSCU(prev, next) {
	return !isEqual(next.data, prev.data);
}

export function Item(props) {
	const todo = props.data;

	const cls = [];
	todo.editing && cls.push('editing');
	todo.completed && cls.push('completed');

	return (
		<li className={ cls.join(' ') }>
			<div className="view">
				<input className="toggle" type="checkbox"
					checked={ todo.completed } onClick={ props.doToggle }
				/>

				<label ondblclick={ handleFocus.bind(props) }>{ todo.title }</label>

				<button className="destroy" onClick={ props.doDelete }></button>
			</div>

			<input
				className="edit"
				value={ todo.text }
				ref={ setFocusRef.bind(props) }
				onblur={ handleBlur.bind(props) }
				oninput={ handleInput.bind(props) }
				onkeydown={ handleKeydown.bind(props) }
			/>
		</li>
	);
}
