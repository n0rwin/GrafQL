import React from 'react';
import ReactDom from 'react-dom';
import App from './pages/App/App';
import { AppContainer } from 'react-hot-loader';
import { hashHistory } from 'react-router';

let injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

function onPause() {
    // This application has been suspended. Save application state here.
}

function onResume() {
    // This application has been reactivated. Restore application state here.
}


function bootstrap() {
    renderApp(App);
}

function renderApp(Component) {
    ReactDom.render(
        <AppContainer>
            <Component history={ hashHistory }/>
        </AppContainer>,
        document.getElementById('app')
    );
}

bootstrap();