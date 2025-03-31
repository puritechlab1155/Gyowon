const switchElement = document.getElementById('s1');
const switchContainer = document.querySelector('.switch');
const switchDot = document.querySelector('.dot');
const sideMenu = document.getElementById('side-menu');

// Toggle functionality for both checkbox and switch
function toggleSideMenu() {
    // Toggle checkbox state
    switchElement.checked = !switchElement.checked;

    // Update switch visual
    if (switchElement.checked) {
        switchContainer.classList.replace('bg-gray-300', 'bg-[#2B5BBB]');
        if (window.innerWidth <= 640) {
            switchDot.classList.add('translate-x-5'); // 작은 화면에서는 짧게 이동
        } else {
            switchDot.classList.add('translate-x-6'); // 기본 이동 거리
        }
        sideMenu.classList.remove('-translate-x-full');
        sideMenu.classList.add('translate-x-0');
    } else {
        switchContainer.classList.replace('bg-[#2B5BBB]', 'bg-gray-300');
        switchDot.classList.remove('translate-x-5', 'translate-x-6');
        sideMenu.classList.add('-translate-x-full');
        sideMenu.classList.remove('translate-x-0');
    }
}

// Add click event to the switch
switchContainer.addEventListener('click', toggleSideMenu);

// Optional: Close side menu when clicking outside
document.addEventListener('click', (event) => {
    if (
        switchElement.checked && 
        !sideMenu.contains(event.target) && 
        !switchContainer.contains(event.target)
    ) {
        toggleSideMenu();
    }
});
// 서브 메뉴와 화살표 회전 토글 함수
function toggleSubMenu(event) {
    // 클릭된 a 태그 요소의 부모 li 선택
    const parentLi = event.target.closest('li');
    
    // 서브 메뉴 토글
    const submenu = parentLi.querySelector('ul');
    const arrow = parentLi.querySelector('img');
    
    // 서브 메뉴 열기/닫기
    submenu.classList.toggle('max-h-0');
    submenu.classList.toggle('max-h-full');
    submenu.classList.toggle('p-2');
    
    // 화살표 회전
    arrow.classList.toggle('rotate-[-90deg]');
    
    // 링크의 기본 동작 막기
    event.preventDefault();
}

// 서브 메뉴의 각 li 요소에 포커스 이벤트 리스너 추가
document.querySelectorAll('#qualification-submenu li a').forEach(item => {
    item.addEventListener('focus', function() {
        // 현재 포커스된 li 요소의 부모 li 요소 선택
        const parentLi = this.closest('li').parentElement.parentElement;
        
        // 부모 li 요소에 포커스 스타일 적용 (hover 스타일과 동일하게 적용)
        parentLi.querySelector('a').style.color = '#2B5BBB';
    });
    
    item.addEventListener('blur', function() {
        // 포커스 해제 시 부모 li 요소의 포커스 스타일 제거
        const parentLi = this.closest('li').parentElement.parentElement;
        parentLi.querySelector('a').style.color = '';
    });
});
