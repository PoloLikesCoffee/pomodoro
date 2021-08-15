import React from 'react';

const SettingsButton = ({ openSettingsMenu }) => {
	return (
		<div className="settings-btn" onClick={openSettingsMenu}>
			Settings
		</div>
	);
};

export default SettingsButton;
