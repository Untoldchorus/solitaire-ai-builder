import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { SUITS, VALUES, Card } from '../logic/SolitaireLogic';
import { X, Save, Trash2 } from 'lucide-react-native';

const DeckBuilder = ({ isVisible, onClose, onSave }) => {
  const [deck, setDeck] = useState([]);

  const addCard = (value, suit) => {
    setDeck([...deck, { value, suit }]);
  };

  const removeCard = (index) => {
    setDeck(deck.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const cards = deck.map(c => new Card(c.suit, c.value, false));
    onSave(cards);
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Manual Deck Builder</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Current Deck Sequence ({deck.length} cards)</Text>
          <ScrollView horizontal style={styles.sequenceContainer}>
            {deck.map((card, i) => (
              <TouchableOpacity key={i} onPress={() => removeCard(i)} style={styles.deckCard}>
                <Text style={[styles.cardText, { color: (card.suit === 'hearts' || card.suit === 'diamonds') ? '#ff4d4d' : '#000' }]}>
                  {card.value}{card.suit[0].toUpperCase()}
                </Text>
                <Trash2 size={12} color="#ff4d4d" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.subtitle}>Tap to Add Cards</Text>
          <ScrollView contentContainerStyle={styles.pickerContainer}>
            {VALUES.map(value => (
              <View key={value} style={styles.row}>
                <Text style={styles.valueLabel}>{value}</Text>
                <View style={styles.suitRow}>
                  {SUITS.map(suit => (
                    <TouchableOpacity 
                      key={suit} 
                      style={styles.suitBtn}
                      onPress={() => addCard(value, suit)}
                    >
                      <Text style={[styles.suitText, { color: (suit === 'hearts' || suit === 'diamonds') ? '#ff4d4d' : '#fff' }]}>
                        {suit[0].toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Save color="#fff" size={20} />
            <Text style={styles.saveText}>Set Manual Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#0a1a12',
    borderRadius: 20,
    padding: 20,
    height: '80%',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#d4af37',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.7,
  },
  sequenceContainer: {
    maxHeight: 60,
    marginBottom: 20,
  },
  deckCard: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 40,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  pickerContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  valueLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: 30,
  },
  suitRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  suitBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 10,
    borderRadius: 8,
    minWidth: 45,
    alignItems: 'center',
  },
  suitText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: '#1b4332',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default DeckBuilder;
