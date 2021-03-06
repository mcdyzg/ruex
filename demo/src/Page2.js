import React, {PureComponent,Component} from 'react'
import {connect} from '../../src'
import {Link} from 'react-router-dom'

class Page2 extends Component {
	state = {}
	constructor(props) {
        super(props);
    }

	componentDidMount(){
		console.log('child did mount')
		this.props.add(1)
	}

	render() {
		const {
			user,
			counter,
			total_num,
		} = this.props
		return (
		<div className=''>

			<br/><br/><br/><br/>
			<div className="">
			    user上的user_num:{user.user_num}
			</div>
			<div className="">
			    counter上的counter_num:{counter.counter_num}
			</div>
			<div className="">
			    全局的total_num: {total_num}
			</div>
			<div className="">
			    book上的book_num:{user.book.book_num}
			</div>

			<button onClick={this.props.add.bind(this,1)}>mutation:add</button>
			<button onClick={this.props.addAsync.bind(this,1)}>action:addAsync</button>
			<button onClick={this.props.addPromise.bind(this,1)}>action:addPromise</button>
			<br />
			<button onClick={this.props.double.bind(this,2)}>mutation:double</button>
			<button onClick={this.props.doubleAsync.bind(this,2)}>action:doubleAsync</button>
			<button onClick={this.props.doublePromise.bind(this,2)}>action:doublePromise</button>



			<br/><br/><br/><br/>
			<Link to='/page3'>next page</Link>
		</div>)
	}
}


const mapStateToProps = (state) => ({
  	counter: state.counter,
    user:state.user,
	total_num:state.total_num,
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
)(Page2)
// export default Page2
