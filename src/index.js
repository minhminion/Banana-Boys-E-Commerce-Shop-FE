import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/style.scss'
import * as serviceWorker from './serviceWorker'
import store,{ history } from './common/store'
import Root from './common/HOCS/Root'

ReactDOM.render(<Root {...store} history={history} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
