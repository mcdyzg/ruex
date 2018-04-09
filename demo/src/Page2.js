import React, { PureComponent, Component } from 'react'
import { connect } from '../../src'
import { Link } from 'react-router-dom'
import store from './store'

store.registerModule('addModule', {
	state: {
		addModule_num: 5555,
	},
	mutations: {
		double(state, payload) {
			state.addModule_num = state.addModule_num * payload
		},
		add(state, payload) {
			state.addModule_num += payload
		},
	},
	actions: {
		addAsync({ state, commit, rootState, dispatch }, payload) {
			setTimeout(() => {
				commit('add', payload)
			}, 1000)
		},
		addPromise({ state, commit, rootState, dispatch }, payload) {
			return fetch('https://api.github.com/search/users?q=haha')
				.then(res => res.json())
				.then(res => {
					commit('add', 1)
					dispatch('addAsync', 1)
				})
		},
		doubleAsync({ state, commit, rootState, dispatch }, payload) {
			setTimeout(() => {
				commit('double', 2)
			}, 1000)
		},
		doublePromise({ state, commit, rootState, dispatch }, payload) {
			return fetch('https://api.github.com/search/users?q=haha')
				.then(res => res.json())
				.then(res => {
					commit('double', 2)
					dispatch('doubleAsync', 2)
				})
		},
	},
})
// 注意unregisterMudole因为是同步的，所以一定要确保没有组件会用到unregister的module。
// store.unregisterMudole('addModule')

class Page2 extends Component {
	state = {}
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log('child did mount')
		this.props.add(1)
	}

	render() {
		const { user, counter, total_num, addModule } = this.props
		return (
			<div>
				<br />
				<br />
				<br />
				<br />
				<div>user上的user_num:{user.user_num}</div>
				<div>counter上的counter_num:{counter.counter_num}</div>
				<div>addModule上的addModule_num:{addModule.addModule_num}</div>
				<div>全局的total_num: {total_num}</div>
				<div>book上的book_num:{user.book.book_num}</div>

				<button onClick={this.props.add.bind(this, 1)}>
					mutation:add
				</button>
				<button onClick={this.props.addAsync.bind(this, 1)}>
					action:addAsync
				</button>
				<button onClick={this.props.addPromise.bind(this, 1)}>
					action:addPromise
				</button>
				<br />
				<button onClick={this.props.double.bind(this, 2)}>
					mutation:double
				</button>
				<button onClick={this.props.doubleAsync.bind(this, 2)}>
					action:doubleAsync
				</button>
				<button onClick={this.props.doublePromise.bind(this, 2)}>
					action:doublePromise
				</button>

				<br />
				<br />
				<br />
				<br />
				<Link to="/page3">next page</Link>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	counter: state.counter,
	user: state.user,
	total_num: state.total_num,
	addModule: state.addModule,
})

// 方式一：
// const mapStateToProps = (state, ownProps) => {
// 	return {
// 		add: 'counter/add',
// 	}
// }

// 方式二：
// const mapMutationsToProps = ['add', 'double']

// 方式三：
// counter已经指定namespaced=true，因此调用counter/add会只执行counter的add，如果counter没指定namespaced，那么counter/add是无效的
const mapMutationsToProps = {
	add: 'counter/add',
	double: 'double',
}

const mapActionsToProps = {
	addAsync: 'counter/addAsync',
	addPromise: 'counter/addPromise',
	doubleAsync: 'doubleAsync',
	doublePromise: 'doublePromise',
}
// const mapActionsToProps = [
// 	'addAsync',
// 	'addPromise',
// 	'doubleAsync',
// 	'doublePromise',
// ]

export default connect(mapStateToProps, mapMutationsToProps, mapActionsToProps)(
	Page2,
)
// export default Page2
