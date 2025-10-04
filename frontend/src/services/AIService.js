const GROQ_API_KEY = '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';
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

class AIService {
  async generateCloneResponse(clonePersonality, conversationHistory, userMessage) {
    try {
      const messages = [
        {
          role: 'system',
          content: `Tu és um clone virtual: ${clonePersonality}. Responde em português de Portugal, mantém a personalidade, respostas curtas (1-2 frases).`
        },
        {
          role: 'user',
          content: userMessage
        }
      ];

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Modelo ATUAL e disponível
          messages: messages,
          temperature: 0.7,
          max_tokens: 100,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro API Groq:', response.status, errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();

    } catch (error) {
      console.error('Erro na IA:', error);
      return 'Desculpa, estou com problemas. Tenta novamente.';
    }
  }

  isConfigured() {
    return GROQ_API_KEY && GROQ_API_KEY !== 'SEU_TOKEN_GROQ_AQUI';
  }
}

export default new AIService();