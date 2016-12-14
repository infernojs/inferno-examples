import Inferno from 'inferno';
import { ESCAPE, ENTER } from './share';

const linkEvent = Inferno.linkEvent;

function handleSubmit(e) {
	const todo = this.data;
	const val = e.target.value.trim();
	val ? this.doSave(todo, val) : this.doRemove(todo);
}

function handleKeydown(props, e) {
	if (e.which === ENTER) return e.target.blur();
	if (e.which === ESCAPE) {
		e.target.value = props.data.title;
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
					checked={ todo.completed } onClick={ linkEvent(todo, props.doToggle) }
				/>

				<label onDblClick={ linkEvent(todo, props.doFocus) }>{ todo.title }</label>

				<button className="destroy" onClick={ linkEvent(todo, props.doRemove) }></button>
			</div>

			<input
				className="edit"
				ref={ setFocusRef.bind(props) }
				onblur={ handleSubmit.bind(props) }
				onKeyDown={ linkEvent(props, handleKeydown) }
			/>
		</li>
	);
}
