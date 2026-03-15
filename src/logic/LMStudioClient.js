/**
 * Antigravity Internal Strategy Tutor
 * This module replaces the external LM Studio dependency with hardcoded,
 * high-level tactical reasoning for instant offline educational feedback.
 */

export const getMoveExplanation = (gameState, move) => {
  const { from, to, card, cards } = move;
  const movingCard = card || (cards ? cards[0] : null);
  
  if (!movingCard) return "General strategic progression.";

  // 1. Foundation Priority
  if (to.startsWith('foundation')) {
    return `Moving the ${movingCard.value} of ${movingCard.suit} to the Foundation clears space on the Tableau and brings you closer to victory.`;
  }

  // 2. Opening Hidden Cards
  if (from.startsWith('tableau')) {
    const fromIdx = parseInt(from.split('-')[1]);
    const sourceTableau = gameState.tableaus[fromIdx];
    // If moving the last face-up card and there are hidden cards beneath
    if (sourceTableau.length > (cards ? cards.length : 1)) {
      const topRemaining = sourceTableau[sourceTableau.length - (cards ? cards.length : 1) - 1];
      if (!topRemaining.isFaceUp) {
        return `This move is critical because it uncovers a hidden card in column ${fromIdx + 1}, expanding your available options.`;
      }
    }
  }

  // 3. Waste Management
  if (from === 'waste') {
    return `Playing from the Waste pile is highly efficient as it introduces a new card into the Tableau cycle without locking your Foundation.`;
  }

  // 4. Stacking Strategy
  if (to.startsWith('tableau')) {
    const toIdx = parseInt(to.split('-')[1]);
    if (gameState.tableaus[toIdx].length === 0 && movingCard.value === 'K') {
      return `Placing a King in an empty slot is the best way to utilize the space and start building a new sequence.`;
    }
    return `Building sequences on the Tableau (Alternating colors) is a foundational technique to organize the board for later Foundation moves.`;
  }

  return "This move follows standard strategic play by maximizing Tableau organization.";
};
