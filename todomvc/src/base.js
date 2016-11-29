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
