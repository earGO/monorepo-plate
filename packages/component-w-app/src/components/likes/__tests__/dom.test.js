import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import Like from '../Like';
import Dislike from '../Dislike';
import {fetchApi} from '../../../utils/testApiCall';
import {getFirst} from '../../../utils/hashTables';
import * as LikesModule from '../likes-duck';
import LikesAmnt from '../LikesAmnt';
import {LikesDisconnected} from '../Likes';

configure({adapter: new Adapter()});

let allData = {}, //all posts from database
	singleId = '',
	singleamnt = 0;

beforeAll(async () => {
	const data = await fetchApi(LikesModule.api);
	allData = await data;
	let singleChunk = getFirst(allData);
	singleId = singleChunk[1];
	singleamnt = singleChunk[0];
});

describe('Test Like component with Enzyme', () => {
	test('renders w/o props', () => {
		const wrapper = shallow(<Like />);
		expect(wrapper.exists()).toBe(true);
	});
	test('onClick gets function from parent', () => {
		const wrapper = shallow(<Like onClick={() => {}} />);
		expect(wrapper.exists()).toBe(true);
	});
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Like />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});

describe('Test LikesAmnt component with Enzyme', () => {
	test('renders w/o props', () => {
		const wrapper = shallow(<LikesAmnt />);
		expect(wrapper.exists()).toBe(true);
	});
	test('renders w props', () => {
		const wrapper = shallow(<LikesAmnt likesAmnt={singleamnt} />);
		expect(wrapper.exists()).toBe(true);
	});
});

describe('Test Dislike component with Enzyme', () => {
	test('renders w/o props', () => {
		const wrapper = shallow(<Dislike />);
		expect(wrapper.exists()).toBe(true);
	});
	test('onClick gets function from parent', () => {
		const wrapper = shallow(<Dislike onClick={() => {}} />);
		expect(wrapper.exists()).toBe(true);
	});
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Dislike />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});

describe('Test Likes component with Enzyme with no Redux & Router', () => {
	test('renders w/o props', () => {
		const wrapper = shallow(<LikesDisconnected />);
		expect(wrapper.exists()).toBe(true);
	});
	test('onClick gets function from parent', () => {
		const wrapper = shallow(<LikesDisconnected onClick={() => {}} />);
		expect(wrapper.exists()).toBe(true);
	});
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<LikesDisconnected />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
