addEventListener('DOMContentLoaded', function () {
    // Inicializa o mapa
    const map = L.map('map').setView([-1.4558, -48.4902], 14); // Mapa em Belém

    // Adiciona a camada de tiles
    L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=a314e26066124138b9e4c421c8c04e02', {
        attribution: '&copy; OpenCycleMap',
    }).addTo(map);

    // Ícone personalizado para marcadores
    const purpleIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
        shadowUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Objeto para armazenar marcadores
    const marcadores = {};
    const locais = [];

    // Função para buscar locais e verificar coleta seletiva
    async function carregarLocais() {
        try {
            // Busca locais do banco de dados
            const response = await fetch('../backend/buscar_locais.php');
            const data = await response.json();

            // Preenche o array de locais
            data.forEach(local => {
                locais.push({
                    id: local.id,
                    nome: local.nome,
                    lat: parseFloat(local.lat),
                    lng: parseFloat(local.lng),
                    zoom: parseInt(local.zoom)
                });
            });

            // Cria marcadores e botões após carregar os dados
            locais.forEach(local => {
                // Cria o marcador
                const marker = L.marker([local.lat, local.lng], { icon: purpleIcon, title: local.nome }).addTo(map);
                marker.bindPopup(`<b>${local.nome}</b><br>Latitude: ${local.lat}<br>Longitude: ${local.lng}`);
                marcadores[local.nome] = marker;

                // Adiciona evento de clique no marcador para focar o mapa
                marker.on('click', () => {
                    focusMap(local.id);
                    verificarColetaSeletiva(local.id); // Verifica coleta seletiva ao clicar
                });

                // Adiciona evento de hover no marcador
                marker.on('add', () => {
                    const button = document.querySelector(`button[data-local="${local.nome}"]`);
                    if (button) {
                        button.addEventListener('mouseenter', () => {
                            const icon = marker._icon;
                            if (icon) icon.classList.add('marcador-hover');
                        });

                        button.addEventListener('mouseleave', () => {
                            const icon = marker._icon;
                            if (icon) icon.classList.remove('marcador-hover');
                        });
                    }
                });

                // Cria botão na sidebar
                const button = document.createElement('button');
                button.textContent = local.nome;
                button.setAttribute('data-local', local.nome);
                button.addEventListener('click', () => {
                    focusMap(local.id);
                    verificarColetaSeletiva(local.id); // Verifica coleta seletiva ao clicar no botão
                });
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.appendChild(button);
                }
            });

            // Associa eventos de hover aos botões da sidebar
            document.querySelectorAll('.sidebar button').forEach(button => {
                const nomeLocal = button.getAttribute('data-local');
                const marker = marcadores[nomeLocal];

                if (marker) {
                    button.addEventListener('mouseenter', () => {
                        const icon = marker._icon;
                        if (icon) icon.classList.add('marcador-hover');
                    });

                    button.addEventListener('mouseleave', () => {
                        const icon = marker._icon;
                        if (icon) icon.classList.remove('marcador-hover');
                    });
                }
            });
        } catch (error) {
            console.error('Erro ao carregar locais:', error);
        }
    }

    // Função para focar o mapa em um local específico
    function focusMap(idLocal) {
        const local = locais.find(l => l.id === idLocal);
        if (local) {
            map.setView([local.lat, local.lng], local.zoom);
        } else {
            map.setView([-1.4558, -48.4902], 14);
        }
    }

    window.focusMap = focusMap;

    // Função para verificar se o local tem coleta seletiva
    async function verificarColetaSeletiva(idLocal) {
        try {
            // Faz uma requisição para verificar se há lixeiras associadas ao local
            const response = await fetch(`../backend/verificar_coleta.php?id_local=${idLocal}`);
            const data = await response.json();

            if (!data.tem_coleta) {
                mostrarPopupMapa(); // Mostra popup se não houver coleta seletiva
            }
        } catch (error) {
            console.error('Erro ao verificar coleta seletiva:', error);
        }
    }

    // Função para mostrar o popup
    function mostrarPopupMapa() {
        const popup = document.getElementById('popup-modal');
        if (popup) {
            popup.style.display = 'block';
        }
    }
    window.mostrarPopupMapa = mostrarPopupMapa;

    // Função para fechar o popup
    function fecharPopupMapa() {
        const popup = document.getElementById('popup-modal');
        if (popup) {
            popup.style.display = 'none';
        }
    }
    window.fecharPopup = fecharPopup;

    // Evento de clique no mapa
    map.on('click', function (e) {
        alert('Você clicou no mapa em: ' + e.latlng.toString());
        
    });

    // Carrega os locais ao iniciar
    carregarLocais();
});