import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from 'react-dom';

// forwardRef is a helper function from React that allows us to wrap/forward a component's ref to another one.
const ScoreModal = forwardRef(function ScoreModal({targetTime, timeRemaining, onReset}, ref) {
    const dialog = useRef();

    const lostGame = timeRemaining <= 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

    // Create a custom interface between a child (ScoreModal.jsx) and its parent component (TimerChallenge.jsx).
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    return createPortal(
        // Instead of forwarding a ref to a DOM node, you can forward it to your own component
        <dialog ref={dialog} className="result-modal">
            {lostGame && <h2>You lost</h2>}
            {!lostGame && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedTimeRemaining}</strong></p>
            {/*The <dialog> HTML element represents a modal or non-modal dialog box or other interactive component, */}
            {/*such as a dismissible alert, inspector, or subwindow.*/}
            <form method="dialog" onSubmit={onReset}>
                {/*The dialog box can be closed using the .close() method or using the dialog method when submitting */}
                {/*a <form> that is nested within the <dialog> element. Modal dialogs can also be closed by pressing */}
                {/*the Esc key.*/}
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ScoreModal;