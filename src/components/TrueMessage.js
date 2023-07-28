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
        <div className={isVisible ? 'correct-element' : 'correct-element hidden'}>
            <h1>Correct!</h1>
        </div>      
      );
}