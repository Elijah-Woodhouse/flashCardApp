import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Page from './components/Page';
import NewCardForm from './components/NewCardForm';
import { card_content } from './content/card_content';
import TrueMessage from './components/TrueMessage';
import FalseMessage from './components/FalseMessage';

function App() {
  const [shuffledCards, setShuffledCards] = useState(card_content);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCardText, setCurrentCardText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [showCard, setShowCard] = useState(true);
  const [showMessage, setShowMessage] = useState(null);
  const [ textMatch, setTextMatch ] = useState();
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

  const checkEquality = () => {
    setTextMatch(currentCardText === userInput)
  }

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

    const shuffled = updatedCardContent.sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  };

  const handleNextCard = () => {
    if (currentCardIndex + 1 < shuffledCards.length) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setCurrentCardText(shuffledCards[currentCardIndex + 1].text); // Update current card text
    } else {
      shuffleCards();
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    checkEquality();
    setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    setUserInput("");
    handleNextCard();
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
    const newCard = {
      title: newCardFormData.title,
      body: newCardFormData.body,
      text: newCardFormData.text,
    };
    addNewCard(newCard);
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
        {textMatch ? <TrueMessage /> : <FalseMessage/>}
        {shuffledCards.length > 0 && (
          <Card
            showCard={showCard}
            item={shuffledCards[currentCardIndex]}
          />
        )}
      </div>
      <div className="card-input-container">
          <input
            type="text"
            className="card-input"
            placeholder="Enter the text here..."
            value={userInput}
            onChange={handleUserInput}
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
