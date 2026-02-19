// Room 3 - 암호 해독실

// Initialize
enforceRoomSecurity(3);
startTimer();
updateProgressBar(3);
setupHints();

// Submit button handler
document.getElementById('submit-btn').addEventListener('click', function() {
    const qa = document.getElementById('qa').value.trim();
    const qb = document.getElementById('qb').value.trim().toLowerCase();
    const qc = document.getElementById('qc').value.trim();

    // Check answers
    const qaCorrect = qa === '모드 1 (ECB)';
    const qbCorrect = qb === 'padding oracle' || qb === 'padding oracle (attack)';
    const qcCorrect = qc === '사전 공격 (Dictionary Attack)' || qc === '사전 공격';

    if (qaCorrect && qbCorrect && qcCorrect) {
        showFeedback('✅ 정답입니다! 다음 방으로 이동합니다...', true);
        setTimeout(() => {
            goToNextRoom(3);
        }, 1500);
    } else {
        showFeedback('❌ 다시 분석해보세요. 모든 답이 정확해야 합니다.', false);
    }
});
