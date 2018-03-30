import produce from "immer";
import compose from './compose'

export default function createStore(module,middleWares) {
    let currentState = {}
    let mutationsMap = {}
    let actionsMap = {}
    // 中间件
    let middlewares = middleWares || []

    // 初始state
    currentState = getInitState(module)

    // 初始化mutations
    getMutationsMap(module,[])

    // 初始化actions
    getActionsMap(module,[])

    // 获取所有的mutation
    function getMutationsMap(module,context){
        let _mutations = module.mutations
        if(_mutations) {
            for(let mutaName in _mutations) {
                let mutaObj = {
                    name:mutaName,
                    // 当前mutation注册的回调
                    handler:_mutations[mutaName],
                    context,
                }
                if(!mutationsMap[mutaName]) {
                    mutationsMap[mutaName] = [mutaObj]
                }else{
                    mutationsMap[mutaName].push(mutaObj)
                }
            }
        }
        // 如果子module存在，循环
        let subModule = module.modules
        if(subModule) {
            Object.keys(subModule).forEach(item=>{
                let newContext = context.concat(item)
                getMutationsMap(subModule[item],newContext)
            })
        }
    }


    // 获取所有的actions对象
    function getActionsMap(module,context){
        let _actions = module.actions
        if(_actions) {
            for(let actName in _actions) {
                let actObj = {
                    name:actName,
                    handler:_actions[actName],
                    context,
                }
                if(!actionsMap[actName]) {
                    actionsMap[actName] = [actObj]
                }else{
                    actionsMap[actName].push(actObj)
                }
            }
        }
        // 如果子module存在，循环
        let subModule = module.modules
        if(subModule) {
            Object.keys(subModule).forEach(item=>{
                let newContext = context.concat(item)
                getActionsMap(subModule[item],newContext)
            })
        }
    }


    // 根据context数组获取到initState上对应的对象
    function getStateByContext(context,state){
        if(context.length === 0) {
            return state
        }else{
            let temState = state
            context.forEach(item=>{
                temState = temState[item]
            })
            return temState
        }
    }

    // 定义监听数组
    let listeners = []
    function subscribe(callback){
        listeners.push(callback)
    }

    // 触发mutations
    function commit(type,payload){
        currentState = produce(currentState,copyState=>{
            if(type && mutationsMap[type] && mutationsMap[type].length !== 0) {
                let mutas = mutationsMap[type]
                mutas.forEach(item=>{
                    let _state = getStateByContext(item.context,copyState)
                    item.handler(_state,payload)
                })
            }
        })
        // 触发监听
        listeners.forEach(cb=>{
            cb(currentState)
        })
    }


    // 触发actions
    function dispatch(type,payload){
        if(type && actionsMap[type] && actionsMap[type].length !== 0) {
            let actions = actionsMap[type]
            actions.forEach(item=>{
                let state = getStateByContext(item.context,currentState)
                item.handler({
                    state,
                    commit,
                    dispatch,
                    rootState:currentState,
                },payload)
            })
        }
    }


    // 将中间件注册到mutations上
    if(middlewares && middlewares.length !== 0) {
        const middlewareAPI = {
            getState,
            commit,
        }

        let chain = []
        chain = middlewares.map(function (middleware) {
            // 此处middleware处于闭包中，所以middleware.dispatch保存的一直都是最原始的store.dispatch方法。也就是说不论是异步还是同步的action,都只能触发原始的store.dispatch,并且会重新执行一遍所有的中间件
          return middleware(middlewareAPI);
        });
        // let _commit = commit
        commit = compose.apply(undefined,chain)(commit)
    }


    // 获取最新的state
    function getState(){
        return currentState
    }



    return {
        getState,
        subscribe,
        commit,
        dispatch,
    }
}

function getInitState(module){
    let state = module.state
    let subModule = module.modules
    if(subModule) {
        Object.keys(subModule).forEach(item=>{
            state[item] = getInitState(subModule[item])
        })
    }
    return state
}
