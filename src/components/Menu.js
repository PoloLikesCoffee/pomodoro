import React from 'react';
import Button from './Button';

const Menu = ({
	timerMode,
	setTimerMode,
	setButtonText,
	pomodoroLength,
	shortBreakLength,
	longBreakLength,
	setSecondsLeft,
	setIsActive,
}) => {
	const handleModeChange = (event) => {
		// console.log(event.target.id);
		setTimerMode(event.target.id);
		setButtonText('start');
		setIsActive(false);
		switch (event.target.id) {
			case 'short break':
				setSecondsLeft(shortBreakLength * 60);
				break;
			case 'long break':
				setSecondsLeft(longBreakLength * 60);
				break;
			default:
				setSecondsLeft(pomodoroLength * 60);
		}
	};

	return (
		<div className="menu-container">
			<ul className="menu-container__button-container">
				<li value={timerMode === 'pomodoro'} onClick={handleModeChange}>
					<Button timerMode={timerMode} title={'pomodoro'} />
				</li>
				<li value={timerMode === 'short break'} onClick={handleModeChange}>
					<Button timerMode={timerMode} title={'short break'} />
				</li>
				<li value={timerMode === 'long break'} onClick={handleModeChange}>
					<Button timerMode={timerMode} title={'long break'} />
				</li>
			</ul>
		</div>
	);
};

export default Menu;