import React from 'react';
import PropTypes from 'prop-types';
import {Relative, Icon} from '@ursip/design-system';

import noop from '../../utils/noop';

function Dislike({onClick}) {
	return (
		<Relative>
			<Icon
				name="minus-circle"
				onClick={onClick}
				style={{cursor: 'pointer'}}
			/>
		</Relative>
	);
}

Dislike.propTypes = {
	like: PropTypes.func
};

Dislike.defaultProps = {
	like: noop
};

export default Dislike;
