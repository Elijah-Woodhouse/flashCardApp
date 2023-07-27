import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Page from './components/Page';
import NewCardForm from './components/NewCardForm';
import { card_content } from './content/card_content';
import FeedbackMessage from './components/FeedbackMessage';

function App() {
  const [shuffledCards, setShuffledCards] = useState(card_content);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCardText, setCurrentCardText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [newCardFormData, setNewCardFormData] = useState({
    title: '',
    body: '',
    text: '',
  });

  // Check if there is data in localStorage, if not, use the default data
  const initialCardContent = JSON.parse(localStorage.getItem('card_content')) || card_content;

  useEffect(() => {
    // Shuffle the cards when the component mounts
    shuffleCards();
    setShowCard(true);
  }, [showCard]);

  useEffect(() => {
    // Update localStorage whenever shuffledCards change
    localStorage.setItem('card_content', JSON.stringify(shuffledCards));
  }, [shuffledCards]);

  const shuffleCards = () => {
    // Create a copy of the initialCardContent array and shuffle it randomly
    const shuffled = [...initialCardContent].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0); // Reset the current card index
    setCurrentCardText(shuffled[0].text); // Set the initial current card text
  };

  // Function to add a new card to the card_content array and localStorage
  const addNewCard = (newCard) => {
    // Create a new card object with the form data
    const updatedCardContent = [
      ...shuffledCards,
      { ...newCard, id: shuffledCards.length + 1 },
    ];

    // Shuffle the updated card_content array
    const shuffled = updatedCardContent.sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  };

  const handleNextCard = () => {
    if (currentCardIndex + 1 < shuffledCards.length) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setCurrentCardText(shuffledCards[currentCardIndex + 1].text); // Update current card text
    } else {
      // If there are no more cards left, reshuffle the cards
      shuffleCards();
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    // Compare the user input with the current card text
    if (userInput === currentCardText) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    };
    setShowMessage(true);

    // Delay hiding the message for a few seconds (e.g., 2 seconds)
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    // Clear the input field
    setUserInput("");
  };

  const handleNewCardFormChange = (e) => {
    const { name, value } = e.target;
    setNewCardFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNewCardFormSubmit = (event) => {
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
    addNewCard(newCard);

    // Clear the form input fields after submission
    setNewCardFormData({
      title: '',
      body: '',
      text: '',
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="homepage-title">FlashCard App! What's up</h2>
      </header>
      <div>
        {showMessage ? <FeedbackMessage isCorrect={isCorrect} /> : null}
        {shuffledCards.length > 0 && (
          <Card
            onNext={handleNextCard}
            showCard={showCard}
            item={shuffledCards[currentCardIndex]}
            userInput={userInput}
            onInputChange={handleUserInput}
            onSubmit={handleSubmit}
          />
        )}
      </div>
      <div className="card-input-container">
          <input
            type="text"
            className="card-input"
            placeholder="Enter the text here..."
            value="user_input"
            onChange={(e) => handleUserInput(e.target.value)}
          />
          <button className="card-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      <Page />
      <NewCardForm
        formData={newCardFormData}
        onChange={handleNewCardFormChange}
        onSubmit={handleNewCardFormSubmit}
      />
    </div>
  );
}

export default App;
