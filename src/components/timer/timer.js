import Buttons from '../buttons/buttons';
import Counter from '../counter/counter';
import {useState} from 'react';
import {interval} from 'rxjs';

import './timer.scss';

export default function Timer() {
    const [time, setTime] = useState({h:0, m:0, s:0});
    const [saveTime, setSaveTime] = useState();
    const [canContinue, setCanContinue] = useState(true);
    const [subscribe, setSubscribe] = useState('');

    let updateH = time.h,
        updateM = time.m,
        updateS = time.s;

    const setTimer = () => {
        updateS++;
        if(updateS === 60) {
            updateM++;
            updateS = 0;
        }
        if(updateM === 60) {
            updateH++;
            updateM = 0;
        }
        if(updateH > 24) {
            updateH = 0;
        }
        setTime({h: updateH, m: updateM, s: updateS});
    }

    const start = () => {
        if(!subscribe) {
            const timer$ = interval(1000).subscribe(() => setTimer());
            setSubscribe(timer$);
        } else {
            subscribe.unsubscribe();
            setTime({h:0, m:0, s:0});
            setSubscribe('');
        }
    };

    const wait = () => {
        if(canContinue) {
            setCanContinue(false);
            const canContinue = setTimeout(() => {
                setCanContinue(true);
                clearTimeout(canContinue);
            }, 300);
        } else {
            if(subscribe) {
                subscribe.unsubscribe();
            }
            setSaveTime(time)
            setSubscribe('');
        }
    };

    const reset = () => {
        if(subscribe) {
            subscribe.unsubscribe();
        }
        updateH = 0;
        updateM = 0;
        updateS = 0;
        setTime({h:0, m:0, s:0});
        const timer$ = interval(1000).subscribe(() => setTimer());
        setSubscribe(timer$);
    }

    const validTime = time ? time : saveTime;

    return (
        <>
            <h2 className='timer-title'>Timer:</h2>
            <Counter time={validTime}/>
            <div className="timer-btns">
                <Buttons start={start} wait={wait} reset={reset}/>
            </div>
        </>
    );
}