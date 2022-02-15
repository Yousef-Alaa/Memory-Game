import React, { useState } from 'react';
import Score from './../components/score';
import Puzzle from '../components/puzzle';

const Game = () => {

    let [tries, setTries] = useState(0)

    return (
        <div className='game'>
            <div className='container'>
            <Score tries={tries} />
            <Puzzle tries={tries} setTries={setTries} />
            </div>
        </div>
    );
}

export default Game;