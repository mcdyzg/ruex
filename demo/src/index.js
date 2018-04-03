import React, {PureComponent,Component} from 'react'
import Page2 from './Page2'
import Page3 from './Page3'
import store from './store'
import {Provider} from '../../src'
import {render} from 'react-dom'
import {HashRouter as Router,Route} from 'react-router-dom'


class Demo extends PureComponent {
	constructor(props) {
        super(props);
		this.state = {
		}
    }

	componentDidMount(){
	}

	render() {
		return (
		<Provider store={store}>
			<Router>
				<div>
					<Route exact path='/' component={Page2} />
					<Route path='/page3' component={Page3} />
				</div>
			</Router>
		</Provider>
		)
	}
}



render(<Demo/>, document.querySelector('#demo'))
