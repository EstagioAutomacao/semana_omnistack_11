// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./service-worker.js');
//   });
// }

if ('serviceWorker' in navigator) {
  // Registra um service worker hospeadado na raiz do
  // site usando o escopo padrão
  navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
    console.log('Service worker  registrado com sucesso:', registration);
  }).catch(function(error) {
    console.log('Falha ao Registrar o Service Worker:', error);
  });
} else {
  console.log('Service workers não suportado!');
}