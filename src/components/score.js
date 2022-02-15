import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'
import UseAudio from '../hooks/useAudio';


const Score = (props) => {
    
    const [name, setName] = useState('')
    const [timer, setTimer] = useState(100)
    const [playNow, setPlay] = useState(false)
    const history = useHistory();
    const MySwal = withReactContent(Swal)

    useEffect(() => {

        if (sessionStorage.getItem('userInfo')) {
            let obj = JSON.parse( sessionStorage.getItem('userInfo') )
            setName( obj.name )
        }

        let interv = setInterval(() => {
            if (playNow) {
                if (timer > 0) {
                    setTimer(t => t - 1);
                } else {
                    clearInterval(interv);
                    UseAudio('loss')
                    MySwal.fire({
                        title: 'Game Over!',
                        text: 'You Loss The Game :(',
                        imageUrl: '/images/gameover.png',
                        imageWidth: 360,
                        imageHeight: 180,
                        imageAlt: 'Custom image',
                        confirmButtonText: 'Play again',
                        cancelButtonText: 'Back Home',
                        showCancelButton: true,
                        showCloseButton: true
                    })
                    .then(result => result.isConfirmed ? window.location.reload() : history.replace('/'))
                }
            }
        }, 1000);

        setTimeout(() => {
            setPlay(true)
        }, 4400)

        return () => clearInterval(interv);
        // eslint-disable-next-line
    }, [playNow, timer]);

    return (
        <div className='score'>
            <div className="name">
                Hello: <span>{name}</span>
            </div>
            <div className='timer'><span>{timer}</span>s</div>
            <div className="tries">
                Wrong Tries: <span>{props.tries}</span>
            </div>
        </div>
    );
}

export default Score;