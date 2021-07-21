import './buttons.scss';

export default function Buttons({start, wait, reset}) {
    return (
        <>
            <button
                className='app-btn app-btn-start'
                onClick={()=> start()}
            >Start / Stop</button>
            <button
                className='app-btn app-btn-wait'
                onClick={()=> wait()}
            >Wait</button>
            <button
                className='app-btn app-btn-reset'
                onClick={()=> reset()}
            >Reset</button>
        </>
    );
}