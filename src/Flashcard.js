import React, { useState } from 'react';
import flashcardData1 from './flashcardData1.json';
import flashcardData2 from './flashcardData2.json';
import flashcardData3 from './flashcardData3.json';
import './Flashcard.css';

// Array of available flashcard sets
const flashcardSets = [flashcardData1, flashcardData2, flashcardData3];

function Flashcard() {
  // State variables
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [flashcardData, setFlashcardData] = useState(flashcardData1);
  const [flashcardSetName, setFlashcardSetName] = useState(flashcardData.category);

  // Get the current card based on the current card index
  const currentCard = flashcardData.questions[currentCardIndex];

  // Function to toggle between showing the question and answer of the card
  const toggleCard = () => {
    setShowQuestion(!showQuestion);
  };

  // Function to switch to the next card
  const nextCard = () => {
    setCurrentCardIndex(prevIndex => (prevIndex + 1) % flashcardData.questions.length);
    setShowQuestion(true);
  };

  // Function to switch to the next set of cards
  const switchFlashcardSet = () => {
    const currentIndex = flashcardSets.indexOf(flashcardData);
    const nextIndex = (currentIndex + 1) % flashcardSets.length;
    const nextFlashcardData = flashcardSets[nextIndex];
    setFlashcardData(nextFlashcardData);
    setFlashcardSetName(nextFlashcardData.category);
    setCurrentCardIndex(0);
    setShowQuestion(true);
  };

  return (
    <div className="flashcard">
      {/* Display the card number and flashcard set name */}
      <div className="flashcard-info">
        <div className="card-number">{`${currentCardIndex + 1}/${flashcardData.questions.length}`}</div>
        <div className="flashcard-set-name">{flashcardSetName}</div>
      </div>
      {/* Display the question or answer based on showQuestion state */}
      <div className={`card ${showQuestion ? 'question' : 'answer'}`} onClick={toggleCard}>
        {showQuestion ? (
          <div>{currentCard.question}</div>
        ) : (
          <div>{currentCard.answer}</div>
        )}
      </div>
      {/* Button to go to the next card */}
      <button className="next-button" onClick={nextCard}>
        Next Card
      </button>
      {/* Button to switch to the next flashcard set */}
      <button className="switch-button" onClick={switchFlashcardSet}>
        Switch Flashcard Set
      </button>
    </div>
  );
}

export default Flashcard;