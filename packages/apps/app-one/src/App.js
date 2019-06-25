import React, {Component} from 'react';
import './App.css';

import {CompOne, CompTwo, Weather} from '@project/components';

import {Provider} from 'react-redux';
// CreateStore allows us to load/unload modules dynamically.
import {createStore} from 'redux-dynamic-modules-core';
// Saga extension allows us to use Saga middleware in the module store.
import {getSagaExtension} from 'redux-dynamic-modules-saga';
// Thunk extension allows us to use Thunk middleware in the module store.
import {getThunkExtension} from 'redux-dynamic-modules-thunk';

class App extends Component {
	constructor(props) {
		super(props);

		/**
		 * Configure the store and load the thunk and saga extension
		 * The extensions are optional and you can choose extension based on the middleware you use
		 * You can also build your own extensions for any other middleware e.g. redux-observable
		 */
		this.store = createStore({
			extensions: [getThunkExtension(), getSagaExtension()]
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>
						<a
							className="App-link"
							href="https://github.com/react-workspaces/cra-workspaces-playground"
							target="_blank"
							rel="noopener noreferrer"
						>
							<strong>React</strong> Workspaces
						</a>
					</h1>
					<h2>Hot Reload Your Workspaces</h2>
					<p className="body">
						<code className="file">
							packages/apps/app-one/src/App.js
						</code>
						<code className="file">
							packages/components/src/CompOne/CompOne.js
						</code>
						<code className="file">
							packages/components/src/CompTwo/CompTwo.js
						</code>
					</p>
					<div className="components">
						<CompOne />
						<CompTwo />
					</div>
					<h1>Widgets</h1>
					<div className="widgets">{this.renderContent()}</div>
				</header>
			</div>
		);
	}

	renderContent = () => {
		return (
			// Pass the configured store to redux Provider
			// and render the widgets based on the state
			<Provider store={this.store}>
				<Weather />
			</Provider>
		);
	};
}

export default App;
