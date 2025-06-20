function mostrarPopup() {
    document.getElementById("popup-overlay").classList.add("active");
}
window.mostrarPopup = mostrarPopup;

function fecharPopup() {
    document.getElementById("popup-overlay").classList.remove("active");
}
window.fecharPopup = fecharPopup;