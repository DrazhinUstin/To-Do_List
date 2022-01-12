import { React, useState, useEffect } from 'react';

const getCurrentTime = () => {
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
    });

    const check = (value) => (value < 10 ? `0${value}` : value);

    const hours = check(new Date().getHours());
    const minutes = check(new Date().getMinutes());
    const seconds = check(new Date().getSeconds());

    return `${formatter.format(new Date())}, ${hours}:${minutes}:${seconds}`;
};

const Time = () => {
    const [time, setTime] = useState(getCurrentTime());

    useEffect(() => {
        setTimeout(() => setTime(getCurrentTime()), 1000);
    }, [time]);

    return <span>{time}</span>;
};

export default Time;
