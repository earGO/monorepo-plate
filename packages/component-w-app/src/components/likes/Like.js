import React from 'react';
import PropTypes from 'prop-types';
import {Relative, Icon} from '@ursip/design-system';

import noop from '../../utils/noop';

function Like({onClick}) {
	return (
		<Relative>
			<Icon
				name="plus-circle"
				onClick={onClick}
				style={{cursor: 'pointer'}}
			/>
		</Relative>
	);
}

Like.propTypes = {
	onClick: PropTypes.func
};

Like.defaultProps = {
	onClick: noop
};

export default Like;
