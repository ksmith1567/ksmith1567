window.onload = function() {
    const phoneNumberPopup = createPopup('Please enter your phone number', 'OK', 'Cancel');
    document.body.appendChild(phoneNumberPopup);

    const popupOkButton = phoneNumberPopup.querySelector('#popup-ok');
    const popupCancelButton = phoneNumberPopup.querySelector('#popup-cancel');

    popupOkButton.addEventListener('click', function() {
        phoneNumberPopup.style.display = 'none';
        startDialing();
    });

    popupCancelButton.addEventListener('click', function() {
        phoneNumberPopup.style.display = 'none';
    });
};

function createPopup(message, okText, cancelText) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '1000';
    popup.innerHTML = `
        <h2>${message}</h2>
        <button id="popup-ok" style="margin: 10px; padding: 10px 20px;">${okText}</button>
        ${cancelText ? `<button id="popup-cancel" style="margin: 10px; padding: 10px 20px;">${cancelText}</button>` : ''}
    `;
    return popup;
}

function startDialing() {
    shuffleRotaryNumbers();
}

const rotary = document.querySelector('.rotary');
const phoneNumberBox = document.getElementById('phone-number');
const numberEls = Array.from(document.querySelectorAll('.number'));
const confirmationBox = document.getElementById('confirmation-box');
const confirmationMessage = document.getElementById('confirmation-message');
const yayBox = document.getElementById('yay-box');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');

let isDragging = false;
let startAngle = 0;
let currentRotation = 0;
let lastRotation = 0;
const maxRotation = 325;
let phoneNumber = '';
let dragSpeedFactor = 1;
let angleMap = [];

const resetDuration = 8;
let resetInProgress = false;

function getAngle(e, centerX, centerY) {
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    return Math.atan2(y, x) * (180 / Math.PI);
}

function normalizeAngle(angle) {
    return (angle + 360) % 360;
}

function formatPhoneNumber(number) {
    let padded = number.padStart(10, '0');
    return padded.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

function shuffleRotaryNumbers() {
    const shuffled = [...numberEls].sort(() => Math.random() - 0.5);
    angleMap = [];

    shuffled.forEach((el, i) => {
        const angle = 30 + i * -30;
        el.style.transform = `rotate(${angle}deg) translateY(-80px) rotate(${-angle}deg)`;
        angleMap.push({ angleLimit: 30 + i * 30, number: el.textContent });
    });

    angleMap.sort((a, b) => a.angleLimit - b.angleLimit);
}

function getDialedNumber(rotation) {
    let selected = angleMap[0].number;
    for (let i = 0; i < angleMap.length; i++) {
        if (rotation >= angleMap[i].angleLimit) {
            selected = angleMap[i].number;
        } else {
            break;
        }
    }
    return selected;
}

document.addEventListener('mousedown', (e) => {
    if (!rotary.contains(e.target)) return;
    if (phoneNumber.length >= 10 || resetInProgress) return;

    shuffleRotaryNumbers();

    const rect = rotary.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    startAngle = normalizeAngle(getAngle(e, centerX, centerY));
    isDragging = true;
    rotary.style.transition = '';
    dragSpeedFactor = 0.5 + Math.random() * 1.5;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging || phoneNumber.length >= 10 || resetInProgress) return;

    const rect = rotary.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const currentAngle = normalizeAngle(getAngle(e, centerX, centerY));
    let delta = normalizeAngle(currentAngle - startAngle) * dragSpeedFactor;

    if (delta < lastRotation) return;

    let rotation = Math.min(delta, maxRotation);
    rotary.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    currentRotation = rotation;
    lastRotation = rotation;
});

document.addEventListener('mouseup', () => {
    if (!isDragging || phoneNumber.length >= 10 || resetInProgress) return;

    isDragging = false;
    const dialedNumber = getDialedNumber(currentRotation);

    if (phoneNumber.length < 10) {
        phoneNumber += dialedNumber;
        phoneNumberBox.textContent = formatPhoneNumber(phoneNumber);
    }

    if (phoneNumber.length === 10) {
        setTimeout(showConfirmation, 500);
    }

    resetInProgress = true;
    rotary.style.transition = `transform ${resetDuration}s ease-in-out`;
    rotary.style.transform = `translate(-50%, -50%) rotate(0deg)`;

    currentRotation = 0;
    lastRotation = 0;

    setTimeout(() => {
        rotary.style.transition = '';
        rotary.style.transform = `translate(-50%, -50%) rotate(0deg)`;
        resetInProgress = false;
    }, resetDuration * 1000);
});

function showConfirmation() {
    const confirmationPopup = createPopup(`Is this your phone number? ${formatPhoneNumber(phoneNumber)}`, 'Yes', 'No');
    document.body.appendChild(confirmationPopup);

    const yesButton = confirmationPopup.querySelector('#popup-ok');
    const noButton = confirmationPopup.querySelector('#popup-cancel');

    yesButton.addEventListener('click', () => {
        const yayPopup = createPopup('Yay! Your phone number is confirmed.', 'OK', '');
        document.body.appendChild(yayPopup);

        setTimeout(() => {
            yayPopup.style.display = 'none';
            restartDialing();
        }, 2000);
        confirmationPopup.style.display = 'none';
    });

    noButton.addEventListener('click', () => {
        const tryAgainPopup = createPopup('Try again!', 'OK', '');
        document.body.appendChild(tryAgainPopup);

        const tryAgainButton = tryAgainPopup.querySelector('#popup-ok');
        tryAgainButton.addEventListener('click', () => {
            tryAgainPopup.style.display = 'none';
            restartDialing();
        });

        confirmationPopup.style.display = 'none';
    });
}

function restartDialing() {
    phoneNumber = '';
    phoneNumberBox.textContent = '';
    resetInProgress = false;
    shuffleRotaryNumbers();
}
