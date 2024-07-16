let coinCount = 0;
let initialEnergy = 20;
let currentEnergy = initialEnergy;
let level = 1;
let coinsNeededForNextLevel = 16; // تعداد سکه‌های لازم برای رسیدن به سطح بعدی

let energyRecoveryRate = 1; // میزان انرژی که هر دقیقه بازیابی می‌شود
let recoveryInterval = 3000; // زمان بازیابی بر حسب میلی‌ثانیه (هر دقیقه)

let lastClickTime = 0;
let clickIntervals = [];

document.getElementById('current-energy').textContent = currentEnergy;
document.getElementById('initial-energy').textContent = initialEnergy;
updateLevelDisplay(); // بروزرسانی نمایش سطح

function incrementCoins() {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTime;

    if (currentEnergy > 0) {
        if (timeSinceLastClick < 100) {
            clickIntervals.push(timeSinceLastClick);
            if (clickIntervals.length > 2) {
                clickIntervals.shift();
                const [firstInterval, secondInterval] = clickIntervals;
                if (firstInterval < 100 && secondInterval < 100) {
                    showOverlay();
                    return;
                }
            }
        } else {
            clickIntervals = [];
        }

        lastClickTime = currentTime;

        coinCount += 1;
        currentEnergy -= 1;
        document.getElementById('coin-count').textContent = coinCount;
        document.getElementById('current-energy').textContent = currentEnergy;
        updateEnergyBar();

        // چک کردن آیا بازیکن به سطح بعدی رسیده است
        if (coinCount >= coinsNeededForNextLevel) {
            levelUp();
        }
    } else {
        alert("Energy depleted!");
    }
}

function updateEnergyBar() {
    const energyFill = document.getElementById('energy-fill');
    const percentage = (currentEnergy / initialEnergy) * 100;
    energyFill.style.width = percentage + '%';
}

function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
}

function closeGame() {
    window.close();
}

function recoverEnergy() {
    if (currentEnergy < initialEnergy) {
        currentEnergy += energyRecoveryRate;
        if (currentEnergy > initialEnergy) {
            currentEnergy = initialEnergy;
        }
        document.getElementById('current-energy').textContent = currentEnergy;
        updateEnergyBar();
    }
}

function levelUp() {
    level++;
    coinsNeededForNextLevel += 50; // افزایش تعداد سکه‌های لازم برای هر سطح
    updateLevelDisplay();
}

function updateLevelDisplay() {
    document.querySelector('.level span').textContent = `Level ${level}`;
}

setInterval(recoverEnergy, recoveryInterval);
document.querySelector('.coin').addEventListener('click', incrementCoins);
