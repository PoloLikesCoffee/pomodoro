import { useState, useEffect } from 'react';
import './scss/Style.scss';
import Header from './components/Header';
import Menu from './components/Menu';
import Timer from './components/Timer';
import SettingsButton from './components/SettingsButton';
import Settings from './components/Settings';

function App() {
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [timerMode, setTimerMode] = useState('pomodoro');
	const [pomodoroLength, setPomodoroLength] = useState(25);
	const [shortBreakLength, setShortBreakLength] = useState(3);
	const [longBreakLength, setLongBreakLength] = useState(15);
	const [secondsLeft, setSecondsLeft] = useState(pomodoroLength * 60);
	const [buttonText, setButtonText] = useState('start');
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (isActive) {
			const interval = setInterval(() => {
				setSecondsLeft((secondsLeft) => secondsLeft - 1);
			}, 1000);
			if (secondsLeft === 0) {
				clearInterval(interval);
				setIsActive(false);
				if (timerMode === 'pomodoro') {
					setTimerMode('short break');
					setSecondsLeft(shortBreakLength * 60);
					setButtonText('start');
				} else if (timerMode === 'short break') {
					setTimerMode('long break');
					setSecondsLeft(longBreakLength * 60);
					setButtonText('start');
				} else if (timerMode === 'long break') {
					setTimerMode('pomodoro');
					setSecondsLeft(pomodoroLength * 60);
					setButtonText('start');
				}
			}
			return () => clearInterval(interval);
		}
	}, [
		isActive,
		secondsLeft,
		timerMode,
		shortBreakLength,
		longBreakLength,
		pomodoroLength,
	]);

	const toggleSettingsVisibility = (event) => {
		setSettingsVisible(!settingsVisible);
	};

	const convertToTime = (secondsToConvert) => {
		const minutes = Math.floor(secondsToConvert / 60);
		const seconds = secondsToConvert % 60;
		if (seconds > 9) {
			return `${minutes}:${seconds}`;
		} else {
			return `${minutes}:${'0' + seconds}`;
		}
	};

	return (
		<div className="pomodoro-app">
			<Header />
			<Menu
				timerMode={timerMode}
				setTimerMode={setTimerMode}
				pomodoroLength={pomodoroLength}
				shortBreakLength={shortBreakLength}
				longBreakLength={longBreakLength}
				setButtonText={setButtonText}
				setSecondsLeft={setSecondsLeft}
				secondsLeft={secondsLeft}
				setIsActive={setIsActive}
			/>
			<Timer
				timerMode={timerMode}
				timeLeft={convertToTime(secondsLeft)}
				buttonText={buttonText}
				setButtonText={setButtonText}
				isActive={isActive}
				setIsActive={setIsActive}
			/>
			<SettingsButton toggleSettingsVisibility={toggleSettingsVisibility} />
			<Settings
				visible={settingsVisible}
				toggleSettingsVisibility={toggleSettingsVisibility}
				pomodoroLength={pomodoroLength}
				setPomodoroLength={setPomodoroLength}
				shortBreakLength={shortBreakLength}
				setShortBreakLength={setShortBreakLength}
				longBreakLength={longBreakLength}
				setLongBreakLength={setLongBreakLength}
				timerMode={timerMode}
				setSecondsLeft={setSecondsLeft}
			/>
		</div>
	);
}

export default App;
