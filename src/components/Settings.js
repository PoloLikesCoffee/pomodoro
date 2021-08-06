import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
// import CheckIcon from '@material-ui/icons/Check';

const Settings = ({
	visible,
	toggleSettingsVisibility,
	pomodoroLength,
	setPomodoroLength,
	shortBreakLength,
	setShortBreakLength,
	longBreakLength,
	setLongBreakLength,
	timerMode,
	setSecondsLeft,
}) => {
	const handleChangeSettings = (event) => {
		event.preventDefault();
		setPomodoroLength(event.target.pomodoro.value);
		setShortBreakLength(event.target.shortBreak.value);
		setLongBreakLength(event.target.longBreak.value);
		toggleSettingsVisibility();

		switch (timerMode) {
			case 'short break':
				setSecondsLeft(event.target.shortBreak.value * 60);
				break;
			case 'long break':
				setSecondsLeft(event.target.longBreak.value * 60);
				break;
			default:
				setSecondsLeft(event.target.pomodoro.value * 60);
		}
	};

	if (visible) {
		return (
			<div className="settings-container visible">
				<div className="settings-container__content">
					<div className="settings-container__content__header">
						<h2>Settings</h2>
						<div className="close-btn" onClick={toggleSettingsVisibility}>
							<CloseIcon />
						</div>
					</div>
					<form onSubmit={handleChangeSettings}>
						<div className="settings-container__content__time">
							<h3>Time (Minutes)</h3>
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
						{/* <div className="settings-container__content__font">
							<h3>Font</h3>
							<div className="block-font">
								<input type="radio" id="fontPref1" name="font" value="kumbh" />
								<label htmlFor="fontPref1" className="font-kumbh">
									Aa
								</label>
								<input type="radio" id="fontPref2" name="font" value="roboto" />
								<label htmlFor="fontPref2" className="font-roboto">
									Aa
								</label>
								<input type="radio" id="fontPref3" name="font" value="space" />
								<label htmlFor="fontPref3" className="font-space">
									Aa
								</label>
							</div>
						</div>
						<div className="settings-container__content__color">
							<h3>Color</h3>
							<div className="block-color">
								<input
									type="radio"
									id="colorPref1"
									name="color"
									value="default"
								/>
								<label htmlFor="colorPref1" className="color-default">
									<CheckIcon />
								</label>

								<input type="radio" id="colorPref2" name="color" value="blue" />
								<label htmlFor="colorPref2" className="color-blue">
									<CheckIcon />
								</label>

								<input
									type="radio"
									id="colorPref3"
									name="color"
									value="purple"
								/>
								<label htmlFor="colorPref3" className="color-purple">
									<CheckIcon />
								</label>
							</div>
						</div>
						 */}
						<div className="settings-container__content__submit">
							<button className="settings-container__btn"> Apply</button>
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
