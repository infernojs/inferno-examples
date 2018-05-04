`use strict`
import { Component, render } from 'inferno'

class MyWebsite extends Component {

	render() {
		return <div>Hello World</div>
	}
}

// Render HTML on the browser
render(<MyWebsite />, document.getElementById("root"))
