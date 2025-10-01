import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert 
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [cloneDescription, setCloneDescription] = useState('');
  
  // Clones guardados (exemplo)
const savedClones = [
  { id: 1, name: 'David', color: '#FFD700', personality: 'francês, 18 anos, irritante' },
  { id: 2, name: 'Maria', color: '#32CD32', personality: 'simpática, 20 anos, portuguesa' },
  { id: 3, name: 'João', color: '#FF6347', personality: 'engraçado, 25 anos, brasileiro' },
];

  const handleCreateClone = () => {
    if (cloneDescription.trim()) {
      Alert.alert('Clone criado!', `Descrição: ${cloneDescription}`);
      setCloneDescription('');
    } else {
      Alert.alert('Erro', 'Por favor, descreva o seu clone');
    }
  };

const handleClonePress = (clone) => {
  navigation.navigate('Chat', { clone });
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      {/* Botão Favoritos toggle */}
      <TouchableOpacity style={styles.favoritesButton}>
        <Text style={styles.favoritesIcon}>❤️</Text>
        <Text style={styles.favoritesText}>Favoritos</Text>
        <Text style={styles.favoritesToggle}>off</Text>
      </TouchableOpacity>
      
      {/* Clones guardados */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.clonesContainer}
        contentContainerStyle={styles.clonesContent}
      >
        {savedClones.map((clone) => (
          <TouchableOpacity
            key={clone.id}
            style={[styles.cloneCircle, { backgroundColor: clone.color }]}
            onPress={() => handleClonePress(clone)}
          >
            <Text style={styles.cloneInitial}>
              {clone.name.charAt(0)}
            </Text>
          </TouchableOpacity>
        ))}
        
        {/* Botão para adicionar novo */}
        <TouchableOpacity style={styles.addCloneCircle}>
          <Text style={styles.addCloneText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Seção criar clone */}
      <View style={styles.createSection}>
        <Text style={styles.createTitle}>Comece a criar!</Text>
        
        <View style={styles.createAvatar}>
          <Text style={styles.createAvatarText}>?</Text>
        </View>
        
        {/* Campo de texto para descrever clone */}
        <TextInput
          style={styles.cloneInput}
          placeholder="Carlos, 14 anos, português, irritante..."
          placeholderTextColor="#999"
          value={cloneDescription}
          onChangeText={setCloneDescription}
          multiline={true}
          numberOfLines={2}
          textAlignVertical="top"
        />
        
        <TouchableOpacity 
          style={[styles.createButton, cloneDescription.trim() ? styles.createButtonActive : null]}
          onPress={handleCreateClone}
        >
          <Text style={[styles.createButtonText, cloneDescription.trim() ? styles.createButtonTextActive : null]}>
            Criar Clone
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
  },
  favoritesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 15,
    paddingVertical: 5,
  },
  favoritesIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  favoritesText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  favoritesToggle: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  clonesContainer: {
    paddingLeft: 20,
    marginBottom: 30,
  },
  clonesContent: {
    paddingRight: 20,
  },
  cloneCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cloneInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  addCloneCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e9ecef',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addCloneText: {
    fontSize: 30,
    color: '#007AFF',
    fontWeight: '300',
  },
  createSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'space-between',
  },
  createTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  createAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  createAvatarText: {
    fontSize: 30,
    color: '#999',
    fontWeight: '300',
  },
  cloneInput: {
    width: '100%',
    minHeight: 70,
    maxHeight: 90,
    borderColor: '#e9ecef',
    borderWidth: 1.5,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  createButton: {
    width: '100%',
    backgroundColor: '#e9ecef',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  createButtonActive: {
    backgroundColor: '#007AFF',
  },
  createButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButtonTextActive: {
    color: 'white',
  },
});