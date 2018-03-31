# ruex

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Use vuex in react

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## How to use

App.js
```js
import React from 'react'
import {Provider} from 'ruex'
import store from './store.js'
class App extends React.Component{
    render(){
        return (
            <Provider store={store} >
                <Child1/>
            </Provider>
        )
    }
}
```
store.js
```js
import {createStore} from 'ruex'

const state = {
	total_num:1111,
}

const mutations = {
	add(state,payload){
		state.total_num += payload
	},
	double(state,payload){
		state.total_num = state.total_num*payload
	},
}

const actions = {
	addAsync({state,commit,rootState,dispatch},payload){
		setTimeout(()=>{
			commit('add',payload)
		},1000)
	},
	addPromise({state,commit,rootState,dispatch},payload){
		return fetch('https://api.github.com/search/users?q=haha').then(res=>res.json())
		.then(res=>{
			commit('add',1)
			dispatch('addAsync',1)
		})
	},
	doubleAsync({state,commit,rootState,dispatch},payload){
		setTimeout(()=>{
			commit('double',2)
		},1000)
	},
	doublePromise({state,commit,rootState,dispatch},payload){
		return fetch('https://api.github.com/search/users?q=haha').then(res=>res.json())
		.then(res=>{
			commit('double',2)
			dispatch('doubleAsync',2)
		})
	},
}


// middleware
const logger = (store) => (next) => (mutation,payload) =>{
    console.group('before emit mutation ',store.getState())
    let result = next(mutation,payload)
    console.log('after emit mutation', store.getState())
	console.groupEnd()
}


const store = createStore({
    state,
	mutations,
	actions,
},[logger])

export default store

```

Child1.js
```js
import React, {PureComponent} from 'react'
import {connect} from 'ruex'
class Chlid1 extends PureComponent {
	state = {}
	constructor(props) {
        super(props);
    }

	render() {
		const {
			total_num,
		} = this.props
		return (
		<div className=''>
			<div className="">
			    total_num: {total_num}
			</div>

			<button onClick={this.props.add.bind(this,1)}>mutation:add</button>
			<button onClick={this.props.addAsync.bind(this,1)}>action:addAsync</button>
			<button onClick={this.props.addPromise.bind(this,1)}>action:addPromise</button>
			<br />
			<button onClick={this.props.double.bind(this,2)}>mutation:double</button>
			<button onClick={this.props.doubleAsync.bind(this,2)}>action:doubleAsync</button>
			<button onClick={this.props.doublePromise.bind(this,2)}>action:doublePromise</button>
		</div>)
	}
}


const mapStateToProps = (state) => ({
	total_num:state.total_num,
})
const mapMutationsToProps = ['add','double']
const mapActionsToProps = ['addAsync','addPromise','doubleAsync','doublePromise']

export default connect(
    mapStateToProps,
    mapMutationsToProps,
    mapActionsToProps,
)(Chlid1)
```


## Demo

```js
npm install
npm start
```

## TODO

1. namespace

## API

> https://vuex.vuejs.org/zh-cn/core-concepts.html

## CHANGELOG

- 1.0.1:support middleware

- 1.0.2:add dependencies
