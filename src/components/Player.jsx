import {useState, useRef} from 'react';

export default function Player() {
    const playerNameInput = useRef();

    const [playerName, setPlayerName] = useState(null);
    // const [submitted, setSubmitted] = useState(false);

    // function changeNameHandler(e) {
    //     setSubmitted(false);
    //     setPlayerName(e.target.value)
    // }

    function editNameClickHandler() {
        setPlayerName(playerNameInput.current.value);
        playerNameInput.current.value = '';
    }


    return (
        <section id="player">
            <h2>Welcome {playerName ?? 'unknown entity'}</h2>
            <p>
                <input
                    ref={playerNameInput}
                    // onChange={(event) => changeNameHandler(event)}
                    type="text"
                    // value={playerName}
                />
                <button onClick={editNameClickHandler}>Set Name</button>
            </p>
        </section>
    );
}
