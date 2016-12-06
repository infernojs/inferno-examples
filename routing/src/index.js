import Inferno, {render} from 'inferno';
import {Router, Route} from 'inferno-router';
import createHistory from 'history/createBrowserHistory';
import {App, Home, User, Users, NoMatch} from './tags';

const history = createHistory();

const routes = (
  <Router history={ history }>
    <Route component={ App }>
      <Route path="/" component={ Home } />
      <Route path="/users" component={ Users } />
      <Route path="/users/:username" component={ User } />
      <Route path="*" component={ NoMatch } />
    </Route>
  </Router>
);

render(routes, document.getElementById('app'));
