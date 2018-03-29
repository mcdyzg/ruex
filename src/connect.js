import PropTypes from 'prop-types'
import React from 'react'
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]'
}
function isPlainObject(obj){
    return typeof obj === 'object' && Object.getPrototypeOf(obj)===Object.prototype
}

const IIHoc = (mapStateToProps,mapMutationsToProps,mapActionsToProps) => (WrapComponent) =>{
    class Hoc extends React.Component{
        constructor(props,context){
            super(props,context)
            this.store = this.context.store
            this.previousStore = this.store.getState()
            this.mutations = this.transMutaOrActionToProps(mapMutationsToProps,'commit')
            this.actions = this.transMutaOrActionToProps(mapActionsToProps,'dispatch')
            this.state = mapStateToProps(this.previousStore)
        }

        transMutaOrActionToProps(args,type){
            let newMuta = {}
            let t = this
            if(isPlainObject(args)) {
                Object.keys(args).forEach(key=>{
                    newMuta[key] = (payload) =>{
                        t.store[type](args[key],payload)
                    }
                })
            }else if(isArray(args)) {
                args.forEach(key=>{
                    newMuta[key] = (payload) =>{
                        t.store[type]([key],payload)
                    }
                })
            }
            return newMuta
        }


        // shouldComponentUpdate(){
        //     return true
        // }

        componentDidMount(){
            const t = this
            function callback(state){
                // 因为使用了immer，所以全局store无论多深层级，只要有变化，就返回新对象，否则返回原对象，immer做了类似vue对象遍历的工作。
                if(t.previousStore !== state) {
                    t.previousStore = state
                    t.setState(mapStateToProps(state))
                }
            }
            this.store.subscribe(callback)
        }

        render(){
            const total = {...this.state,...this.mutations,...this.actions}
            return <WrapComponent {...total}/>
        }
    }
    Hoc.contextTypes = {
        store:PropTypes.object,
    }
    return Hoc
}
export default IIHoc
