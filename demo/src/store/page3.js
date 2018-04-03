const state = {
	page3_num:5555
}

const mutations = {
	double(state,payload){
		state.page3_num = state.page3_num*payload
	},
	add(state,payload){
		state.page3_num += payload
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
	state
}
