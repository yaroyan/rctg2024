import { useEffect, useState } from "react";

export default function ProgressBar({ time }) {
    const [remainingTime, setRemainingTime] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 10);
        }, 10);
        return () => clearInterval(interval);
    }, []);

    return <progress value={remainingTime} max={time}></progress>
}