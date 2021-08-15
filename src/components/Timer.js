import React from 'react';

const Timer = ({
	start,
	setStart,
	timerMode,
	timeLeft,
	buttonText,
	setButtonText,
	totalWidthBar,
	totalTime,
}) => {
	// let displayText = timerMode === 'pomodoro' ? 'break!' : 'work!';

	const handleClick = (event) => {
		if (timeLeft === '0:00') {
			return null;
		}
		setStart(!start);
		setButtonText(
			buttonText === 'start' || buttonText === 'resume' ? 'pause' : 'resume'
		);
		// const progress = document.getElementById('progress');
		// progress.style.width = -timeLeft * 100 + '%';
	};

	return (
		<div className="timer-container">
			<div className="display-time">{timeLeft}</div>
			{/* <div className="display-text">{displayText}</div> */}
			<div className="progressive-bar-container">
				<div
					className="progressive-bar-container__bar-display"
					style={{ width: `${totalWidthBar}%` }}
				></div>
			</div>

			<button className="btn-start__pause" onClick={handleClick}>
				{buttonText}
			</button>
		</div>
	);
};

export default Timer;
