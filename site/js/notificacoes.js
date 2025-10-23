/**
 * Sistema de Notificações Toast
 * Permite mostrar notificações temporárias no canto da tela
 */

class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    init() {
        // Criar container se não existir
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }

    /**
     * Mostra uma notificação toast
     * @param {string} type - Tipo: 'success', 'warning', 'error', 'info'
     * @param {string} title - Título da notificação
     * @param {string} message - Mensagem da notificação
     * @param {number} duration - Duração em ms (padrão: 5000)
     */
    show(type, title, message, duration = 5000) {
        const toast = this.createToast(type, title, message);
        this.container.appendChild(toast);

        // Animação de entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);

        // Auto-remover após duração
        const timeoutId = setTimeout(() => {
            this.removeToast(toast);
        }, duration);

        // Armazenar referência
        const notification = { element: toast, timeoutId };
        this.notifications.push(notification);

        // Atualizar badge se houver
        this.updateBadge();

        return notification;
    }

    /**
     * Cria o elemento toast
     */
    createToast(type, title, message) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icons[type] || 'fa-bell'}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="notificationManager.removeToast(this.parentElement)">
                <i class="fas fa-times"></i>
            </button>
            <div class="toast-progress"></div>
        `;

        return toast;
    }

    /**
     * Remove uma notificação
     */
    removeToast(toast) {
        if (typeof toast === 'object' && toast.classList) {
            // É o elemento
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.parentElement.removeChild(toast);
                }
                this.notifications = this.notifications.filter(n => n.element !== toast);
                this.updateBadge();
            }, 300);
        } else {
            // É o botão close
            const toastElement = toast.closest('.toast');
            this.removeToast(toastElement);
        }
    }

    /**
     * Atualiza o badge de notificações no menu
     */
    updateBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const count = this.notifications.length;
            if (count > 0) {
                badge.textContent = count > 9 ? '9+' : count;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    /**
     * Limpa todas as notificações
     */
    clearAll() {
        this.notifications.forEach(notification => {
            clearTimeout(notification.timeoutId);
            this.removeToast(notification.element);
        });
        this.notifications = [];
    }

    /**
     * Notificações de exemplo para demonstração
     */
    showDemo() {
        const demos = [
            { type: 'success', title: 'Transação Confirmada', message: 'Compra de R$ 150,00 foi processada com sucesso.' },
            { type: 'warning', title: 'Limite de Crédito', message: 'Seu cartão atingiu 85% do limite disponível.' },
            { type: 'error', title: 'Falha na Conexão', message: 'Não foi possível conectar ao banco. Tente novamente.' },
            { type: 'info', title: 'Novo Recurso', message: 'Agora você pode categorizar suas transações automaticamente.' }
        ];

        demos.forEach((demo, index) => {
            setTimeout(() => {
                this.show(demo.type, demo.title, demo.message);
            }, index * 1000);
        });
    }
}

// Instância global
const notificationManager = new NotificationManager();

// Função global para facilitar o uso
function showNotification(type, title, message, duration) {
    return notificationManager.show(type, title, message, duration);
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar CSS se não estiver presente
    if (!document.querySelector('link[href*="notificacoes_toast.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style/notificacoes_toast.css';
        document.head.appendChild(link);
    }
});
