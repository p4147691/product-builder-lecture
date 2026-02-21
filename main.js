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
    const webcamContainer = document.getElementById("webcam-container");
    const placeholder = document.getElementById("placeholder");
    
    startBtn.disabled = true;
    startBtn.textContent = "웹캠 준비 중...";
    
    // Hide image preview
    imagePreview.style.display = 'none';
    placeholder.style.display = 'none';

    try {
        const flip = true;
        webcam = new tmImage.Webcam(400, 400, flip);
        await webcam.setup();
        await webcam.play();
        isWebcamRunning = true;
        window.requestAnimationFrame(loop);

        webcamContainer.innerHTML = ''; 
        webcamContainer.appendChild(webcam.canvas);
        webcamContainer.style.display = 'block';
        
        startBtn.style.display = 'none';
    } catch (error) {
        console.error("Webcam Error:", error);
        alert("카메라를 시작할 수 없습니다. 권한을 확인해주세요.");
        startBtn.disabled = false;
        startBtn.textContent = "🎥 실시간 분류 시작";
        placeholder.style.display = 'flex';
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

    const startBtn = document.getElementById('start-btn');
    const imagePreview = document.getElementById('image-preview');
    const webcamContainer = document.getElementById("webcam-container");
    const placeholder = document.getElementById("placeholder");

    // Stop webcam if running
    if (isWebcamRunning) {
        isWebcamRunning = false;
        if (webcam) {
            webcam.stop();
        }
    }
    
    // UI Reset for File Mode
    webcamContainer.style.display = 'none';
    placeholder.style.display = 'none';
    startBtn.style.display = 'inline-flex';
    startBtn.disabled = false;
    startBtn.textContent = "🎥 실시간 분류 시작";

    await ensureModelLoaded();

    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        
        // Wait for image to load before predicting
        imagePreview.onload = async () => {
            await predict(imagePreview);
        };
    };
    reader.readAsDataURL(file);
}

async function predict(imageElement) {
    if (!model) return;
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
