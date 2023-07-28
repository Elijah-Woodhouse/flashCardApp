import { React, useState, useEffect } from 'react';

export default function FeedbackMessage(textMatch) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(false);
        }, 3000);

        return () => {
        clearTimeout(timer);
        };
    }, [textMatch]);

    return (

        <div className={isVisible ? 'false-element' : 'false-element hidden'}>
            <h1>Nope!</h1>
        </div>
      );
}