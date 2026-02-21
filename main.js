// AI Clothing Classifier - main.js

const URL = "https://teachablemachine.withgoogle.com/models/9OEeUeU7l/";
let model, webcam, labelContainer, maxPredictions;

// Theme Management
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

// AI Model Initialization
async function init() {
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = true;
    startBtn.textContent = "모델 로딩 중...";

    try {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Setup webcam
        const flip = true;
        webcam = new tmImage.Webcam(400, 400, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        // UI Updates
        const webcamContainer = document.getElementById("webcam-container");
        webcamContainer.innerHTML = ''; // Remove placeholder
        webcamContainer.appendChild(webcam.canvas);

        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ''; // Clear previous
        
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

        startBtn.style.display = 'none'; // Hide button after start
    } catch (error) {
        console.error("AI 시작 오류:", error);
        startBtn.disabled = false;
        startBtn.textContent = "오류 발생 (다시 시도)";
        alert("카메라 권한이 필요하거나 모델을 불러올 수 없습니다.");
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const probability = (prediction[i].probability * 100).toFixed(0);
        const bar = document.getElementById(`bar-${i}`);
        const probText = document.getElementById(`prob-${i}`);
        
        if (bar && probText) {
            bar.style.width = probability + "%";
            probText.textContent = probability + "%";
            
            // Highlight the most likely class
            if (prediction[i].probability > 0.5) {
                bar.style.backgroundColor = "var(--primary-color)";
            } else {
                bar.style.backgroundColor = "var(--text-secondary)";
            }
        }
    }
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', init);

// Form Submission (Simulated)
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    // Let the form submit normally to Formspree, but we can add UI feedback
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = "보내는 중...";
});
