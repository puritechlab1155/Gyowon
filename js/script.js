//✅ 화면 크기 변경 시 1280px 이하일 때 메뉴 닫기
window.addEventListener('resize', () => {
    if (window.innerWidth <= 1280) {
        sideMenu.classList.add('-translate-x-full');
        sideMenu.classList.remove('translate-x-0');
        switchElement.checked = false;
        switchContainer.classList.replace('bg-[#2B5BBB]', 'bg-gray-300');
        switchDot.classList.remove('translate-x-6');
    }
    else {
        sideMenu.classList.remove('-translate-x-full');
        sideMenu.classList.add('translate-x-0');
        switchElement.checked = true;
        switchContainer.classList.replace('bg-gray-300', 'bg-[#2B5BBB]');
        switchDot.classList.add('translate-x-6');
        mainContent.classList.add('ml-64');
        mainContent.classList.remove('mx-auto');
    }
});

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

// ✅  메뉴 열기
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

    mainContent.classList.add('ml-64'); // 본문 영역을 왼쪽으로 64px만큼 밀어서 사이드 메뉴가 열린 공간 확보.
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

// ✅ 뒤로가기
document.addEventListener('DOMContentLoaded', function() {
    const goBackButton = document.getElementById('goBackButton');

    if (goBackButton) {
        goBackButton.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 링크 동작 방지
            window.history.back(); // 이전 페이지로 이동
        });
    }
});

