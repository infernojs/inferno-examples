/**
 * Stateless Header component
 */
export function Head({onEnter}) {
	return (
		<header className="header">
			<h1>todos</h1>
			<input className="new-todo" autofocus onkeydown={ onEnter }
				autocomplete="off" placeholder="What needs to be done?"
			/>
		</header>
	);
}

const filters = [
	{hash: '/', name: 'All'},
	{hash: 'active', name: 'Active'},
	{hash: 'completed', name: 'Completed'}
];

/**
 * Stateless Footer component
 */
export function Foot({left, done, onClear}) {
	return (
		<footer className="footer">
				<span className="todo-count">
					<strong>{ left }</strong> { left > 1 ? 'items' : 'item' } left
				</span>
				<ul className="filters">
					{
						filters.map(obj => (
							<li><a href={ obj.hash }>{ obj.name }</a></li>
						))
					}
				</ul>
				{ done > 0 ? (
					<button className="clear-completed" onClick={ onClear }>Clear completed</button>
				) : null }
			</footer>
	);
}
