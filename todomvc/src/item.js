import Inferno from 'inferno';
import { ESCAPE, ENTER } from './share';

function handleSubmit(e) {
	const val = e.target.value.trim();
	val ? this.doSave(val) : this.doRemove();
}

function handleKeydown(e) {
	if (e.which === ENTER) return e.target.blur();
	if (e.which === ESCAPE) {
		e.target.value = this.data.title;
		return e.target.blur(); // saves
	}
}

function setFocusRef(el) {
	if (this.editing && el) {
		el.value = this.data.title;
		el.focus();
	}
}

export function itemSCU(prev, next) {
	return next.editing || next.data !== prev.data;
}

export function Item(props) {
	const todo = props.data;

	const cls = [];
	props.editing && cls.push('editing');
	todo.completed && cls.push('completed');

	return (
		<li className={ cls.join(' ') }>
			<div className="view">
				<input className="toggle" type="checkbox"
					checked={ todo.completed } onClick={ props.doToggle }
				/>

				<label ondblclick={ props.doFocus }>{ todo.title }</label>

				<button className="destroy" onClick={ props.doRemove }></button>
			</div>

			<input
				className="edit"
				ref={ setFocusRef.bind(props) }
				onblur={ handleSubmit.bind(props) }
				onkeydown={ handleKeydown.bind(props) }
			/>
		</li>
	);
}
