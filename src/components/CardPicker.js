import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { SUITS, VALUES, COLORS } from '../logic/SolitaireLogic';
import { X } from 'lucide-react-native';

const CardPicker = ({ isVisible, onClose, onSelect }) => {
  const renderItem = ({ item: value }) => (
    <View style={styles.row}>
      <Text style={styles.valueText}>{value}</Text>
      <View style={styles.suitContainer}>
        {SUITS.map(suit => (
          <TouchableOpacity 
            key={suit} 
            style={[styles.suitBtn, { backgroundColor: COLORS[suit] === 'red' ? '#ff4d4d22' : '#ffffff11' }]}
            onPress={() => onSelect(value, suit)}
          >
            <Text style={[styles.suitText, { color: COLORS[suit] === 'red' ? '#ff4d4d' : '#fff' }]}>
              {suit[0].toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Card to Place</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#fff" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={VALUES}
            keyExtractor={item => item}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#1b4332',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '70%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  valueText: {
    color: '#d4af37',
    fontSize: 18,
    fontWeight: '700',
    width: 40,
  },
  suitContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  suitBtn: {
    padding: 10,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  suitText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default CardPicker;
