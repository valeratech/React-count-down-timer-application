import {forwardRef, useImperativeHandle, useRef} from "react";

// forwardRef is a helper function from React that allows us to wrap/forward a component's ref to another one.
const ScoreModal = forwardRef(function ScoreModal({targetTime, result}, ref) {
    const dialog = useRef();

    // Create a custom interface between a child (ScoreModal.jsx) and its parent component (TimerChallenge.jsx).
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    return (
        // Instead of forwarding a ref to a DOM node, you can forward it to your own component
        <dialog ref={dialog} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            {/*The <dialog> HTML element represents a modal or non-modal dialog box or other interactive component, */}
            {/*such as a dismissible alert, inspector, or subwindow.*/}
            <form method="dialog">
                {/*The dialog box can be closed using the .close() method or using the dialog method when submitting */}
                {/*a <form> that is nested within the <dialog> element. Modal dialogs can also be closed by pressing */}
                {/*the Esc key.*/}
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ScoreModal;