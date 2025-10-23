// Script para a página de ligação bancária (ligação_bancaria.html)
// Funcionalidades de conexão bancária e notificações

let currentStep = 1;
let selectedBank = '';

// Dados simulados de transações
const mockTransactions = [
    {date: "2025-10-21", description: "Supermercado Continente", amount: -45.80, category: "Alimentação"},
    {date: "2025-10-20", description: "Uber", amount: -6.20, category: "Transporte"},
    {date: "2025-10-19", description: "Netflix", amount: -10.99, category: "Entretenimento"},
    {date: "2025-10-18", description: "Salário", amount: 1200.00, category: "Receita"},
    {date: "2025-10-17", description: "Farmácia", amount: -12.50, category: "Saúde"},
    {date: "2025-10-16", description: "Restaurante", amount: -28.90, category: "Alimentação"},
    {date: "2025-10-15", description: "Combustível", amount: -55.00, category: "Transporte"}
];

function goToStep(step) {
    document.querySelectorAll('.step-container').forEach(el => el.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    currentStep = step;
}

function selectBank(name, id) {
    selectedBank = name;
    document.getElementById('bankTitle').textContent = name;

    // Atualizar logo do banco
    const logos = {
        millennium: 'fa-building',
        cgd: 'fa-landmark',
        santander: 'fa-university',
        novobanco: 'fa-building-columns',
        bpi: 'fa-piggy-bank',
        activobank: 'fa-wallet'
    };

    document.getElementById('bankLogoLarge').innerHTML = `<i class="fas ${logos[id]}"></i>`;
    goToStep(2);
}

function authorizeBank() {
    goToStep(3);
    simulateConnection();
}

function simulateConnection() {
    const messages = [
        "A estabelecer ligação segura",
        "A autenticar credenciais",
        "A importar dados da conta",
        "A processar transações",
        "A categorizar gastos",
        "Quase pronto..."
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
        progress += 16.67;
        document.getElementById('progressBar').style.width = progress + '%';
        document.getElementById('progressText').textContent = Math.round(progress) + '%';

        if (messageIndex < messages.length) {
            document.getElementById('connectingMessage').textContent = messages[messageIndex];
            messageIndex++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadAccountData();
                goToStep(4);
            }, 500);
        }
    }, 1000);
}

function loadAccountData() {
    // Preencher dados da conta
    const ibans = {
        'Millennium BCP': 'PT50 0033 0000 1234 5678 9015 4',
        'Caixa Geral de Depósitos': 'PT50 0035 0000 1234 5678 9015 4',
        'Santander': 'PT50 0018 0000 1234 5678 9015 4',
        'Novo Banco': 'PT50 0007 0000 1234 5678 9015 4',
        'BPI': 'PT50 0010 0000 1234 5678 9015 4',
        'ActivoBank': 'PT50 0023 0000 1234 5678 9015 4'
    };

    document.getElementById('accountIban').textContent = ibans[selectedBank] || 'PT50 0002 0123 1234 5678 9015 4';
    document.getElementById('accountBalance').textContent = '1.275,50 €';
    document.getElementById('transactionsCount').textContent = mockTransactions.length + ' transações';

    // Preencher lista de transações
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    mockTransactions.slice(0, 5).forEach(transaction => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        item.innerHTML = `
            <div class="transaction-icon ${transaction.amount > 0 ? 'positive' : 'negative'}">
                <i class="fas ${transaction.amount > 0 ? 'fa-arrow-down' : 'fa-arrow-up'}"></i>
            </div>
            <div class="transaction-details">
                <span class="transaction-description">${transaction.description}</span>
                <span class="transaction-category">${transaction.category}</span>
            </div>
            <div class="transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}">
                ${transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)} €
            </div>
            <span class="transaction-date">${transaction.date}</span>
        `;
        transactionList.appendChild(item);
    });

    // Guardar transações no localStorage (simulação)
    localStorage.setItem('bankConnected', 'true');
    localStorage.setItem('bankName', selectedBank);
    localStorage.setItem('transactions', JSON.stringify(mockTransactions));

    // Mostrar notificação de sucesso
    showNotification('success', 'Banco Conectado', `Conta ${selectedBank} conectada com sucesso!`);
}

function goToDashboard() {
    showNotification('info', 'Redirecionando', 'A carregar dashboard financeiro...');
    setTimeout(() => {
        window.location.href = 'gestao_e_financas2.html';
    }, 1000);
}
