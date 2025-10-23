// Script para a página inicial (index1.html)
// Exemplo de notificações e eventos do menu

document.addEventListener('DOMContentLoaded', function() {
    // Simular algumas notificações de exemplo
    setTimeout(() => {
        showNotification('success', 'Bem-vindo!', 'Sistema de notificações ativado.');
    }, 1000);

    setTimeout(() => {
        showNotification('info', 'Dica', 'Clique no ícone de sino para ver todas as notificações.');
    }, 3000);

    // Adicionar evento ao menu de notificações
    const menuNotifications = document.getElementById('menu-notifications');
    if (menuNotifications) {
        menuNotifications.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'notificacoes.html';
        });
    }
});