// ✅ 탑버튼
document.addEventListener('DOMContentLoaded', function() {
    const topButton = document.getElementById('topButton');

    if (topButton) {
        topButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ✅ 사이드 메뉴 포커싱 효과
document.addEventListener('DOMContentLoaded', function () {
    const keywordLinkMap = {
        'dashboard': 'dashboardLink',
        'user': 'userLink',
        'training': 'trainingLink',
        'student': 'studentLink',
        'graduate': 'graduateLink',
        'qualify': 'qualifyLink',
        'admin': 'adminLink',
        'mail': 'mailLink',
        'setting': 'settingLink',
    };

    const currentPage = window.location.pathname.split('/').pop(); // ex) userList.html
    let activeMainMenu = null;
    let activeSubMenu = null;

    // 모든 서브메뉴 닫기 함수
    function closeAllSubmenus() {
        document.querySelectorAll('.subUl').forEach(ul => {
            ul.classList.add('max-h-0');
            ul.classList.remove('max-h-150', 'py-2');

            const group = ul.closest('.group');
            if (group) {
                const arrow = group.querySelector('.subIcon');
                if (arrow) {
                    arrow.classList.remove('rotate-[-90deg]');
                }
                // 저장
                const mainLink = group.querySelector('.mainLink');
                if (mainLink?.id) {
                    localStorage.setItem(mainLink.id, 'closed');
                }
            }
        });
    }

    // 1. 현재 페이지가 어떤 메인 메뉴에 해당하는지 매핑 키워드로 찾기
    for (const keyword in keywordLinkMap) {
        if (currentPage.includes(keyword)) {
            activeMainMenu = keywordLinkMap[keyword];
            break;
        }
    }

    // 2. 서브메뉴 하이라이트 처리 및 서브메뉴 자동 열기
    if (activeMainMenu) {
        const mainMenuElement = document.getElementById(activeMainMenu);
        if (mainMenuElement) {
            localStorage.setItem('activeMenu', activeMainMenu); // 초기 로드시 활성 메뉴 저장
            mainMenuElement.focus(); // 초기 로드시 포커스 설정
            const parentLi = mainMenuElement.closest('.group');
            if (parentLi) {
                const subMenuLinks = parentLi.querySelectorAll('.subUl a');
                subMenuLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        activeSubMenu = link;
                        link.classList.add('active', 'text-[#1E4799]', 'bg-[#EDF3FF]');
                    }
                });

                const submenu = parentLi.querySelector('.subUl');
                const arrow = parentLi.querySelector('.subIcon');
                if (submenu) {
                    submenu.classList.remove('max-h-0');
                    submenu.classList.add('max-h-150', 'py-2');
                }
                if (arrow) {
                    arrow.classList.add('rotate-[-90deg]');
                }
            } else {
                // 서브메뉴가 없는 메인 메뉴인 경우 모든 서브메뉴 닫기
                closeAllSubmenus();
            }
        }
    }

    // 3. 서브메뉴 열고닫는 토글 함수 + 상태 저장
    function toggleSubMenu(event, forceOpen = false) {
        event.preventDefault();
        event.stopPropagation();

        const mainLink = event.currentTarget;
        const parentLi = mainLink.closest('.group');
        const submenu = parentLi.querySelector('.subUl');
        const arrow = parentLi.querySelector('.subIcon');

        const isOpen = !submenu.classList.contains('max-h-0');

        if (!forceOpen && !isOpen) {
            closeAllSubmenus();
        }

        if (forceOpen || submenu.classList.contains('max-h-0')) {
            submenu.classList.remove('max-h-0');
            submenu.classList.add('max-h-150', 'py-2');
            arrow.classList.add('rotate-[-90deg]');
            mainLink.classList.add('active');
            localStorage.setItem(mainLink.id, 'open');
        } else {
            submenu.classList.add('max-h-0');
            submenu.classList.remove('max-h-150', 'py-2');
            arrow.classList.remove('rotate-[-90deg]');
            mainLink.classList.remove('active');
            localStorage.setItem(mainLink.id, 'closed');
        }
    }

    // 4. 각 메인 메뉴에 이벤트 연결
    document.querySelectorAll('.mainLink').forEach(link => {
        link.setAttribute('tabindex', '0');
        const submenu = link.nextElementSibling;
        link.addEventListener('click', e => {
            e.stopPropagation();
            document.querySelectorAll('.mainLink').forEach(l => {
                if (l !== link) l.classList.remove('active');
            });
            link.classList.add('active');
            link.focus();
            localStorage.setItem('activeMenu', link.id);
            if (submenu && submenu.classList.contains('subUl')) {
                toggleSubMenu(e);
            } else {
                closeAllSubmenus();
            }
        });
    });

    // 5. 서브메뉴 클릭 시 이벤트 중단 + 포커스 설정
    document.querySelectorAll('.subUl a').forEach(link => {
        link.setAttribute('tabindex', '0');
        link.classList.add('focus:bg-[#EDF3FF]');
        link.addEventListener('click', e => {
            e.stopPropagation();

            // 모든 서브메뉴에서 active 제거
            document.querySelectorAll('.subUl a').forEach(l => l.classList.remove('active', 'text-[#1E4799]', 'bg-[#EDF3FF]'));
            link.classList.add('active', 'text-[#1E4799]', 'bg-[#EDF3FF]');
            const mainLink = link.closest('.group')?.querySelector('.mainLink');
            if (mainLink) {
                document.querySelectorAll('.mainLink').forEach(l => l.classList.remove('active'));
                mainLink.classList.add('active');
                localStorage.setItem('activeMenu', mainLink.id);
                mainLink.focus();
            }
        });
    });

    // 6. 로컬 스토리지 기반으로 서브메뉴 상태 복원
    function restoreSubMenuState() {
        // 메인 메뉴 포커스 상태 복원
        const activeMenuId = localStorage.getItem('activeMenu');
        document.querySelectorAll('.mainLink').forEach(link => {
            if (link.id === activeMenuId) {
                link.classList.add('active');
                link.setAttribute('tabindex', '0');
                setTimeout(() => link.focus(), 10);
            } else {
                link.classList.remove('active');
            }
            const savedState = localStorage.getItem(link.id);
            if (savedState === 'open') {
                const event = { preventDefault: () => {}, stopPropagation: () => {}, currentTarget: link };
                toggleSubMenu(event, true);
            }
        });
    }

    // 7. 초기화 실행
    restoreSubMenuState();

    // 8. 메뉴가 열릴 때 활성 메인 메뉴에 포커스 설정
    const sideMenu = document.getElementById('side-menu');
    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (sideMenu && sideMenu.classList.contains('translate-x-0')) {
                    restoreSubMenuState();
                }
            }
        }
    });

    if (sideMenu) {
        observer.observe(sideMenu, { attributes: true });
    }
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




