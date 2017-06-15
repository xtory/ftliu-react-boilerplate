import React from 'react'
import { render } from 'react-dom'
import loglevel from 'loglevel'
import logger from 'loglevel-prefix-persist/client'

import 'font-awesome/css/font-awesome.min.css'
import 'purecss/build/pure-min.css'

let initialState = JSON.parse(document.getElementById('initial-state').innerHTML || '{}')

let {envCfg:cfg} = initialState

let log = logger(cfg.env, loglevel, cfg.log)

const App = React.createClass({
    render() {
        log.info('render')
        return <div id='g-app'>HI!</div>
    }

})

render(<App />, document.getElementById('app-container'))