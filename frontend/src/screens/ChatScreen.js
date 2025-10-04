import AIService from '../services/AIService';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ChatScreen({ route, navigation }) {
  const { clone } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: `Olá! Sou o ${clone.name}. Como posso ajudar?`,
      sender: 'clone',
      timestamp: new Date(),
    },
  ]);
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simular resposta do clone após 1 segundo
      setTimeout(async () => {
        const responseText = await generateCloneResponse(message, clone);
        const cloneResponse = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'clone',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, cloneResponse]);
      }, 1000);
    }
  };
const generateCloneResponse = async (userMessage, cloneData) => {
  // Verificar se IA está configurada
  if (!AIService.isConfigured()) {
    return 'IA não configurada. Adiciona o token do Hugging Face.';
  }

  try {
    // Gerar resposta com IA
    const response = await AIService.generateCloneResponse(
      cloneData.personality || `${cloneData.name}, clone virtual`,
      messages,
      userMessage
    );
    return response;
  } catch (error) {
    console.error('Erro ao gerar resposta:', error);
    return 'Desculpa, tive um problema. Tenta novamente.';
  }
};

  useEffect(() => {
    flatListRef.current?.scrollToEnd();
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.cloneBubble,
      ]}
    >
      <Text style={[
        styles.messageText,
        item.sender === 'user' ? styles.userText : styles.cloneText,
      ]}>
        {item.text}
      </Text>
      <Text style={styles.timestamp}>
        {item.timestamp.toLocaleTimeString('pt-PT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={[styles.avatar, { backgroundColor: clone.color }]}>
          <Text style={styles.avatarText}>{clone.name.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.cloneName}>{clone.name}</Text>
          <Text style={styles.cloneStatus}>Online</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.menuButton}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreve uma mensagem..."
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, message.trim() ? styles.sendButtonActive : null]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 28,
    marginRight: 15,
    color: '#007AFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  cloneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cloneStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  menuButton: {
    fontSize: 24,
    color: '#666',
  },
  messagesList: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  cloneBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: 'white',
  },
  cloneText: {
    color: '#1a1a1a',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#007AFF',
  },
  sendButtonText: {
    fontSize: 20,
    color: 'white',
  },
});