// Room 5 - 네트워크 침투

// Initialize
enforceRoomSecurity(5);
startTimer();
updateProgressBar(5);
setupHints();

// Submit button handler
document.getElementById('submit-btn').addEventListener('click', function() {
    const step1 = document.getElementById('step1').value.trim();
    const step2 = document.getElementById('step2').value.trim();
    const step3 = document.getElementById('step3').value.trim();
    const step4 = document.getElementById('step4').value.trim();
    const q2 = document.getElementById('q2').value.trim();

    // Correct path: Internet → Web Server (443) → DB Server (3306) → Admin PC → Backup Server (22)
    const pathCorrect = 
        step1 === '웹서버' &&
        step2 === 'DB서버' &&
        step3 === '관리자PC' &&
        step4 === '백업서버';

    const q2Correct = q2 === 'DB서버에서 관리자PC로의 비정상 연결';

    if (pathCorrect && q2Correct) {
        showFeedback('✅ 정답입니다! 다음 방으로 이동합니다...', true);
        setTimeout(() => {
            goToNextRoom(5);
        }, 1500);
    } else {
        showFeedback('❌ 다시 분석해보세요. 방화벽 규칙과 네트워크 경로를 확인하세요.', false);
    }
});
