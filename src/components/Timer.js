import React from 'react';

const Timer = ({
	isActive,
	setIsActive,
	timerMode,
	timeLeft,
	buttonText,
	setButtonText,
}) => {
	let modeText =
		timerMode === 'pomodoro'
			? "Let's focus!"
			: timerMode === 'short break'
			? 'A short break is good!'
			: 'Why not a long break!';

	let timesUpMsg =
		timerMode === 'pomodoro' ? 'Time for a break' : 'Back to work!';

	let timeModeText = timeLeft === '0:00' ? timesUpMsg : modeText;

	const handleClick = (event) => {
		if (timeLeft === '0:00') {
			return null;
		}
		setIsActive(!isActive);
		setButtonText(
			buttonText === 'start' || buttonText === 'resume' ? 'pause' : 'resume'
		);
	};

	return (
		<div className="timer-container">
			<div className="timer-container__display">
				<div className="mode-text">{timeModeText}</div>
				<span>{timeLeft}</span>
				<button className="btn-start__pause" onClick={handleClick}>
					{buttonText}
				</button>
			</div>
		</div>
	);
};

export default Timer;
