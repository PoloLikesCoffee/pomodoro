import React from 'react';

import SettingsIcon from '@material-ui/icons/Settings';

const SettingsButton = ({ toggleSettingsVisibility }) => {
	return (
		<div className="settings-btn" onClick={toggleSettingsVisibility}>
			<SettingsIcon />
		</div>
	);
};

export default SettingsButton;
