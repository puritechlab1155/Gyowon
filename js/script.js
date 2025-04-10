// ✅ 화면 크기 변경 시 768px 이하일 때 메뉴 닫기
// window.addEventListener('resize', () => {
//     if (window.innerWidth <= 1024) {
//         sideMenu.classList.add('-translate-x-full');
//         sideMenu.classList.remove('translate-x-0');
//         switchElement.checked = false;
//         switchContainer.classList.replace('bg-[#2B5BBB]', 'bg-gray-300');
//         switchDot.classList.remove('translate-x-6');
//     }
// });

// Optional: Close side menu when clicking outside


const switchElement = document.getElementById('s1');
const switchContainer = document.querySelector('.switch');
const switchDot = document.querySelector('.dot');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementById('main-content');


// ✅ 초기 로딩 시 메뉴 상태 설정
function initializeMenu() {
    if (window.innerWidth > 1280) {
        openMenu();
    } else {
        closeMenu();
    }
}

// ✅ 메뉴 열기
function openMenu() {
    sideMenu.classList.remove('-translate-x-full');
    sideMenu.classList.add('translate-x-0');
    switchElement.checked = true;
    switchContainer.classList.replace('bg-gray-300', 'bg-[#2B5BBB]');
    
    if (window.innerWidth <= 640) {
        switchDot.classList.add('translate-x-5'); // 작은 화면에서는 짧게 이동
    } else {
        switchDot.classList.add('translate-x-6'); // 기본 이동 거리
    }

    mainContent.classList.add('ml-64');
    mainContent.classList.remove('mx-auto'); // 가운데 정렬 해제
}

// ✅ 메뉴 닫기
function closeMenu() {
    sideMenu.classList.add('-translate-x-full');
    sideMenu.classList.remove('translate-x-0');
    switchElement.checked = false;
    switchContainer.classList.replace('bg-[#2B5BBB]', 'bg-gray-300');
    switchDot.classList.remove('translate-x-5', 'translate-x-6');
    
    mainContent.classList.remove('ml-64');
    mainContent.classList.add('mx-auto'); // 가운데 정렬 적용
}

// ✅ 스위치 클릭 시 토글 기능
function toggleSideMenu() {
    if (switchElement.checked) {
        closeMenu();
    } else {
        openMenu();
    }
}


// ✅ 초기 로딩 시 실행 (DOMContentLoaded 이벤트 추가)
document.addEventListener('DOMContentLoaded', initializeMenu);

// ✅ 스위치 클릭 이벤트 추가
switchContainer.addEventListener('click', toggleSideMenu);



// ✅ 바깥 클릭 시 메뉴 닫기
document.addEventListener('click', (event) => {
    if (
        switchElement.checked && 
        !sideMenu.contains(event.target) && 
        !switchContainer.contains(event.target)
    ) {
        closeMenu();
    }
});

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
    const parentLi = event.target.closest('.group');
    
    // 서브 메뉴 토글
    const submenu = parentLi.querySelector('.subUl');
    const arrow = parentLi.querySelector('.subIcon');
    
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
document.querySelectorAll('#qualification-submenu .group .subLink').forEach(item => {
    item.addEventListener('focus', function() {
        // 현재 포커스된 li 요소의 부모 li 요소 선택
        const parentLi = this.closest('.group').parentElement.parentElement;
        
        // 부모 li 요소에 포커스 스타일 적용 (hover 스타일과 동일하게 적용)
        parentLi.querySelector('.subLink').style.color = '#2B5BBB';
    });
    
    item.addEventListener('blur', function() {
        // 포커스 해제 시 부모 li 요소의 포커스 스타일 제거
        const parentLi = this.closest('.group').parentElement.parentElement;
        parentLi.querySelector('.subLink').style.color = '';
    });
});