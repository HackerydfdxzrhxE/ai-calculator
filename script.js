function calculate() {
  const input = document.getElementById('input').value.trim();
  try {
    // Try evaluating directly with math.js
    const result = math.evaluate(input);
    document.getElementById('result').innerText = `Answer: ${result}`;
  } catch (e) {
    // Try natural language interpretation
    interpretNaturalLanguage(input);
  }
}

function interpretNaturalLanguage(input) {
  const cleaned = input
    .toLowerCase()
    .replace(/what is|calculate|find|the|of|/gi, '')
    .replace('plus', '+')
    .replace('minus', '-')
    .replace('times', '*')
    .replace('divided by', '/')
    .replace('square root', 'sqrt')
    .replace('factorial', '!')
    .trim();

  try {
    const result = math.evaluate(cleaned);
    document.getElementById('result').innerText = `Answer: ${result}`;
  } catch {
    document.getElementById('result').innerText = "Sorry, couldn't understand that.";
  }
}

// Voice input
function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support voice input.');
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('input').value = transcript;
    calculate();
  };

  recognition.onerror = (event) => {
    document.getElementById('result').innerText = "Voice error: " + event.error;
  };
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
