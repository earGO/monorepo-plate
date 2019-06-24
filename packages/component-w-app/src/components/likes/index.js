import React from 'react';
import Likes from './Likes';
import {DynamicModuleLoader} from 'redux-dynamic-modules-react';
import LikesDuck from './likes-duck';

export default function DynamicLikes() {
	return (
		<DynamicModuleLoader modules={[LikesDuck]}>
			<Likes jokeId={'testId'} />
		</DynamicModuleLoader>
	);
}
