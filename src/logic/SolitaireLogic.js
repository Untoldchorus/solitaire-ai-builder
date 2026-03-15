/**
 * Solitaire Klondike Core Logic
 */

export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
export const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export const COLORS = {
  hearts: 'red',
  diamonds: 'red',
  clubs: 'black',
  spades: 'black',
};

export class Card {
  constructor(suit, value, isFaceUp = false) {
    this.suit = suit;
    this.value = value;
    this.isFaceUp = isFaceUp;
    this.id = `${value}-${suit}-${Math.random().toString(36).substr(2, 9)}`;
  }

  get numericValue() {
    return VALUES.indexOf(this.value) + 1;
  }

  get color() {
    return COLORS[this.suit];
  }

  canStackOn(otherCard) {
    if (!otherCard) return this.value === 'K';
    return (
      this.color !== otherCard.color &&
      this.numericValue === otherCard.numericValue - 1
    );
  }

  canPlaceInFoundation(topFoundationCard) {
    if (!topFoundationCard) return this.value === 'A';
    return (
      this.suit === topFoundationCard.suit &&
      this.numericValue === topFoundationCard.numericValue + 1
    );
  }
}

export const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push(new Card(suit, value));
    }
  }
  return shuffle(deck);
};

const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export class SolitaireGame {
  constructor(state = null) {
    if (state) {
      this.tableaus = state.tableaus;
      this.foundations = state.foundations;
      this.stock = state.stock;
      this.waste = state.waste;
    } else {
      this.initGame();
    }
  }

  fromJSONObject(obj) {
    if (obj.tableaus) {
      this.tableaus = obj.tableaus.map(pillar => 
        pillar.map(c => new Card(c.suit, c.value, c.isFaceUp))
      );
    }
    if (obj.foundations) {
      this.foundations = {};
      Object.keys(obj.foundations).forEach(suit => {
        this.foundations[suit] = obj.foundations[suit].map(v => new Card(suit, v, true));
      });
    }
    if (obj.waste) {
      this.waste = obj.waste.map(c => new Card(c.suit, c.value, true));
    }
    if (obj.stock) {
      this.stock = obj.stock.map(c => new Card(c.suit, c.value, false));
    }
  }

  initGame() {
    const deck = createDeck();
    this.tableaus = Array.from({ length: 7 }, (_, i) => {
      const cards = deck.splice(0, i + 1);
      cards[cards.length - 1].isFaceUp = true;
      return cards;
    });
    this.foundations = { hearts: [], diamonds: [], clubs: [], spades: [] };
    this.stock = deck;
    this.waste = [];
  }

  // Deep clone for state updates
  clone() {
    return new SolitaireGame({
      tableaus: this.tableaus.map(t => [...t]),
      foundations: { ...this.foundations },
      stock: [...this.stock],
      waste: [...this.waste],
    });
  }

  getLegalMoves() {
    const moves = [];

    // 1. Waste to Tableaus
    if (this.waste.length > 0) {
      const card = this.waste[this.waste.length - 1];
      this.tableaus.forEach((t, i) => {
        const target = t[t.length - 1];
        if (card.canStackOn(target)) {
          moves.push({ from: 'waste', to: `tableau-${i}`, card });
        }
      });
      // Waste to Foundations
      const foundationTop = this.foundations[card.suit][this.foundations[card.suit].length - 1];
      if (card.canPlaceInFoundation(foundationTop)) {
        moves.push({ from: 'waste', to: `foundation-${card.suit}`, card });
      }
    }

    // 2. Tableau to Tableau
    this.tableaus.forEach((sourceT, sourceIdx) => {
      if (sourceT.length === 0) return;
      
      // Find deepest face-up card
      let faceUpIdx = sourceT.findIndex(c => c.isFaceUp);
      for (let i = faceUpIdx; i < sourceT.length; i++) {
        const stack = sourceT.slice(i);
        const card = stack[0];
        
        this.tableaus.forEach((destT, destIdx) => {
          if (sourceIdx === destIdx) return;
          const target = destT[destT.length - 1];
          if (card.canStackOn(target)) {
            moves.push({ from: `tableau-${sourceIdx}`, to: `tableau-${destIdx}`, cards: stack });
          }
        });
      }
    });

    // 3. Tableau to Foundation
    this.tableaus.forEach((t, i) => {
      if (t.length === 0) return;
      const card = t[t.length - 1];
      const foundationTop = this.foundations[card.suit][this.foundations[card.suit].length - 1];
      if (card.canPlaceInFoundation(foundationTop)) {
        moves.push({ from: `tableau-${i}`, to: `foundation-${card.suit}`, card });
      }
    });

    return moves;
  }

  executeMove(move) {
    const { from, to, cards, card } = move;
    
    // Remove from source
    if (from === 'waste') {
      this.waste.pop();
    } else if (from.startsWith('tableau-')) {
      const idx = parseInt(from.split('-')[1]);
      const count = cards ? cards.length : 1;
      this.tableaus[idx].splice(-count);
      // Flip new top card if hidden
      if (this.tableaus[idx].length > 0) {
        this.tableaus[idx][this.tableaus[idx].length - 1].isFaceUp = true;
      }
    }

    // Add to destination
    if (to.startsWith('tableau-')) {
      const idx = parseInt(to.split('-')[1]);
      if (cards) this.tableaus[idx].push(...cards);
      else if (card) this.tableaus[idx].push(card);
    } else if (to.startsWith('foundation-')) {
      const suit = to.split('-')[1];
      this.foundations[suit].push(card);
    }
  }
}
