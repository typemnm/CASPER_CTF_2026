// Room 7 - 최종 대응 (Drag & Drop)

// Initialize
enforceRoomSecurity(7);
startTimer();
updateProgressBar(7);
setupHints();

// Drag and Drop functionality
let draggedElement = null;
const killchainList = document.getElementById('killchain');
const items = killchainList.querySelectorAll('.draggable-item');

// Touch and mouse events for drag and drop
items.forEach(item => {
    // Mouse events
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    
    // Touch events for mobile
    item.addEventListener('touchstart', handleTouchStart, {passive: false});
    item.addEventListener('touchmove', handleTouchMove, {passive: false});
    item.addEventListener('touchend', handleTouchEnd, {passive: false});
});

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    items.forEach(item => item.classList.remove('drag-over'));
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (this !== draggedElement) {
        const rect = this.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        
        if (e.clientY < midpoint) {
            this.parentNode.insertBefore(draggedElement, this);
        } else {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        }
    }
    return false;
}

function handleDrop(e) {
    e.stopPropagation();
    return false;
}

// Touch support for mobile
let touchY = 0;
let touchElement = null;

function handleTouchStart(e) {
    touchElement = this;
    touchY = e.touches[0].clientY;
    this.classList.add('dragging');
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const currentY = touch.clientY;
    
    // Find element under touch point
    const elementUnder = document.elementFromPoint(touch.clientX, currentY);
    const draggableUnder = elementUnder?.closest('.draggable-item');
    
    if (draggableUnder && draggableUnder !== touchElement) {
        const rect = draggableUnder.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        
        if (currentY < midpoint) {
            killchainList.insertBefore(touchElement, draggableUnder);
        } else {
            killchainList.insertBefore(touchElement, draggableUnder.nextSibling);
        }
    }
}

function handleTouchEnd(e) {
    if (touchElement) {
        touchElement.classList.remove('dragging');
        touchElement = null;
    }
}

// Get current order
function getCurrentOrder() {
    const items = Array.from(killchainList.querySelectorAll('.draggable-item'));
    return items.map(item => parseInt(item.getAttribute('data-order')));
}

// Check if order is correct
function isOrderCorrect() {
    const currentOrder = getCurrentOrder();
    const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    return JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
}

// Submit button handler
document.getElementById('submit-btn').addEventListener('click', function() {
    const priority1 = document.getElementById('priority1').value;
    const priority2 = document.getElementById('priority2').value;
    const priority3 = document.getElementById('priority3').value;

    // Check killchain order
    const killchainCorrect = isOrderCorrect();

    // Check priorities: e (격리) → b (C2 차단) → g (백도어 제거)
    const priorityCorrect = 
        priority1 === 'e' &&
        priority2 === 'b' &&
        priority3 === 'g';

    if (killchainCorrect && priorityCorrect) {
        showFeedback('✅ 완벽합니다! 서버를 성공적으로 복구했습니다! 탈출 성공!', true);
        setTimeout(() => {
            goToNextRoom(7);
        }, 2000);
    } else {
        let message = '❌ ';
        if (!killchainCorrect) {
            message += '킬체인 순서를 확인하세요. ';
        }
        if (!priorityCorrect) {
            message += '대응 우선순위를 다시 생각해보세요.';
        }
        showFeedback(message, false);
    }
});
