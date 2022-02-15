import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'
import { useOnLoadImages } from "../hooks/useLoad";
import UseAudio from '../hooks/useAudio';
import shuffle from './shuffle';

function Puzzle({ setTries, tries }) {

    const wrapperRef = useRef(null);
    const imagesLoaded = useOnLoadImages(wrapperRef);

    let hardest = 8;
    let history = useHistory();
    let MySwal = withReactContent(Swal)
    let images = useMemo(() => ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png'], []);
    let [userInfo, setInfo] = useState({level: false, style: false});
    let [order, setOrder] = useState([]);
    let [firstChoise, setFirst] = useState('');
    let [canClick, setClick] = useState(false);
    let [allChoosed, setChoosed] = useState([]);
    let [allFinished, setFinished] = useState([]);
    let limit = parseInt(userInfo.level);
    
    function handleClick(e, i) {

        let { tech } = e.target.dataset;
        setChoosed(old => [...old, `${i} => ${tech}`]);

        // Set State
        if (firstChoise === '') {
            setFirst(tech)
        } else {
            setClick(false);
            checkItems(tech, `${i} => ${tech}`);
        }

    }

    function checkItems(tech, secItem) {

        if (firstChoise === tech) {

            setFinished(old => [...old, ...allChoosed, secItem]);
            setFirst('');
            
            if (allFinished.length + 2 === images.slice(limit).length) {
                console.log('You Win Game');
                UseAudio('win');
                MySwal.fire({
                    title: 'Winner!',
                    text: 'Congratulations You Win The Game.',
                    imageUrl: '/images/winner.png',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                    confirmButtonText: 'Play again',
                    cancelButtonText: 'Back Home',
                    showCancelButton: true,
                    showCloseButton: true
                })
                .then(result => result.isConfirmed ? window.location.reload() : history.replace('/'))
            } else {
                console.log('Yes it is');
                UseAudio('succ')
            }

            setTimeout(() => {
                setChoosed([]);
                setClick(true);
            }, 500)

        } else {
            setTries(tr => tr + 1);
            setFirst('');

            if (tries + 1 === hardest) {
                console.log('You Loss Game');
                UseAudio('loss')
                setClick(false);
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
            } else {
                console.log('No wrong');
                UseAudio('fail')
            }

            setTimeout(() => {
                setChoosed([]);
                setClick(true);
            }, 1000)
        }
    }

    function getClass(i, tech) {

        let className = `game-block ${limit === 0 ? 'hard' :  limit === 2 ? 'mediuam' : 'easy'}`;
        if (!canClick) className+= ' no-click';

        let isSelected = allChoosed.includes(`${i} => ${tech}`) || allChoosed.includes('All');
        let isFinished = allFinished.includes(`${i} => ${tech}`);
        let final = isFinished ? className + ' finished' : isSelected ? className + ' selected' : className;

        return final;
    }

    useEffect(() => {
        if (!sessionStorage.getItem('userInfo')) {
            history.replace('/')
        } else {
            setInfo( JSON.parse( sessionStorage.getItem('userInfo') ) )
            let orderTest = [];
            images.forEach((img, i) => orderTest.push(i + 1));
            shuffle(orderTest);
            setOrder(orderTest);

            if (imagesLoaded) {
                setTimeout(() => {
                    setChoosed(['All'])
                    setTimeout(() => {
                        setChoosed([])
                        setClick(true);
                        UseAudio('onstart')
                    }, 2400)
                }, 2000)
            }
        }
    }, [images, history, imagesLoaded]);

    return (
        <div className='puzzle' ref={wrapperRef}>
            {
                images.slice(limit).map((img, i) => {
                    return (
                    <React.Fragment key={i}>
                        <div className={getClass(i, `0${img.slice(0, -4)}`)} style={{order: order[i]}}>
                            <div className="face front" onClick={e => handleClick(e, i)} data-tech={`0${img.slice(0, -4)}`}>?</div>
                            <div className="face back">
                                <img src={`/images/${userInfo.style}/${img}`} alt={`${img.slice(0, -4)}`} />
                            </div>
                        </div>
                    </React.Fragment>
                    )
                })
            }
        </div>
    );
}

export default Puzzle;