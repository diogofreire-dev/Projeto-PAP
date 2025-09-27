import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      
      <ScrollView style={styles.colorContainer}>
        <View style={styles.colorRow}>
          <View style={[styles.colorCircle, { backgroundColor: '#FFD700' }]} />
          <View style={[styles.colorCircle, { backgroundColor: '#32CD32' }]} />
          <View style={[styles.colorCircle, { backgroundColor: '#FF6347' }]} />
          <View style={[styles.colorCircle, { backgroundColor: '#4169E1' }]} />
          <View style={[styles.colorCircle, { backgroundColor: '#DA70D6' }]} />
        </View>
      </ScrollView>
      
      <View style={styles.createSection}>
        <Text style={styles.createTitle}>Comece a criar!</Text>
        <View style={styles.createAvatar}>
          <Text style={styles.createAvatarText}>?</Text>
        </View>
        <Text style={styles.createSubtitle}>Carlos, 14 anos...</Text>
        
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateClone')}
        >
          <Text style={styles.createButtonText}>Criar Clone</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  colorContainer: {
    flexGrow: 0,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  createSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  createAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  createAvatarText: {
    fontSize: 30,
    color: '#999',
  },
  createSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});