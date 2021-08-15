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
	const [pomodoroLength, setPomodoroLength] = useState(1);
	const [shortBreakLength, setShortBreakLength] = useState(5);
	const [longBreakLength, setLongBreakLength] = useState(15);
	const [secondsLeft, setSecondsLeft] = useState(pomodoroLength * 60);
	const [buttonText, setButtonText] = useState('start');
	const [start, setStart] = useState(false);
	const [counterPomodoro, setCounterPomodoro] = useState(1);

	useEffect(() => {
		if (start) {
			const interval = setInterval(() => {
				setSecondsLeft((secondsLeft) => secondsLeft - 1);
			}, 1000);
			if (secondsLeft === 0) {
				clearInterval(interval);
				setStart(false);
				if (timerMode === 'pomodoro') {
					setCounterPomodoro(counterPomodoro + 1);
					console.log(counterPomodoro);
					if (counterPomodoro < 4) {
						setTimerMode('short break');
						setSecondsLeft(shortBreakLength * 60);
						setButtonText('start');
					} else if (counterPomodoro === 4) {
						setCounterPomodoro(1);
						setTimerMode('long break');
						setSecondsLeft(longBreakLength * 60);
						setButtonText('start');
					}
				} else if (timerMode === 'short break') {
					setTimerMode('pomodoro');
					setSecondsLeft(pomodoroLength * 60);
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
		start,
		secondsLeft,
		timerMode,
		shortBreakLength,
		longBreakLength,
		pomodoroLength,
		counterPomodoro,
	]);

	const openSettingsMenu = (event) => {
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
			<Timer
				timerMode={timerMode}
				timeLeft={convertToTime(secondsLeft)}
				buttonText={buttonText}
				setButtonText={setButtonText}
				start={start}
				setStart={setStart}
				totalTime={secondsLeft}
				widthBar={(secondsLeft / 60) * 100}
			/>
			<Menu
				timerMode={timerMode}
				setTimerMode={setTimerMode}
				pomodoroLength={pomodoroLength}
				shortBreakLength={shortBreakLength}
				longBreakLength={longBreakLength}
				setButtonText={setButtonText}
				setSecondsLeft={setSecondsLeft}
				secondsLeft={secondsLeft}
				setStart={setStart}
			/>
			<SettingsButton openSettingsMenu={openSettingsMenu} />
			<Settings
				settingsVisible={settingsVisible}
				openSettingsMenu={openSettingsMenu}
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
