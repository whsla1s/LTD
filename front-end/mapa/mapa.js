const map = L.map('map').setView([-1.4558, -48.4902], 14); // Mapa em Belém
var coletaSeletiva = 0;

L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=a314e26066124138b9e4c421c8c04e02', {
    attribution: '&copy; OpenCycleMap',
}).addTo(map);

// Locais(Nome, Coordenadas, Zoom)
const locais = [
    { nome: "Praça Batista Campos", lat: -1.459935, lng: -48.489726, zoom: 30 },
    { nome: "Praça da Bandeira", lat: -1.454856, lng: -48.499655, zoom: 30 },
    { nome: "Praça da República", lat: -1.45254, lng: -48.494081, zoom: 17 },
    { nome: "Mangál das Garças", lat: -1.465089, lng: -48.5054, zoom: 17 },
    { nome: "Complexo do Ver-O-Peso", lat: -1.447488, lng: -48.499168, zoom: 16 },
    { nome: "Complexo Feliz Lusitânia", lat: -1.454580, lng: -48.504934, zoom: 18 },
    { nome: "Orla Portal da Amazônia", lat: -1.469925, lng: -48.50215, zoom: 16 }
];

const marcadores = {};

const purpleIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
    shadowUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


locais.forEach(local => {
    const marker = L.marker([local.lat, local.lng], {
        title: local.nome,
        icon: purpleIcon
    }).addTo(map);

    marker.bindTooltip(local.nome, { permanent: false, direction: 'top' });

    marker.on('click', () => {
        focusMap(local.lat, local.lng, local.zoom);
    });

    // Aguarda o DOM carregar o ícone do marcador
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

    marcadores[local.nome] = marker;
});

function focusMap(lat, lng, zoom) {
    map.setView([lat, lng], zoom);
}

window.focusMap = focusMap;

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

map.on('click', function(e) {
    alert("Você clicou no mapa em: " + e.latlng.toString());
});

function mostrarPopup() {
    if (coletaSeletiva <= 0) {
        document.getElementById("popup-modal").style.display = "block";
    }
}
window.mostrarPopup = mostrarPopup;

function fecharPopup() {
    document.getElementById("popup-modal").style.display = "none";
}

window.fecharPopup = fecharPopup;
