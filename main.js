// AI Smart Hub - main.js

const URL = "https://teachablemachine.withgoogle.com/models/9OEeUeU7l/";
let model, webcam, labelContainer, maxPredictions;
let isWebcamRunning = false;

// --- Theme Management ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.className = savedTheme + '-theme';
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    body.className = newTheme + '-theme';
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

// --- AI Model Logic ---

// Load model if not already loaded
async function ensureModelLoaded() {
    if (!model) {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        prepareLabelUI();
    }
}

function prepareLabelUI() {
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        const labelName = model.getClassLabels()[i];
        resultItem.innerHTML = `
            <div class="label-info">
                <span class="class-name">${labelName}</span>
                <span class="probability" id="prob-${i}">0%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" id="bar-${i}"></div>
            </div>
        `;
        labelContainer.appendChild(resultItem);
    }
}

// Webcam Mode
async function startWebcam() {
    await ensureModelLoaded();
    const startBtn = document.getElementById('start-btn');
    const imagePreview = document.getElementById('image-preview');
    
    startBtn.disabled = true;
    startBtn.textContent = "웹캠 준비 중...";
    imagePreview.style.display = 'none';

    try {
        const flip = true;
        webcam = new tmImage.Webcam(400, 400, flip);
        await webcam.setup();
        await webcam.play();
        isWebcamRunning = true;
        window.requestAnimationFrame(loop);

        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = ''; 
        webcamContainer.appendChild(webcam.canvas);
        
        startBtn.style.display = 'none';
    } catch (error) {
        console.error("Webcam Error:", error);
        alert("카메라를 시작할 수 없습니다. 권한을 확인해주세요.");
        startBtn.disabled = false;
        startBtn.textContent = "🎥 실시간 분류 시작";
    }
}

async function loop() {
    if (!isWebcamRunning) return;
    webcam.update();
    await predict(webcam.canvas);
    window.requestAnimationFrame(loop);
}

// Image File Mode
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Stop webcam if running
    if (isWebcamRunning) {
        isWebcamRunning = false;
        if (webcam) webcam.stop();
        document.getElementById('start-btn').style.display = 'inline-flex';
        document.getElementById('start-btn').disabled = false;
        document.getElementById('start-btn').textContent = "🎥 실시간 분류 시작";
    }

    await ensureModelLoaded();

    const reader = new FileReader();
    reader.onload = async function(e) {
        const img = document.getElementById('image-preview');
        img.src = e.target.result;
        img.style.display = 'block';
        
        // Remove canvas if exists
        const webcamContainer = document.getElementById("webcam-container");
        const canvas = webcamContainer.querySelector('canvas');
        if (canvas) canvas.remove();

        // Predict after image is loaded
        img.onload = async () => {
            await predict(img);
        };
    };
    reader.readAsDataURL(file);
}

async function predict(imageElement) {
    const prediction = await model.predict(imageElement);
    for (let i = 0; i < maxPredictions; i++) {
        const probability = (prediction[i].probability * 100).toFixed(0);
        const bar = document.getElementById(`bar-${i}`);
        const probText = document.getElementById(`prob-${i}`);
        
        if (bar && probText) {
            bar.style.width = probability + "%";
            probText.textContent = probability + "%";
            bar.style.backgroundColor = prediction[i].probability > 0.5 ? "var(--primary-color)" : "var(--text-secondary)";
        }
    }
}

// --- Lotto Logic ---
function generateLottoNumbers() {
    const container = document.querySelector('.numbers-container');
    container.innerHTML = '';
    
    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    
    sortedNumbers.forEach((num, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.className = 'lotto-ball';
            ball.textContent = num;
            
            // Apply different colors based on number range
            if (num <= 10) ball.style.background = 'radial-gradient(circle at 30% 30%, #facc15, #eab308)';
            else if (num <= 20) ball.style.background = 'radial-gradient(circle at 30% 30%, #60a5fa, #2563eb)';
            else if (num <= 30) ball.style.background = 'radial-gradient(circle at 30% 30%, #f87171, #dc2626)';
            else if (num <= 40) ball.style.background = 'radial-gradient(circle at 30% 30%, #94a3b8, #475569)';
            else ball.style.background = 'radial-gradient(circle at 30% 30%, #4ade80, #16a34a)';
            
            container.appendChild(ball);
        }, index * 100);
    });
}

// --- Event Listeners ---
document.getElementById('start-btn').addEventListener('click', startWebcam);
document.getElementById('image-upload').addEventListener('change', handleFileUpload);
document.getElementById('generate-btn').addEventListener('click', generateLottoNumbers);

// Initial Lotto Generation
generateLottoNumbers();