// ✅ 모바일 배너 슬라이드 + 스와이프 + 드롭다운 통합
const mobileBannerContainer = document.querySelector('#mobile-banner .banner-container');
let banners;
let currentIndex = 1;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval;
const itemWidthPercentage = 100;

function updateBanners() {
    banners = document.querySelectorAll('#mobile-banner .banner-container .banner-item');
}

// 슬라이드 복제 (앞뒤)
function cloneSlides() {
    const originalBanners = Array.from(document.querySelectorAll('#mobile-banner .banner-container .banner-item:not(.clone)'));
    mobileBannerContainer.innerHTML = ''; // 슬라이드 영역만 초기화

    if (originalBanners.length > 0) {
        const first = originalBanners[0];
        const last = originalBanners[originalBanners.length - 1];
        const firstClone = first.cloneNode(true);
        firstClone.classList.add('clone');
        const lastClone = last.cloneNode(true);
        lastClone.classList.add('clone');

        mobileBannerContainer.appendChild(lastClone);
        originalBanners.forEach(banner => mobileBannerContainer.appendChild(banner));
        mobileBannerContainer.appendChild(firstClone);
    }
    updateBanners();
}

// 슬라이드 이동
function showBanner(index, animate = true) {
    if (!banners || banners.length === 0) return;
    mobileBannerContainer.style.transition = animate ? "transform 0.3s ease" : "none";
    mobileBannerContainer.style.transform = `translateX(-${index * itemWidthPercentage}%)`;
    currentIndex = index;
}

// 다음/이전 슬라이드
function showNextBanner() {
    showBanner(currentIndex + 1);
}
function showPrevBanner() {
    showBanner(currentIndex - 1);
}

// 루프 처리
function handleTransitionEnd() {
    if (!banners || banners.length === 0) return;
    if (currentIndex >= banners.length - 1) {
        showBanner(1, false);
    } else if (currentIndex <= 0) {
        showBanner(banners.length - 2, false);
    }
}

// 터치 이벤트
function handleTouchStart(event) {
    clearInterval(autoSlideInterval);
    touchStartX = event.touches[0].clientX;
}
function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
}
function handleTouchEnd() {
    const diffX = touchStartX - touchEndX;
    if (diffX > 50) {
        showNextBanner();
    } else if (diffX < -50) {
        showPrevBanner();
    }
    autoSlideInterval = setInterval(showNextBanner, 3000);
}

// 초기 설정
function initializeBanner() {
    cloneSlides();
    updateBanners();

    const initialShoesIndex = Array.from(banners).findIndex(
        banner => banner.classList.contains('shoes') && !banner.classList.contains('clone')
    );

    if (initialShoesIndex !== -1) {
        showBanner(initialShoesIndex + 1, false);
    } else {
        showBanner(1, false);
    }

    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(showNextBanner, 3000);
}

// 드롭다운 기능
document.addEventListener('DOMContentLoaded', function () {
    initializeBanner();

    const toggleBtn = document.getElementById('mbanner-toggle');
    const dropdown = document.getElementById('mobile-banner-dropdown');

    if (toggleBtn && dropdown) {
        toggleBtn.addEventListener('click', function () {
            const isOpen = !dropdown.classList.contains('max-h-0');
            if (isOpen) {
                dropdown.classList.add('max-h-0', 'py-0');
                dropdown.classList.remove('py-2');
                dropdown.style.maxHeight = null;
                toggleBtn.innerText = '▼';
            } else {
                dropdown.classList.remove('max-h-0', 'py-0');
                dropdown.classList.add('py-2');
                dropdown.style.maxHeight = '1200px';
                toggleBtn.innerText = '▲';
            }
        });
    }
});

// 이벤트 연결
mobileBannerContainer.addEventListener('transitionend', handleTransitionEnd);
mobileBannerContainer.addEventListener('touchstart', handleTouchStart);
mobileBannerContainer.addEventListener('touchmove', handleTouchMove);
mobileBannerContainer.addEventListener('touchend', handleTouchEnd);




