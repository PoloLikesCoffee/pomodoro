import React from 'react';

const Button = ({ timerMode, title }) => {
	if (timerMode === 'pomodoro' && title === 'pomodoro') {
		return (
			<button className="menu-container__button focus" id={title}>
				{title}
			</button>
		);
	} else if (timerMode === 'short break' && title === 'short break') {
		return (
			<button className="menu-container__button focus" id={title}>
				{title}
			</button>
		);
	} else if (timerMode === 'long break' && title === 'long break') {
		return (
			<button className="menu-container__button focus" id={title}>
				{title}
			</button>
		);
	} else {
		return (
			<button className="menu-container__button" id={title}>
				{title}
			</button>
		);
	}
};

export default Button;
