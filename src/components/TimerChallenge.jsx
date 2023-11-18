import {useState, useRef} from 'react';
import ScoreModal from "./ScoreModal.jsx";

function TimerChallenge({title, targetTime}) {
    const timerId = useRef();
    const dialog = useRef();

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
            dialog.current.open();
        }, targetTime * 1000);
    }

    // Replace with modal
    // const gameStatusMessage = timerExpired && <p>You Lost!</p>
    const startTimeMessage = timerStart ? <p>Time is running ...</p> : <p>Timer inactive</p>

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
                    <button onClick={!timerStart ? startChallengeHandler : stopChallengeHandler}>
                        {`${!timerStart ? 'Start' : 'Stop'} Challenge`}
                    </button>
                </p>
                {startTimeMessage}
            </section>
        </>
    );
}

export default TimerChallenge;