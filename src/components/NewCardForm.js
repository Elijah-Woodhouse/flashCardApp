import React, { useState } from 'react';

export default function NewCardForm({ onChange, onSubmit, onAddCard }) {
  const [newCardFormData, setNewCardFormData] = useState({
    title: '',
    body: '',
    text: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewCardFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate the form data if needed
    // For simplicity, we'll assume the data is valid

    // Create a new card object with the form data
    const newCard = {
      title: newCardFormData.title,
      body: newCardFormData.body,
      text: newCardFormData.text,
    };

    // Pass the new card data back to the parent component (App) using the onAddCard prop
    onAddCard(newCard);

    // Clear the form input fields after submission
    setNewCardFormData({
      title: '',
      body: '',
      text: '',
    });
  };

  return (
    <div className='form-container'>
      <h2 className="form-title">New Card Form</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='inputs'>
          <label htmlFor="title">Title:</label>
          <input
            className='title-input'
            type="text"
            id="title"
            name="title"
            value={newCardFormData.title}
            onChange={handleFormChange}
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
            value={newCardFormData.body}
            onChange={handleFormChange}
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
            value={newCardFormData.text}
            onChange={handleFormChange}
            required
          />
        </div>
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}
