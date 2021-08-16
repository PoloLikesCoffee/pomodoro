import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
// import CheckIcon from '@material-ui/icons/Check';

const Settings = ({
	settingsVisible,
	openSettingsMenu,
	pomodoroLength,
	setPomodoroLength,
	shortBreakLength,
	setShortBreakLength,
	longBreakLength,
	setLongBreakLength,
	timerMode,
	setSecondsLeft,
	setBarLength,
}) => {
	const handleChangeSettings = (event) => {
		event.preventDefault();
		setPomodoroLength(event.target.pomodoro.value);
		setShortBreakLength(event.target.shortBreak.value);
		setLongBreakLength(event.target.longBreak.value);
		openSettingsMenu();

		switch (timerMode) {
			case 'short break':
				setSecondsLeft(event.target.shortBreak.value * 60);
				setBarLength(
					(event.target.shortBreak.value * 60 * 450) /
						(event.target.shortBreak.value * 60)
				);
				break;
			case 'long break':
				setSecondsLeft(event.target.longBreak.value * 60);
				setBarLength(
					(event.target.shortBreak.value * 60 * 450) /
						(event.target.shortBreak.value * 60)
				);
				break;
			default:
				setSecondsLeft(event.target.pomodoro.value * 60);
				setBarLength(
					(event.target.shortBreak.value * 60 * 450) /
						(event.target.shortBreak.value * 60)
				);
		}
	};

	if (settingsVisible) {
		return (
			<div className="settings-container visible">
				<div className="settings-container__content">
					<div className="settings-container__content__header">
						<h2>Settings</h2>
						<div className="close-btn" onClick={openSettingsMenu}>
							<CloseIcon />
						</div>
					</div>
					<form onSubmit={handleChangeSettings}>
						<div className="settings-container__content__time">
							<div
								action=""
								className="settings-container__content__time__form"
							>
								<label htmlFor="pomodoro">pomodoro</label>
								<input
									type="number"
									name="pomodoro"
									id="pomodoro"
									min="5"
									max="90"
									defaultValue={pomodoroLength}
								/>
								<label htmlFor="short-break">short break</label>
								<input
									type="number"
									name="shortBreak"
									id="short-break"
									min="1"
									max="14"
									defaultValue={shortBreakLength}
								/>
								<label htmlFor="long-break">long break</label>
								<input
									type="number"
									name="longBreak"
									id="long-break"
									min="15"
									max="30"
									defaultValue={longBreakLength}
								/>
							</div>
						</div>
						<div className="settings-container__content__submit">
							<button className="settings-container__btn">Apply</button>
						</div>
					</form>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default Settings;
