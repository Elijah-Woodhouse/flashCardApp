import { React, useEffect, useState } from 'react';

export default function FeedbackMessage(textMatch) {
  const [textState, setTextState] = useState()

  useEffect(() => {
    setTextState(textMatch)
  }, []);

    

    return (
        <>
          {textMatch ? (
            <div className="correct-element">
              <h1>Correct!</h1>
            </div>
          ) : (
            <div className="false-element">
              <h1>Nope!</h1>
            </div>
          )}
        </>
      );
}