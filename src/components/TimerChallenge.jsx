import {useState, useRef} from 'react';
import ScoreModal from "./ScoreModal.jsx";

function TimerChallenge({title, targetTime}) {
    const timerId = useRef();
    const dialog = useRef();

    // const [timerExpired, setTimerExpired] = useState(false);
    // const [timerStart, setTimerStart] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        // clearTimeout(timer.current);
        clearInterval(timerId.current);
        setTimeRemaining(targetTime * 1000);
        dialog.current.open();
    }

    function stopChallengeHandler(id) {
        // setTimerStart(false);
        dialog.current.open();
        clearInterval(timerId.current);
        setTimeRemaining(targetTime * 1000);
    }

    // Multiply by 1000 to calculate in milliseconds
    function startChallengeHandler() {
        // setTimerExpired(false);
        // setTimerStart(true);
        // timerId.current = setTimeout(() => {
        timerId.current = setInterval(() => {
            setTimeRemaining(prev => prev - 10);
            // setTimerStart(false);
            // setTimerExpired(true);
            // dialog.current.open();
        // The timeout argument controls the speed of the timer (*10 = milliseconds);
        }, 10);
        // }, targetTime * 1000);
    }

    console.log(timeRemaining)

    // Replace with modal
    // const gameStatusMessage = timerExpired && <p>You Lost!</p>
    const startTimeMessage = timerIsActive ? <p>Time is running ...</p> : <p>Timer inactive</p>

    return (
        <>
            {/*Instead of forwarding a ref to a DOM node, you can forward it to your own component*/}
            {/*{timerExpired && <ScoreModal ref={dialog} targetTime={targetTime} result="lost" />}*/}
            {/*TimeExpired Boolean no longer required*/}
            <ScoreModal ref={dialog} targetTime={targetTime} result="lost" />
            <section className="challenge">
                <h2>{title}</h2>
                {/*{gameStatusMessage}*/}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={!timerIsActive ? startChallengeHandler : stopChallengeHandler}>
                        {`${!timerIsActive ? 'Start' : 'Stop'} Challenge`}
                    </button>
                </p>
                {startTimeMessage}
            </section>
        </>
    );
}

export default TimerChallenge;