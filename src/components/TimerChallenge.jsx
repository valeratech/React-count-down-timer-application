import {useState, useRef} from 'react';

function TimerChallenge({title, targetTime}) {
    const timerId = useRef();
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerStart, setTimerStart] = useState(false);

    function stopChallengeHandler(id) {
        setTimerStart(false);
        clearTimeout(timerId.current);
    }

    // Multiply by 1000 to calculate in milliseconds
    function startChallengeHandler() {
        setTimerExpired(false);
        setTimerStart(true);
        timerId.current = setTimeout(() => {
            setTimerStart(false);
            setTimerExpired(true);
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
                <button onClick={!timerStart ? startChallengeHandler : stopChallengeHandler}>
                    {`${!timerStart ? 'Start' : 'Stop'} Challenge`}
                </button>
            </p>
            <p className="">
                {startTimeMessage}
            </p>
        </section>
    );
}

export default TimerChallenge;