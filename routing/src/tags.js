import Inferno from 'inferno';
import { Link } from 'inferno-router';

export const App = ({children}) => (
	<div className="layer">
		<nav>
			<Link to="/">Home</Link>
			<Link to="/users">Users</Link>
			<Link to="/users/bob">Bob</Link>
			<Link to="/users/joe">Joe</Link>
			<Link to="/users/may">May</Link>
			<Link to="/foobar">404</Link>
		</nav>
		<div>{ children }</div>
	</div>
);

export const Home = () => (
	<div className="layer">
		<label>Home Component</label>
	</div>
);

export const Users = ({children, params}) => (
	<div className="layer">
		<label>Users Component</label>
		<div>{ children }</div>
	</div>
);

export const User = ({params}) => (
	<div className="layer">
		<p>Hi, my name is: { params.username }</p>
	</div>
);

export const NoMatch = () => (
	<div className="layer">
		<p>CATCH-ALL</p>
	</div>
);
