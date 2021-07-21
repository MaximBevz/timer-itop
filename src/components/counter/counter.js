import './counter.scss';

export default function Counter({time:{h, m, s}}) {

    const setZero = (num) => {
        if(num < 10) {
            return `0${num}`;
        }
        return String(num);
    };

    return (
        <div className='counter-times'>
            <span className='counter-time'>{setZero(h)}</span>:<span className='counter-time'>{setZero(m)}</span>:<span className='counter-time'>{setZero(s)}</span>
        </div>
    );
}