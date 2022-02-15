import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import UseAudio from './../hooks/useAudio';

const Home = (props) => {

    function handleSubmit(e) {
        e.preventDefault();
        let name = e.target.name.value;
        let level = e.target.level.value;
        let style = e.target.style.value;
        if (name === '' || level === 'none' || style === 'none') {
            toast.warning('Please Fill All Fields')
        } else {
            let obj = { name, level, style }
            sessionStorage.setItem('userInfo', JSON.stringify(obj));
            props.history.push(`/game`)
        }
    }

    useEffect(() => {
        console.log('Done');

        return () => document.getElementById('back').pause();
    }, [])

    return (
        <div className='home'>
            <div className='container'>
                <img src='/images/memory.png' alt='Logo' />
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='Type Your Name' />
                    <select name='level' defaultValue='none'>
                        <option value="none" disabled>Select Level...</option>
                        <option value='4'>Easy</option>
                        <option value='2'>Mediuam</option>
                        <option value='0'>Hard</option>
                    </select>
                    <select name='style' defaultValue='none'>
                        <option value="none" disabled>Select Cards Style...</option>
                        <option value='programming'>Programming</option>
                        <option value='animals'>Animals</option>
                        <option value='fruits'>Fruits</option>
                    </select>
                    <button type='submit'>Start Game</button>
                </form>
                <footer>Created By Yousef Alaa<span>💙</span></footer>
            </div>
            <div className='fixed'>
                <button onClick={e => {e.target.parentElement.remove(); UseAudio('back')}}>Start Game</button>
            </div>
        </div>
    );
}

export default Home;