"use client";

import React, { useState, useEffect } from "react";
import { WizardCard } from "@/types/cards";

export default function CardsPage() {
  const [deckCards, setDeckCards] = useState<WizardCard[]>([]);
  const [myCards, setMyCards] = useState<WizardCard[]>([]);
  const [playAreadCards, setPlayAreaCards] = useState<WizardCard[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setDeckCards(data.data);
  };

  // Core function
  // Re-implement: Can I make this more generic deck: WizardCard[]
  const drawCards = (num: number, deck: WizardCard[], shuffle: boolean) => {
    // Shuffle a copy of the cards
    const shuffled = shuffle
      ? [...deck].sort(() => 0.5 - Math.random())
      : [...deck];

    // Take the first `num` cards from shuffled deck
    const drawnCards = shuffled.slice(0, num);

    // Remove drawn cards from original deck
    const remainingCards = deck.filter((card) => !drawnCards.includes(card));

    // Return remaining cards to update deck
    return { drawnCards, remainingCards };
  };

  // date myCards with drawn cards

  // Core function
  const playCard = (card: WizardCard) => {
    // Remove the clicked card from myCards
    setMyCards((prev) => prev.filter((c) => c !== card));

    // Add it to playedCards
    setPlayAreaCards((prev) => [...prev, card]);

    return;
  };

  useEffect(() => {
    if (
      deckCards.length > 0 &&
      myCards.length === 0 &&
      playAreadCards.length === 0
    ) {
      const { drawnCards, remainingCards } = drawCards(5, deckCards, true);

      setMyCards((prevMyCards) => [...prevMyCards, ...drawnCards]);
      setDeckCards(remainingCards);
    }
  }, [deckCards, myCards]);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <div>Wizard Cards</div>
      {/* Play Area */}
      <div className="mt-auto flex gap-5 p-5 bg-blue-100 justify-center">
        <div>Play Area</div>
        {playAreadCards.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 bg-blue-50 w-fit p-5 rounded shadow cursor-pointer"
          >
            <div>color: {item.color}</div>
            <div key={index}>value: {item.value}</div>
          </div>
        ))}
      </div>

      {/* My Hand */}
      <div className="mt-auto h-1/4 flex gap-5 items-end p-5 bg-blue-100 justify-center">
        <div>Hand Area</div>
        {myCards.length > 0 &&
          myCards.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 bg-blue-50 w-fit p-5 rounded shadow cursor-pointer"
              onClick={() => playCard(item)}
            >
              <div>color: {item.color}</div>
              <div key={index}>value: {item.value}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
