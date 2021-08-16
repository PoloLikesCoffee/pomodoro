import React from 'react';
import audio from './../assets/clickSound.mp3';

const Timer = ({
	start,
	setStart,
	timerMode,
	timeLeft,
	buttonText,
	setButtonText,
	totalTime,
	barLength,
}) => {
	let cssProperties = {};
	cssProperties['--width'] = barLength;
	// let displayText = timerMode === 'pomodoro' ? 'break!' : 'work!';

	const playAudio = () => {
		new Audio(audio).play();
	};

	const handleClick = (event) => {
		playAudio();

		if (timeLeft === '0:00') {
			return null;
		}
		setStart(!start);
		setButtonText(
			buttonText === 'start' || buttonText === 'resume' ? 'pause' : 'resume'
		);
	};

	return (
		<div className="timer-container">
			{/* timer display */}
			<div className="display-time">{timeLeft}</div>
			{/* <div className="display-text">{displayText}</div> */}
			{/* progress bar display */}
			<div className="progressive-bar-container" id="progressBar">
				<div
					className="progressive-bar-container__bar-display"
					style={cssProperties}
				></div>
			</div>
			{/* start/pause/resume button */}
			<button className="btn-start__pause" onClick={handleClick}>
				{buttonText}
			</button>
		</div>
	);
};

export default Timer;
