import React from 'react';

export default function NewCardForm({ onChange, onSubmit, formData }) {


  return (
    <div className='form-container'>
      <h2 className="form-title">New Card Form</h2>
      <form className='form' onSubmit={onSubmit}>
        <div className='inputs'>
          <label htmlFor="title">Title:</label>
          <input
            className='title-input'
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <input
            className='body-input'
            type="text"
            id="body"
            name="body"
            value={formData.body}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Text:</label>
          <input
            className='text-input'
            type="text"
            id="text"
            name="text"
            value={formData.text}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}
