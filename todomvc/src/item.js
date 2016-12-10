import Inferno from 'inferno';
import { ESCAPE, ENTER, isEqual } from './share';

function handleSubmit(e) {
	const val = e.target.value.trim();
	const todo = this.data;
	val ? this.doSave(todo, val) : doRemove(todo);
}

function handleKeydown(e) {
	// if (e.which === ENTER) return e.target.blur();
	if (e.which === ENTER) return handleSubmit.bind(this, e);
	if (e.which === ESCAPE) return (this.doEdit(this.data.title), e.target.blur());
}

// function handleBlur(e) {
// 	this.doSave(e.target.value);
// }

function handleFocus() {
	this.doEdit(this.data.title);
}

function handleInput(e) {
	this.doEdit(e.target.value);
}

function setFocusRef(el) {
	this.edits && el && el.focus();
}

export function itemSCU(prev, next) {
	return next.data !== prev.data || next.edits;
	// return !isEqual(next.data, prev.data);
}

export function Item(props) {
	console.log('update item', props);
	const todo = props.data;

	const cls = [];
	todo.completed && cls.push('completed');
	props.edits && cls.push('editing');

	return (
		<li className={ cls.join(' ') }>
			<div className="view">
				<input className="toggle" type="checkbox"
					checked={ todo.completed } onClick={ props.doToggle }
				/>

				<label ondblclick={ props.doEdit }>{ todo.title }</label>

				<button className="destroy" onClick={ props.doRemove }></button>
			</div>

			<input
				className="edit"
				value={ props.edits }
				ref={ setFocusRef.bind(props) }
				onblur={ handleSubmit.bind(props) }
				oninput={ handleInput.bind(props) }
				onkeydown={ handleKeydown.bind(props) }
			/>
		</li>
	);
}
