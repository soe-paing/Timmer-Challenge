import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({remainingTime, targetTime, reset}, ref) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedTimeLeft = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    return <dialog ref={dialog} className="result-modal">
        {userLost ? <h2>You Lost</h2> : <h2>Your Score: {score}</h2>}
        <p>The target time was <strong>{targetTime}</strong> seconds.</p>
        <p>You stopped the timer with <strong>{formattedTimeLeft} seconds left.</strong></p>
        <form method="dialog" onSubmit={() => reset()}>
            <button>Close</button>
        </form>
    </dialog>;
});

export default ResultModal;