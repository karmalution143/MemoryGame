import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    const cardData = this.cardService.getCards();
    const pairs = [...cardData, ...cardData];
    this.cards = pairs
      .map((card) => ({ ...card, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
  }

  flipCard(card: Card): void {
    console.log('Card clicked:', card);
    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  checkForMatch(): void {
    const [card1, card2] = this.flippedCards;

    if (card1.value === card2.value) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.flippedCards = [];
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }
}
