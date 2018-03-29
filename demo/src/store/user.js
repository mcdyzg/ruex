import book from './book'
const state = {
	user_num:3333
}

const mutations = {
	double(state,payload){
		state.user_num = state.user_num*payload
	},
	add(state,payload){
		state.user_num += payload
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

export default {
	actions,
	mutations,
	modules:{
		book,
	},
	state
}
