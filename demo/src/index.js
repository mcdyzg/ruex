import React, {PureComponent,Component} from 'react'
import Page2 from './Page2'
import store from './store'
import {Provider} from '../../src'
import {render} from 'react-dom'


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
			<div>
				<Page2 />
			</div>
		</Provider>
		)
	}
}



render(<Demo/>, document.querySelector('#demo'))
