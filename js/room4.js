// Room 4 - 취약점 분석실

// Initialize
enforceRoomSecurity(4);
startTimer();
updateProgressBar(4);
setupHints();

// Submit button handler
document.getElementById('submit-btn').addEventListener('click', function() {
    const q1 = document.getElementById('q1').value.trim();
    const q2 = document.getElementById('q2').value.trim();
    const q3 = document.getElementById('q3').value.trim();
    const q4 = document.getElementById('q4').value.trim();

    // Check answers
    const allCorrect = 
        q1 === 'SQL Injection' &&
        q2 === 'XSS' &&
        q3 === 'CSRF' &&
        q4 === 'Insecure Deserialization';

    if (allCorrect) {
        showFeedback('✅ 정답입니다! 다음 방으로 이동합니다...', true);
        setTimeout(() => {
            goToNextRoom(4);
        }, 1500);
    } else {
        showFeedback('❌ 다시 분석해보세요. 모든 답이 정확해야 합니다.', false);
    }
});
