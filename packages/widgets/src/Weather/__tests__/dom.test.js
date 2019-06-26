import React from 'react';
import {shallow, mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import Weather from '../.';
import {Provider} from 'react-redux';
// CreateStore allows us to load/unload modules dynamically.
import {createStore} from 'redux-dynamic-modules-core';
// Saga extension allows us to use Saga middleware in the module store.
import {getSagaExtension} from 'redux-dynamic-modules-saga';
// Thunk extension allows us to use Thunk middleware in the module store.
import {getThunkExtension} from 'redux-dynamic-modules-thunk';

// SetupTests.js - Imports globals into Jest tests

require('jest-prop-type-error');

const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({adapter: new Adapter()});

describe('Weather renders when passing store directly', () => {
	const initialState = {output: 100};
	const mockStore = configureStore();
	let store, container;

	beforeEach(() => {
		store = mockStore(initialState);
		container = shallow(<Weather store={store} />);
	});

	it('+++ render the connected(SMART) component', () => {
		expect(container.length).toEqual(1);
	});
});
