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

// ✅ 메뉴 스위치 설정
const switchElement = document.getElementById('s1');
const switchContainer = document.querySelector('.switch');
const switchDot = document.querySelector('.dot');
const sideMenu = document.getElementById('side-menu');
const mainContent = document.getElementById('main-content');


// 초기 로딩 시 메뉴 상태 설정
function initializeMenu() {
    if (window.innerWidth > 1280) {
        openMenu();
    } else {
        closeMenu();
    }
}

// 메뉴 열기
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

// 메뉴 닫기
function closeMenu() {
    sideMenu.classList.add('-translate-x-full');
    sideMenu.classList.remove('translate-x-0');
    switchElement.checked = false;
    switchContainer.classList.replace('bg-[#2B5BBB]', 'bg-gray-300');
    switchDot.classList.remove('translate-x-5', 'translate-x-6');
    
    mainContent.classList.remove('ml-64');
    mainContent.classList.add('mx-auto'); // 가운데 정렬 적용
}

// 스위치 클릭 시 토글 기능
function toggleSideMenu() {
    if (switchElement.checked) {
        closeMenu();
    } else {
        openMenu();
    }
}


// 초기 로딩 시 실행 (DOMContentLoaded 이벤트 추가)
document.addEventListener('DOMContentLoaded', initializeMenu);

// 스위치 클릭 이벤트 추가
switchContainer.addEventListener('click', toggleSideMenu);

// 바깥 클릭 시 메뉴 닫기
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

function toggleSubMenu(event) {
    const mainLink = event.currentTarget;
    const parentLi = mainLink.closest('.group');
    const submenu = parentLi.querySelector('.subUl');
    const arrow = parentLi.querySelector('.subIcon');
    const isOpen = !submenu.classList.contains('max-h-0');

    // 모든 mainLink에서 활성화 해제 (단, 이미 열려 있는 거 다시 닫으려고 누른 경우엔 그대로 유지)
    document.querySelectorAll('.mainLink').forEach(link => {
        link.classList.remove('bg-[#EDF3FF]', 'text-[#2B5BBB]');
    });

    // 모든 서브메뉴 닫기
    document.querySelectorAll('.subUl').forEach(ul => {
        if (ul !== submenu) {  // 클릭된 submenu가 아닌 다른 메뉴는 닫기
            ul.classList.add('max-h-0');
            ul.classList.remove('max-h-96', 'py-2');
        }
    });

    // 모든 화살표 초기화
    document.querySelectorAll('.subIcon').forEach(icon => {
        if (icon !== arrow) {
            icon.classList.remove('rotate-[-90deg]');
        }
    });

    // 서브 메뉴 열기/닫기
    if (submenu.classList.contains('max-h-0')) {
        submenu.classList.remove('max-h-0');
        submenu.classList.add('max-h-96', 'py-2');
        arrow.classList.add('rotate-[-90deg]');
    } else {
        submenu.classList.add('max-h-0');
        submenu.classList.remove('max-h-96', 'py-2');
        arrow.classList.remove('rotate-[-90deg]');
    }


    event.preventDefault();
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.subUl a').forEach(item => {
        item.addEventListener('click', function(e) {
            // 다른 메뉴를 닫기
            document.querySelectorAll('.subUl').forEach(ul => {
                if (!ul.contains(e.target)) {
                    ul.classList.add('max-h-0');
                    ul.classList.remove('max-h-96', 'py-2');
                }
            });

            // 서브 항목 클릭 시 텍스트 색상 변경
            document.querySelectorAll('.subUl a').forEach(link => {
                link.classList.remove('text-[#1E4799]');
            });

            // 현재 클릭 항목에 스타일 적용
            this.classList.add('text-[#1E4799]');

            // 부모 메뉴에 스타일 적용 (비활성화 제거는 하지 않음)
            const parentGroup = this.closest('.group');
            const parentmainLink = parentGroup.querySelector('.mainLink');

            if (parentmainLink) {
                parentmainLink.classList.add('text-[#2B5BBB]');
                parentmainLink.focus();  // 부모 메뉴에 포커스 추가
            }

            // SVG fill 색상 변경
            const svgIcon = parentSubLink.querySelector('.subIconSvg');
            if (svgIcon) {
                svgIcon.querySelector('path').setAttribute('fill', '#2B5BBB');
            }

            e.preventDefault();
        });
    });
});




// ✅ 웹 배너
document.addEventListener("DOMContentLoaded", function () {
    const bannerTexts = document.querySelectorAll(".banner-text");
    let index = 0;

    function changeBanner() {
        bannerTexts.forEach((text, i) => {
            text.classList.toggle("hidden", i !== index);
            text.classList.toggle("opacity-100", i === index);
            text.classList.toggle("opacity-0", i !== index);
        });

        index = (index + 1) % bannerTexts.length;
    }

    let bannerInterval = setInterval(changeBanner, 3000);

    // 마우스 호버 시 정지, 벗어나면 다시 시작
    const bannerContainer = document.querySelector(".banner-container");
    bannerContainer.addEventListener("mouseenter", () => clearInterval(bannerInterval));
    bannerContainer.addEventListener("mouseleave", () => bannerInterval = setInterval(changeBanner, 3000));

    // 드롭다운 기능
    const dropdownToggle = document.getElementById("dropdown-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");

    dropdownToggle.addEventListener("click", function (event) {
        dropdownMenu.classList.toggle("hidden");
        event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
        }
    });
});


// ✅ 모바일 배너 슬라이드, 스와이프 기능
const bannerContainer = document.querySelector('#mobile-banner .banner-container');
const banners = document.querySelectorAll('#mobile-banner .banner-item');
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval; // 자동 슬라이드 인터벌 변수

function showBanner(index) {
    bannerContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
}

function showNextBanner() {
    showBanner((currentIndex + 1) % banners.length);
}

function handleTouchStart(event) {
    clearInterval(autoSlideInterval); // 터치 시작 시 자동 슬라이드 중단
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
    const diffX = touchStartX - touchEndX;
    if (diffX > 50) { // 오른쪽에서 왼쪽으로 스와이프
        if (currentIndex < banners.length - 1) {
            showBanner(currentIndex + 1);
        }
    } else if (diffX < -50) { // 왼쪽에서 오른쪽으로 스와이프
        if (currentIndex > 0) {
            showBanner(currentIndex - 1);
        }
    }
    autoSlideInterval = setInterval(showNextBanner, 3000); // 터치 종료 후 자동 슬라이드 재시작
}

// 초기 실행
showBanner(currentIndex);

// 자동 슬라이드 시작
autoSlideInterval = setInterval(showNextBanner, 3000);

// 이벤트 리스너 추가
bannerContainer.addEventListener('touchstart', handleTouchStart);
bannerContainer.addEventListener('touchmove', handleTouchMove);
bannerContainer.addEventListener('touchend', handleTouchEnd);





// 모바일 배너 버튼 
const banner = document.getElementById("mobile-banner");
const toggleBtn = document.getElementById("mbanner-toggle");

let isExpanded = true;

toggleBtn.addEventListener("click", () => {
    if (isExpanded) {
        banner.style.height = "0px";
        banner.style.paddingTop = "0";
        banner.style.paddingBottom = "0";
        toggleBtn.innerText = "▲";
    } else {
        banner.style.height = "auto";
        banner.style.paddingTop = "0.5rem";  // py-2 = 0.5rem 상하
        banner.style.paddingBottom = "0.5rem";
        toggleBtn.innerText = "▼";
    }
    isExpanded = !isExpanded;
});








