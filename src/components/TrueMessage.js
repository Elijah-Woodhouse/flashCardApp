import { React, useState, useEffect } from 'react';

export default function FeedbackMessage(textMatch) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(false);
        }, 1000);

        return () => {
        clearTimeout(timer);
        };
    }, []);


    return (
        <div className={isVisible ? 'correct-element' : 'correct-element hidden'}>
            <h1>Correct!</h1>
        </div>      
      );
}