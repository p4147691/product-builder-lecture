const numbersContainer = document.querySelector('.numbers-container');
const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme Logic
let currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
    currentTheme = 'dark';
    localStorage.setItem('theme', 'dark');
}

if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '🌙';
} else {
    body.classList.remove('dark-theme');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    let theme = 'light';
    if (body.classList.contains('dark-theme')) {
        theme = 'dark';
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }
    localStorage.setItem('theme', theme);
});

const generateLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    // 생성된 번호를 로컬 스토리지에 저장
    localStorage.setItem('lastNumbers', JSON.stringify(sortedNumbers));
    return sortedNumbers;
};

const displayNumbers = (numbers) => {
    numbersContainer.innerHTML = '';
    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numbersContainer.appendChild(numberDiv);
    }
};

generateBtn.addEventListener('click', () => {
    const lottoNumbers = generateLottoNumbers();
    displayNumbers(lottoNumbers);
});

// Initial Load Logic
const savedNumbers = localStorage.getItem('lastNumbers');
if (savedNumbers) {
    displayNumbers(JSON.parse(savedNumbers));
} else {
    const initialNumbers = generateLottoNumbers();
    displayNumbers(initialNumbers);
}
