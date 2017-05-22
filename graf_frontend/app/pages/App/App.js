import React from 'react';
import { Router } from 'react-router';

import Home from '../Home/Home';

const appRoutes = [{
    path: '*',
    component: Home
}];


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const history = this.props.history;

        return(
            <Router history={ history } routes={ appRoutes } />
        );
    }
}

export default App;