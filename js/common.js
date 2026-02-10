// CASPER CTF 2026 - Common Functions
// Timer, Hints, Progress Bar, Room Security, localStorage Management

// Constants
const TOTAL_ROOMS = 7;
const TIME_LIMIT = 45 * 60; // 45 minutes in seconds
const HINT_PENALTY = 2 * 60; // 2 minutes penalty per hint

// Initialize game state
function initGame() {
    if (!localStorage.getItem('gameStartTime')) {
        localStorage.setItem('gameStartTime', Date.now());
        localStorage.setItem('hintsUsed', '0');
        localStorage.setItem('timePenalty', '0');
        localStorage.setItem('clearedRooms', JSON.stringify([]));
    }
}

// Get elapsed time in seconds
function getElapsedTime() {
    const startTime = parseInt(localStorage.getItem('gameStartTime') || Date.now());
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const penalty = parseInt(localStorage.getItem('timePenalty') || '0');
    return elapsed + penalty;
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update timer display
function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    
    const elapsed = getElapsedTime();
    timerElement.textContent = formatTime(elapsed);
    
    // Check if time limit exceeded
    if (elapsed >= TIME_LIMIT) {
        timerElement.style.color = '#ff4444';
    }
}

// Start timer
function startTimer() {
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Update progress bar
function updateProgressBar(currentRoom) {
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (progressText) {
        progressText.textContent = `방 ${currentRoom}/${TOTAL_ROOMS}`;
    }
    
    if (progressFill) {
        const percentage = (currentRoom / TOTAL_ROOMS) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

// Hint system
function setupHints() {
    const hintButtons = document.querySelectorAll('.hint-btn');
    
    hintButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const hintText = document.getElementById(`hint-${index + 1}`);
            if (hintText && hintText.classList.contains('hidden')) {
                // Apply penalty
                const currentPenalty = parseInt(localStorage.getItem('timePenalty') || '0');
                localStorage.setItem('timePenalty', String(currentPenalty + HINT_PENALTY));
                
                // Increment hints used
                const hintsUsed = parseInt(localStorage.getItem('hintsUsed') || '0');
                localStorage.setItem('hintsUsed', String(hintsUsed + 1));
                
                // Show hint
                hintText.classList.remove('hidden');
                btn.disabled = true;
                btn.textContent = '힌트 사용됨 (+2분)';
                
                updateTimer();
            }
        });
    });
}

// Mark room as cleared
function clearRoom(roomNumber) {
    const cleared = JSON.parse(localStorage.getItem('clearedRooms') || '[]');
    if (!cleared.includes(roomNumber)) {
        cleared.push(roomNumber);
        localStorage.setItem('clearedRooms', JSON.stringify(cleared));
    }
}

// Check if room is cleared
function isRoomCleared(roomNumber) {
    const cleared = JSON.parse(localStorage.getItem('clearedRooms') || '[]');
    return cleared.includes(roomNumber);
}

// Check room access (prevent skipping rooms)
function checkRoomAccess(requiredRoom) {
    // Room 1 is always accessible
    if (requiredRoom === 1) return true;
    
    // Check if previous room is cleared
    return isRoomCleared(requiredRoom - 1);
}

// Redirect to appropriate room if access denied
function enforceRoomSecurity(currentRoom) {
    if (!checkRoomAccess(currentRoom)) {
        // Find the last cleared room
        const cleared = JSON.parse(localStorage.getItem('clearedRooms') || '[]');
        const lastCleared = cleared.length > 0 ? Math.max(...cleared) : 0;
        const nextRoom = lastCleared + 1;
        
        if (nextRoom === 1) {
            window.location.href = 'index.html';
        } else {
            window.location.href = `room${nextRoom}.html`;
        }
    }
}

// Navigate to next room
function goToNextRoom(currentRoom) {
    clearRoom(currentRoom);
    
    if (currentRoom >= TOTAL_ROOMS) {
        window.location.href = 'success.html';
    } else {
        window.location.href = `room${currentRoom + 1}.html`;
    }
}

// Simple hash for answer obfuscation
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Check answer with hash
function checkAnswer(input, expectedHash) {
    const inputNormalized = input.trim().toLowerCase();
    return simpleHash(inputNormalized) === expectedHash;
}

// Show feedback message
function showFeedback(message, isSuccess = false) {
    const feedback = document.getElementById('feedback');
    if (!feedback) return;
    
    feedback.textContent = message;
    feedback.className = isSuccess ? 'feedback success' : 'feedback error';
    feedback.classList.remove('hidden');
    
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 3000);
}

// Reset game
function resetGame() {
    if (confirm('게임을 처음부터 다시 시작하시겠습니까?')) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}

// Calculate security grade
function calculateGrade() {
    const elapsed = getElapsedTime();
    const hints = parseInt(localStorage.getItem('hintsUsed') || '0');
    
    // Scoring: lower is better
    const score = elapsed + (hints * 120); // Each hint = 2 min penalty already applied
    
    if (score <= 1800 && hints === 0) return 'S+'; // 30 min or less, no hints
    if (score <= 2100) return 'A'; // 35 min
    if (score <= 2700) return 'B'; // 45 min
    return 'C';
}

// Export for modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initGame,
        getElapsedTime,
        formatTime,
        updateTimer,
        startTimer,
        updateProgressBar,
        setupHints,
        clearRoom,
        isRoomCleared,
        checkRoomAccess,
        enforceRoomSecurity,
        goToNextRoom,
        simpleHash,
        checkAnswer,
        showFeedback,
        resetGame,
        calculateGrade
    };
}
