function calculate() {
    const input = document.getElementById('input-field').value;
    let result;

    try {
        result = eval(input);
    } catch (e) {
        result = "Error in calculation";
    }

    document.getElementById('result').textContent = result;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
    });
}
