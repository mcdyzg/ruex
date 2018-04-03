import React, {PureComponent,Component} from 'react'
import {connect} from '../../src'
import {Link} from 'react-router-dom'

class Page3 extends Component {
	state = {}
	constructor(props) {
        super(props);
    }

	render() {
		const {
			counter,
			page3,
		} = this.props
		return (
		<div className=''>

			<br/><br/><br/><br/>
			<div className="">
			    page3上的page3_num:{page3.page3_num}
			</div>
			<div className="">
			    counter上的counter_num:{counter.counter_num}
			</div>

			<button onClick={this.props.add.bind(this,1)}>mutation:add</button>
			<button onClick={this.props.addAsync.bind(this,1)}>action:addAsync</button>
			<button onClick={this.props.addPromise.bind(this,1)}>action:addPromise</button>
			<br />
			<button onClick={this.props.double.bind(this,2)}>mutation:double</button>
			<button onClick={this.props.doubleAsync.bind(this,2)}>action:doubleAsync</button>
			<button onClick={this.props.doublePromise.bind(this,2)}>action:doublePromise</button>




			<br/><br/><br/><br/>
			<Link to='/'>previous page</Link>
		</div>)
	}
}


const mapStateToProps = (state) => ({
  	counter: state.counter,
	page3:state.page3,
})

// const mapMutationsToProps = {
//     add:'add',
// }
const mapMutationsToProps = ['add','double']

// const mapActionsToProps = {
// 	addAsync:'addAsync',
// 	addPromise:'addPromise'
// }
const mapActionsToProps = ['addAsync','addPromise','doubleAsync','doublePromise']

export default connect(
    mapStateToProps,
    mapMutationsToProps,
    mapActionsToProps,
)(Page3)
// export default Page2
