const rotary = document.querySelector('.rotary');
const phoneNumberBox = document.getElementById('phone-number');
let isDragging = false;
let startAngle = 0;
let currentRotation = 0;
let lastRotation = 0; // Track the last rotation value to prevent counterclockwise movement
const maxRotation = 325; // Max rotation angle (clockwise only)
let phoneNumber = ''; // Store the phone number

// Start the dragging process when mouse down
document.addEventListener('mousedown', (e) => {
    if (!rotary.contains(e.target)) return;
    if (phoneNumber.length >= 10) return; // Stop if phone number is already full (10 digits)
    
    const rect = rotary.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    startAngle = getAngle(e, centerX, centerY) - currentRotation;
    isDragging = true;
    rotary.style.transition = ''; // Disable transition during drag
});

// Track mouse movement for dragging
document.addEventListener('mousemove', (e) => {
    if (!isDragging || phoneNumber.length >= 10) return; // Stop if phone number is full
    
    const rect = rotary.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let angle = getAngle(e, centerX, centerY);
    let rotation = angle - startAngle;
    
    if (rotation < 0) rotation += 360; // Allow full 360 rotation, but will clamp below to maxRotation

    // Only allow clockwise rotation (rotation should increase)
    if (rotation < lastRotation) {
        rotation = lastRotation; // Prevent counterclockwise rotation
    }

    if (rotation > maxRotation) rotation = maxRotation; // Clamp rotation to maxRotation

    // Update the rotary dial's rotation
    rotary.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    currentRotation = rotation;
    lastRotation = rotation; // Update the last rotation for the next move
});

// When the mouse is released, register the final number and reset dial
document.addEventListener('mouseup', () => {
    if (phoneNumber.length >= 10) return; // Don't add numbers if the phone number is full

    let dialedNumber = getDialedNumber(currentRotation); // Get the number based on rotation

    if (phoneNumber.length < 10) {
        phoneNumber += dialedNumber; // Add the number to the phone number
        phoneNumberBox.textContent = formatPhoneNumber(phoneNumber); // Display the formatted phone number
    }

    // Reset the rotary dial to 0 after a brief transition
    rotary.style.transition = 'transform 0.5s ease';
    rotary.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    currentRotation = 0;
    lastRotation = 0;  // Reset the last rotation when dial is reset

    // Wait for the transition to finish before enabling interaction again
    setTimeout(() => {
        rotary.style.transition = ''; // Enable transition again
    }, 500);

    isDragging = false; // Reset dragging state
});

// Function to calculate the angle based on mouse position
function getAngle(e, centerX, centerY) {
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    return Math.atan2(y, x) * (180 / Math.PI);
}

// Map rotation value to dialed number (1-9, 0)
function getDialedNumber(rotation) {
    const rotationThresholds = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300]; // Angles for 1-9 and 0
    for (let i = 0; i < rotationThresholds.length; i++) {
        if (rotation < rotationThresholds[i]) {
            return i === 0 ? 10 : i; // Return 10 for '0' and i for other numbers
        }
    }
    return 10; // If we reach here, it's '0'
}

// Function to format phone number as ###-###-####
function formatPhoneNumber(number) {
    // Pad the number to ensure it's 10 digits long (in case of fewer digits)
    while (number.length < 10) {
        number = "0" + number;
    }

    // Split the phone number into groups of 3 digits and join with hyphens
    let formattedNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    
    return formattedNumber;
}
