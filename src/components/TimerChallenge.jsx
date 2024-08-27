import { useRef, useState } from "react"
import ResultModal from "./ResultModal";


export default function TimerChallenge({title, targetTime}) {
    const dialog = useRef();
    const timer = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const isTimeActive = 0 < timeRemaining && timeRemaining < (targetTime * 1000);

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    const handleReset = () => setTimeRemaining(targetTime * 1000);

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemain => prevTimeRemain - 10);
        }, 10)
    }

    const handleStop = () => {
        clearInterval(timer.current);
        dialog.current.open();
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} reset={handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={isTimeActive ? handleStop : handleStart}>
                        {isTimeActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={isTimeActive ? "active" : undefined}>
                    {isTimeActive ? "Time is running..." : "Timer inactive"}
                </p>
            </section>
        </>
    )
}