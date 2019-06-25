import React, {Component} from 'react';
// We will load the widgets async using react-loadable.
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';
// createStore allows us to load/unload modules dynamically.
import {createStore} from 'redux-dynamic-modules-core';
// Saga extension allows us to use Saga middleware in the module store.
import {getSagaExtension} from 'redux-dynamic-modules-saga';
// Thunk extension allows us to use Thunk middleware in the module store.
import {getThunkExtension} from 'redux-dynamic-modules-thunk';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		// define the initial state where none of the widgets are visible
		this.state = {
			weather: false
		};

		/**
		 * configure the store and load the thunk and saga extension
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
				<h1>Widgets</h1>
				<div className="checkboxes">
					<input type="checkbox" onChange={this.onWeatherToggled} />
					<label>Weather</label>
				</div>
				<div className="widgets">{this.renderContent()}</div>
			</div>
		);
	}

	onWeatherToggled = () => {
		this.setState({weather: !this.state.weather});
	};

	renderContent = () => {
		return (
			// Pass the configured store to redux Provider
			// and render the widgets based on the state
			<Provider store={this.store}>
				<>{this.getWeather()}</>
			</Provider>
		);
	};

	getWeather() {
		if (!this.state.weather) {
			return null;
		}
		if (this._weather) {
			return this._weather;
		}

		const LoadableWeather = Loadable({
			loader: () => import('./weather'),
			loading: () => <div>Loading Scripts...</div>
		});
		this._weather = <LoadableWeather />;
		return this._weather;
	}
}

export default App;
