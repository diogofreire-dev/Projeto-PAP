// Script para a página de login e segurança (login_segurança.html)
// Funcionalidades de segurança e notificações

function toggleSection(btn) {
    const content = btn.parentElement.nextElementSibling;
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    btn.classList.toggle('active');
}

function togglePassword(btn) {
    const input = btn.previousElementSibling;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.innerHTML = isPassword ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
}

function removeDevice(btn) {
    const device = btn.closest('.device-item');
    device.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        device.remove();
    }, 300);
}

function showConfirmation() {
    alert('Código QR enviado! Escaneie com seu aplicativo autenticador.');
}

// Abrir primeira seção por padrão
window.addEventListener('load', function() {
    const firstSection = document.querySelector('.section-header');
    if (firstSection) {
        const btn = firstSection.querySelector('.toggle-btn');
        const content = firstSection.nextElementSibling;
        content.style.display = 'block';
        btn.classList.add('active');
    }
});

// Adicionar notificações para ações de segurança
document.addEventListener('DOMContentLoaded', function() {
    // Notificações para alteração de senha
    const passwordForm = document.querySelector('.security-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('success', 'Senha Atualizada', 'Sua senha foi alterada com sucesso!');
        });
    }

    // Notificações para remoção de dispositivos
    const removeButtons = document.querySelectorAll('.btn-danger');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deviceName = this.closest('.device-item').querySelector('h3').textContent;
            showNotification('warning', 'Dispositivo Removido', `O dispositivo ${deviceName} foi desconectado.`);
        });
    });

    // Notificações para atualização de dados pessoais
    const personalForm = document.querySelectorAll('.security-form')[1]; // Segundo formulário
    if (personalForm) {
        personalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('success', 'Dados Atualizados', 'Suas informações pessoais foram salvas com sucesso!');
        });
    }
});
