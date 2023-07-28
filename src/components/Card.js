import React, { useState } from 'react';

export default function Card({showCard, item: { title, body, text } }) {

  return (
    // Wrap the JSX inside parentheses
    showCard ? (
      <div className="card-container">
        <h2 className="card-title" data-testid="card-title-text">
          {title}
        </h2>
        <p className="card-body" data-testid="card-body-text">
          {body}
        </p>
        <p className="card-text">{text}</p>
      </div>
    ) : null
  );
}
