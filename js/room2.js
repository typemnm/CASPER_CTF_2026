// Room 2 - 메모리 포렌식

// Initialize
enforceRoomSecurity(2);
startTimer();
updateProgressBar(2);
setupHints();

// Submit button handler
document.getElementById('submit-btn').addEventListener('click', function() {
    // Question 1: Malicious PIDs
    const selectedPIDs = [];
    document.querySelectorAll('#pid-891, #pid-892, #pid-1337').forEach(cb => {
        if (cb.checked) selectedPIDs.push(cb.value);
    });
    const correctPIDs = ['891', '892', '1337'];
    const pidsCorrect = selectedPIDs.length === 3 && 
                        correctPIDs.every(pid => selectedPIDs.includes(pid)) &&
                        !document.getElementById('pid-567').checked &&
                        !document.getElementById('pid-1024').checked;

    // Question 2: Initial access
    const q2 = document.getElementById('q2').value.trim();
    const q2Correct = q2 === '웹셸 경유';

    // Question 3: C2 server
    const q3 = document.getElementById('q3').value.trim();
    const q3Correct = q3 === '45.33.32.156:8443';

    // Question 4: Suspicious reasons
    const selectedReasons = [];
    if (document.getElementById('reason-1').checked) selectedReasons.push('비정상적 경로');
    if (document.getElementById('reason-2').checked) selectedReasons.push('높은 리소스');
    const reasonsCorrect = selectedReasons.length === 2 &&
                          selectedReasons.includes('비정상적 경로') &&
                          selectedReasons.includes('높은 리소스') &&
                          !document.getElementById('reason-3').checked &&
                          !document.getElementById('reason-4').checked;

    // Check all answers
    if (pidsCorrect && q2Correct && q3Correct && reasonsCorrect) {
        showFeedback('✅ 정답입니다! 다음 방으로 이동합니다...', true);
        setTimeout(() => {
            goToNextRoom(2);
        }, 1500);
    } else {
        showFeedback('❌ 다시 분석해보세요. 모든 답이 정확해야 합니다.', false);
    }
});
