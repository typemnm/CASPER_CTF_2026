// Room 6 - 악성코드 행위 분석

// Initialize
enforceRoomSecurity(6);
startTimer();
updateProgressBar(6);
setupHints();

// Base64 decoder
document.getElementById('decode-btn').addEventListener('click', function() {
    const input = document.getElementById('base64-input').value.trim();
    const resultDiv = document.getElementById('decode-result');
    
    try {
        const decoded = atob(input);
        resultDiv.innerHTML = `<span style="color: var(--text-accent);">✓ 디코딩 성공: ${decoded}</span>`;
    } catch (e) {
        resultDiv.innerHTML = `<span style="color: var(--text-error);">✗ 잘못된 Base64 형식입니다</span>`;
    }
});

// Submit button handler
document.getElementById('submit-btn').addEventListener('click', function() {
    const q1 = document.getElementById('q1').value.trim();
    const q2 = document.getElementById('q2').value.trim();
    const q3Domain = document.getElementById('q3-domain').value.trim().toLowerCase();
    const q3Technique = document.getElementById('q3-technique').value.trim();
    const q4 = document.getElementById('q4').value.trim();
    const q5 = document.getElementById('q5').value.trim();

    // Check all answers
    const allCorrect = 
        q1 === 'Ransomware' &&
        q2 === '레지스트리 Run 키' &&
        q3Domain === 'hidden.evil.com' &&
        q3Technique === 'DNS 터널링' &&
        q4 === '백업 복원 불가능' &&
        q5 === 'Persistence';

    if (allCorrect) {
        showFeedback('✅ 정답입니다! 다음 방으로 이동합니다...', true);
        setTimeout(() => {
            goToNextRoom(6);
        }, 1500);
    } else {
        showFeedback('❌ 다시 분석해보세요. 모든 답이 정확해야 합니다.', false);
    }
});
