import { useState, useEffect } from 'react';
import './scss/Style.scss';
import Header from './components/Header';
import Menu from './components/Menu';
import Timer from './components/Timer';
import SettingsButton from './components/SettingsButton';
import Settings from './components/Settings';
import audio from './assets/ringSound.mp3';

function App() {
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [timerMode, setTimerMode] = useState('pomodoro');
	const [pomodoroLength, setPomodoroLength] = useState(25);
	const [shortBreakLength, setShortBreakLength] = useState(5);
	const [longBreakLength, setLongBreakLength] = useState(15);
	const [secondsLeft, setSecondsLeft] = useState(pomodoroLength * 60);
	const [buttonText, setButtonText] = useState('start');
	const [start, setStart] = useState(false);
	const [counterPomodoro, setCounterPomodoro] = useState(1);
	const [barLength, setBarLength] = useState((secondsLeft * 450) / secondsLeft);

	const playAudio = () => {
		new Audio(audio).play();
	};

	useEffect(() => {
		if (start) {
			const interval = setInterval(() => {
				setBarLength(
					(barLength) => ((secondsLeft - 1.1) * barLength) / secondsLeft
				);
				setSecondsLeft((secondsLeft) => secondsLeft - 1);
			}, 1000);

			document.title = `ポモドーロ : ${convertToTime(secondsLeft)}`;

			if (secondsLeft === 0) {
				playAudio();
				clearInterval(interval);
				setStart(false);
				switch (timerMode) {
					case 'pomodoro':
						setCounterPomodoro(counterPomodoro + 1);
						if (counterPomodoro < 4) {
							setTimerMode('short break');
							setSecondsLeft(shortBreakLength * 60);
							setBarLength(
								(shortBreakLength * 60 * 450) / (shortBreakLength * 60)
							);
							setButtonText('start');
						} else if (counterPomodoro === 4) {
							setCounterPomodoro(1);
							setTimerMode('long break');
							setSecondsLeft(longBreakLength * 60);
							setBarLength(
								(longBreakLength * 60 * 450) / (longBreakLength * 60)
							);
							setButtonText('start');
						}
						break;
					case 'short break':
						setTimerMode('pomodoro');
						setSecondsLeft(pomodoroLength * 60);
						setBarLength((pomodoroLength * 60 * 450) / (pomodoroLength * 60));
						setButtonText('start');
						break;
					default:
						setTimerMode('pomodoro');
						setSecondsLeft(pomodoroLength * 60);
						setBarLength((pomodoroLength * 60 * 450) / (pomodoroLength * 60));
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
		barLength,
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
				barLength={barLength}
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
				setBarLength={setBarLength}
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
				setBarLength={setBarLength}
			/>
		</div>
	);
}

export default App;
