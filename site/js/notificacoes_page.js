// Script para a página de notificações (notificacoes.html)
// Funcionalidades de gerenciamento de notificações

// Dados das notificações (simulação)
let notifications = [
    {
        id: 1,
        type: 'success',
        title: 'Conta bancária conectada com sucesso',
        message: 'A sua conta do Millennium BCP foi conectada. As transações dos últimos 90 dias foram importadas automaticamente.',
        time: 'Há 2 horas',
        read: false,
        actions: ['viewTransaction']
    },
    {
        id: 2,
        type: 'warning',
        title: 'Dispositivo desconectado',
        message: 'O dispositivo iPhone - Safari foi desconectado da sua conta por motivos de segurança.',
        time: 'Há 5 horas',
        read: false,
        actions: ['viewSecurity']
    },
    {
        id: 3,
        type: 'info',
        title: 'Atualização disponível',
        message: 'Uma nova versão da aplicação está disponível. Atualize para ter acesso às últimas funcionalidades.',
        time: 'Há 1 dia',
        read: false,
        actions: ['updateApp']
    },
    {
        id: 4,
        type: 'success',
        title: 'Senha alterada com sucesso',
        message: 'A sua senha foi alterada com sucesso. Se não foi você, contacte o suporte imediatamente.',
        time: 'Há 2 dias',
        read: true,
        actions: ['viewSecurity']
    },
    {
        id: 5,
        type: 'error',
        title: 'Falha na sincronização',
        message: 'Não foi possível sincronizar as transações do banco. Verifique a sua conexão e tente novamente.',
        time: 'Há 3 dias',
        read: true,
        actions: ['retrySync']
    },
    {
        id: 6,
        type: 'info',
        title: 'Bem-vindo ao sistema',
        message: 'Obrigado por se juntar à nossa plataforma. Explore todas as funcionalidades disponíveis.',
        time: 'Há 1 semana',
        read: true,
        actions: ['viewTutorial']
    }
];

// Funções de filtro
function filterNotifications(filter) {
    const items = document.querySelectorAll('.notification-item');

    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (filter === 'unread') {
            item.style.display = item.classList.contains('unread') ? 'flex' : 'none';
        } else {
            item.style.display = item.classList.contains(filter) ? 'flex' : 'none';
        }
    });

    updateCounts();
}

// Atualizar contadores
function updateCounts() {
    const allCount = document.querySelectorAll('.notification-item').length;
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const successCount = document.querySelectorAll('.notification-item.success').length;
    const warningCount = document.querySelectorAll('.notification-item.warning').length;
    const errorCount = document.querySelectorAll('.notification-item.error').length;
    const infoCount = document.querySelectorAll('.notification-item.info').length;

    document.querySelector('[data-filter="all"] .count').textContent = allCount;
    document.querySelector('[data-filter="unread"] .count').textContent = unreadCount;
    document.querySelector('[data-filter="success"] .count').textContent = successCount;
    document.querySelector('[data-filter="warning"] .count').textContent = warningCount;
    document.querySelector('[data-filter="error"] .count').textContent = errorCount;
    document.querySelector('[data-filter="info"] .count').textContent = infoCount;

    // Atualizar badge do menu
    const menuBadge = document.querySelector('#menu-notifications .notification-badge');
    if (menuBadge) {
        menuBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        menuBadge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
}

// Marcar como lida
function markAsRead(btn) {
    const item = btn.closest('.notification-item');
    item.classList.remove('unread');
    item.classList.add('read');
    updateCounts();
    showNotification('success', 'Notificação Marcada', 'Notificação marcada como lida.');
}

// Marcar todas como lidas
function markAllAsRead() {
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
        item.classList.remove('unread');
        item.classList.add('read');
    });
    updateCounts();
    showNotification('success', 'Todas Marcadas', 'Todas as notificações foram marcadas como lidas.');
}

// Apagar notificação
function deleteNotification(btn) {
    const item = btn.closest('.notification-item');
    item.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        item.remove();
        updateCounts();
        checkEmptyState();
    }, 300);
    showNotification('warning', 'Notificação Removida', 'Notificação removida com sucesso.');
}

// Limpar todas as notificações
function clearAllNotifications() {
    if (confirm('Tem certeza que deseja limpar todas as notificações?')) {
        const items = document.querySelectorAll('.notification-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    item.remove();
                    if (index === items.length - 1) {
                        updateCounts();
                        checkEmptyState();
                    }
                }, 300);
            }, index * 50);
        });
        showNotification('warning', 'Notificações Limpa', 'Todas as notificações foram removidas.');
    }
}

// Verificar estado vazio
function checkEmptyState() {
    const items = document.querySelectorAll('.notification-item');
    const emptyState = document.querySelector('.empty-state');
    const list = document.querySelector('.notifications-list');

    if (items.length === 0) {
        emptyState.style.display = 'block';
        list.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        list.style.display = 'block';
    }
}

// Ações das notificações
function viewTransaction() {
    window.location.href = 'gestao_e_financas2.html';
}

function viewSecurity() {
    window.location.href = 'login_segurança.html';
}

function updateApp() {
    showNotification('info', 'Atualizando', 'A aplicação está sendo atualizada...');
}

function retrySync() {
    showNotification('info', 'Sincronizando', 'Tentando sincronizar novamente...');
    setTimeout(() => {
        showNotification('success', 'Sucesso', 'Sincronização concluída com sucesso!');
    }, 2000);
}

function viewTutorial() {
    showNotification('info', 'Tutorial', 'Abrindo tutorial...');
}

// Event listeners para filtros
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterNotifications(this.dataset.filter);
        });
    });

    updateCounts();
});
