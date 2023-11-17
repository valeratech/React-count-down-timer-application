import {useState, useRef} from 'react';

function TimerChallenge({title, targetTime}) {
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStart, setTimerStart] = useState(false);

    // Multiply by 1000 to calculate in milliseconds
    function startChallengeHandler() {
        setTimerStart(true);
        setTimeout(() => {
            setTimerExpired(true);
            setTimerStart(false);
        }, targetTime * 1000);
    }

    const gameStatusMessage = timerExpired && <p>You Lost!</p>
    const startTimeMessage = timerStart ? <p>Time is running ...</p> : <p>Timer inactive</p>

    return (
        <section className="challenge">
            <h2>{title}</h2>
            {gameStatusMessage}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={startChallengeHandler}>
                    Start Challenge
                </button>
            </p>
            <p className="">
                {startTimeMessage}
            </p>
        </section>
    );
}

export default TimerChallenge;