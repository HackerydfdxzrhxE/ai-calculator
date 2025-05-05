function insert(val) {
  document.getElementById('input').value += val;
}

function clearInput() {
  document.getElementById('input').value = '';
}

function calculate() {
  const input = document.getElementById('input').value.trim();
  try {
    const result = math.evaluate(input);
    document.getElementById('result').innerText = 'Answer: ' + result;
    addHistory(input + ' = ' + result);
  } catch {
    interpretNaturalLanguage(input);
  }
}

function interpretNaturalLanguage(input) {
  const cleaned = input.toLowerCase()
    .replace(/what is|calculate|find|the|of/gi, '')
    .replace('plus', '+')
    .replace('minus', '-')
    .replace('times', '*')
    .replace('divided by', '/')
    .replace('square root', 'sqrt')
    .replace('factorial', '!')
    .trim();
  try {
    const result = math.evaluate(cleaned);
    document.getElementById('result').innerText = 'Answer: ' + result;
    addHistory(input + ' → ' + result);
  } catch {
    document.getElementById('result').innerText = 'Error: Could not evaluate';
  }
}

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
}

function toggleMode() {
  const sci = document.getElementById('scientific');
  sci.style.display = sci.style.display === 'none' ? 'flex' : 'none';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function addHistory(entry) {
  const history = document.getElementById('history');
  const line = document.createElement('div');
  line.textContent = entry;
  history.prepend(line);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
