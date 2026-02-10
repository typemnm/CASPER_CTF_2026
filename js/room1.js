// Room 1 - 침해 로그 분석
// Answers are hashed with simpleHash function from common.js

// Initialize
enforceRoomSecurity(1);
startTimer();
updateProgressBar(1);
setupHints();

// Correct answers (normalized)
const answers = {
    q1: '10.0.14.33',
    q2: 'sql injection',
    q3: 'sh3ll.php',
    q4: '4444',
    q5: 'crontab'
};

// Submit button handler
document.getElementById('submit-btn').addEventListener('click', function() {
    const userAnswers = {
        q1: document.getElementById('q1').value.trim(),
        q2: document.getElementById('q2').value.trim(),
        q3: document.getElementById('q3').value.trim(),
        q4: document.getElementById('q4').value.trim(),
        q5: document.getElementById('q5').value.trim()
    };

    // Check all answers
    let allCorrect = true;
    for (let key in answers) {
        if (userAnswers[key].toLowerCase() !== answers[key].toLowerCase()) {
            allCorrect = false;
            break;
        }
    }

    if (allCorrect) {
        showFeedback('✅ 정답입니다! 다음 방으로 이동합니다...', true);
        setTimeout(() => {
            goToNextRoom(1);
        }, 1500);
    } else {
        showFeedback('❌ 다시 분석해보세요. 모든 답이 정확해야 합니다.', false);
    }
});

// Enter key support
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('submit-btn').click();
        }
    });
});
