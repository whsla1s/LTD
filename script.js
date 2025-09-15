function mostrarPopup() {
    document.getElementById("popup-overlay").classList.add("active");
}
window.mostrarPopup = mostrarPopup;

function fecharPopup() {
    document.getElementById("popup-overlay").classList.remove("active");
}
window.fecharPopup = fecharPopup;
document.addEventListener('DOMContentLoaded', () => {

    // Função para carregar templates HTML (header, footer)
    const loadHTML = async (url, elementId) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
            const text = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = text;
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Função principal de inicialização
    const initApp = async () => {
        // Carrega o header e o footer em paralelo
        await Promise.all([
            loadHTML('../templates/header.html', 'header-placeholder'),
            loadHTML('../templates/footer.html', 'footer-placeholder')
        ]);

        // --- LÓGICA DA SIDEBAR ---
        // (Executa somente depois que o header foi carregado)
        const openMenuBtn = document.getElementById('open-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const sidebar = document.getElementById('sidebar-menu');
        const overlay = document.getElementById('menu-overlay');

        const openSidebar = () => {
            if (sidebar) sidebar.classList.add('open');
            if (overlay) overlay.classList.add('active');
        };

        const closeSidebar = () => {
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        };

        if (openMenuBtn) openMenuBtn.addEventListener('click', openSidebar);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);

        // --- LÓGICA PARA DESTACAR LINK DA PÁGINA ATUAL ---
        const currentPage = window.location.pathname.split('/')[1] || 'index';
        const activeLink = document.getElementById(`nav-${currentPage}`);
        if (activeLink) {
            document.querySelectorAll('.nav-conteiner-desktop a').forEach(link => link.classList.remove('selecionado'));
            activeLink.classList.add('selecionado');

            // Também destaca na sidebar
            const sidebarLinks = document.querySelectorAll('.sidebar-menu .nav-conteiner a');
            sidebarLinks.forEach(link => {
                if (link.getAttribute('href').includes(currentPage)) {
                    link.classList.add('selecionado');
                } else {
                    link.classList.remove('selecionado');
                }
            });
        }
    };

    // Inicia a aplicação
    initApp();
});
