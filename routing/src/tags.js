import Inferno from 'inferno';
import {Link} from 'inferno-router';

export const App = ({children}) => (
	<div className="layer">
		<label>App Component: </label>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/users">Users</Link>
			<Link to="/users/bob">Bob</Link>
			<Link to="/users/joe">Joe</Link>
			<Link to="/users/may">May</Link>
			<Link to="/foobar">404</Link>
		</nav>
		<div>{children}</div>
	</div>
);

export const Home = ({children}) => (
	<div className="layer">
		<label>Home Component</label>
		<div>{children}</div>
	</div>
);

export function Users({children, params}) {
	console.log('users', children);
	return (
		<div className="layer">
			<label>Users Component</label>
			<div>{ children }</div>
		</div>
	);
};

export function User({params}) {
	console.log('insider user', params);
	return (
		<div className="layer">
			<p>Hi, my name is: { params.username }</p>
		</div>
	);
};

export const NoMatch = ({children}) => (
	<div className="layer">
		<p>CATCH-ALL</p>
	</div>
);
