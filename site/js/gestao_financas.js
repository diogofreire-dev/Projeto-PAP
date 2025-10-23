// Script para a página de gestão e finanças (gestao_e_financas.html)
// Funcionalidades do gráfico financeiro e menu

const menuFinance = document.getElementById('menu-finance');
const financeContent = document.getElementById('financeContent');

if (menuFinance && financeContent) {
    menuFinance.addEventListener('click', async function(e) {
        e.preventDefault();
        if (financeContent.style.display === 'block') {
            financeContent.style.display = 'none';
        } else {
            financeContent.style.display = 'block';
            financeContent.scrollIntoView({ behavior: 'smooth' });

            if (!window.financeChartCreated) {
                try {
                    const response = await fetch('api/financas.php');
                    const result = await response.json();
                    if (result.error) {
                        console.error(result.error);
                        showNotification('error', 'Erro', 'Não foi possível carregar os dados financeiros.');
                        return;
                    }

                    const ctx = document.getElementById('financeChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: result.labels,
                            datasets: [{
                                label: 'Gastos por Categoria (R$)',
                                data: result.data,
                                backgroundColor: [
                                    '#4e73df',
                                    '#1cc88a',
                                    '#36b9cc',
                                    '#f6c23e',
                                    '#e74a3b',
                                    '#858796',
                                    '#fd7e14'
                                ]
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { position: 'bottom' },
                                title: { display: true, text: 'Resumo dos Gastos por Categoria' }
                            }
                        }
                    });

                    window.financeChartCreated = true;
                    showNotification('success', 'Gráfico Carregado', 'Dados financeiros atualizados com sucesso.');
                } catch (error) {
                    console.error('Erro ao carregar dados do banco:', error);
                    showNotification('error', 'Erro de Conexão', 'Não foi possível conectar ao servidor.');
                }
            }
        }
    });
}
