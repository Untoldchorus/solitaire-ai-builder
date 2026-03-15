import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { Heart, Diamond, Clubs, Spade } from 'lucide-react-native';

const { width } = Dimensions.get('window');
export const CARD_WIDTH = (width - 60) / 7;
export const CARD_HEIGHT = CARD_WIDTH * 1.4;

const SuitIcon = ({ suit, size = 16 }) => {
  const color = (suit === 'hearts' || suit === 'diamonds') ? '#ff4d4d' : '#ffffff';
  switch (suit) {
    case 'hearts': return <Heart color={color} fill={color} size={size} />;
    case 'diamonds': return <Diamond color={color} fill={color} size={size} />;
    case 'clubs': return <View style={{transform:[{rotate: '180deg'}]}}><Clubs color={color} fill={color} size={size} /></View>;
    case 'spades': return <Spade color={color} fill={color} size={size} />;
    default: return null;
  }
};

const CardComponent = ({ card, index = 0, isStack = false, onPress }) => {
  if (!card) return <View style={[styles.card, styles.empty]} />;

  return (
    <View
      style={[
        styles.card,
        card.isFaceUp ? styles.faceUp : styles.faceDown,
        isStack && { marginTop: -CARD_HEIGHT * 0.75 }
      ]}
    >
      {card.isFaceUp ? (
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={[styles.value, { color: card.color === 'red' ? '#ff4d4d' : '#000' }]}>
              {card.value}
            </Text>
            <SuitIcon suit={card.suit} size={10} />
          </View>
          <View style={styles.centerSuit}>
            <SuitIcon suit={card.suit} size={24} />
          </View>
        </View>
      ) : (
        <View style={styles.pattern} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  faceUp: {
    backgroundColor: '#ffffff',
  },
  faceDown: {
    backgroundColor: '#2c3e50',
    borderWidth: 2,
    borderColor: '#d4af37',
  },
  empty: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    flex: 1,
    padding: 4,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  centerSuit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pattern: {
    flex: 1,
    backgroundColor: '#1b4332',
    margin: 4,
    borderRadius: 4,
    opacity: 0.5,
  }
});

export default CardComponent;
