import React,{Children} from 'react'
import PropTypes from 'prop-types'
export default class Provider extends React.Component{
    getChildContext() {
        return {
            store : this.store
        }
    }
    constructor(props,context){
        super(props,context)
        this.store = props.store;
    }

    render() {
        return Children.only(this.props.children)
    }
}
Provider.propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
}
Provider.childContextTypes = {
    store: PropTypes.object.isRequired
}
