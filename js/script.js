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


// // ✅ 사이드 메뉴 설정
// document.addEventListener('DOMContentLoaded', function () {
//     // 메뉴 링크 정보 설정
//     const links = [
//         { id: 'dashboardLink', path: ['/index.html', '/'] },
//         { id: 'userLink', path: ['user'] },
//         { id: 'trainingLink', path: ['training'], parentId: 'trainingLink', isSubMenu: true },
//         { id: 'studentLink', path: ['student'], parentId: 'studentLink', isSubMenu: true },
//         { id: 'graduateLink', path: ['graduate'], parentId: 'graduateLink', isSubMenu: true },
//         { id: 'qualifyLink', path: ['qualify'], parentId: 'qualifyLink', isSubMenu: true },
//         { id: 'adminLink', path: ['admin'], parentId: 'adminLink', isSubMenu: true },
//         { id: 'mailLink', path: ['mail'], parentId: 'mailLink', isSubMenu: true },
//         { id: 'settingLink', path: ['setting'], parentId: 'settingLink', isSubMenu: true },
//     ];

//     // 현재 페이지 경로 가져오기
//     const currentPage = window.location.pathname;
    
//     // 서브메뉴 매핑 - 현재 페이지가 서브메뉴에 속하는지 확인하기 위한 매핑
//     const subMenuMapping = {
//         'training-01.html': { parentId: 'trainingLink', linkClass: 'px-8 py-3' },
//         'training-02.html': { parentId: 'trainingLink', linkClass: 'px-8 py-3' },
//         'training-create.html': { parentId: 'trainingLink', linkClass: 'px-8 py-3' },
//         'training-end-01.html': { parentId: 'trainingLink', linkClass: 'px-8 py-3' },
//         'training-end-02.html': { parentId: 'trainingLink', linkClass: 'px-8 py-3' },
//         'training-before-2020-01.html': { parentId: 'trainingLink', linkClass: 'px-8 py-3' },
//         'training-before-2020-02.html': { parentId: 'trainingLink', linkClass: 'px-8 py-3' },
//         'student-pay.html': { parentId: 'studentLink', linkClass: 'px-8 py-3' },
//         'student-record.html': { parentId: 'studentLink', linkClass: 'px-8 py-3' },
//         'graduate.html': { parentId: 'graduateLink', linkClass: 'px-8 py-3' },
//         'qualify.html': { parentId: 'qualifyLink', linkClass: 'px-8 py-3' },
//         'admin.html': { parentId: 'adminLink', linkClass: 'px-8 py-3' },
//         'mail.html': { parentId: 'mailLink', linkClass: 'px-8 py-3' },
//         'setting.html': { parentId: 'settingLink', linkClass: 'px-8 py-3' }
//     };

//     // 현재 페이지에 해당하는 메인메뉴와 서브메뉴 찾기
//     const currentPageName = currentPage.split('/').pop();
//     let activeMainMenu = null;
//     let activeSubMenu = null;

//     // 1. 현재 페이지가 메인메뉴인지 확인
//     links.forEach(link => {
//         const linkElement = document.getElementById(link.id);
//         if (linkElement) {
//             if (link.path.some(p => currentPage.startsWith(p))) {
//                 linkElement.classList.add('active');

//                 // 서브메뉴 메인링크인 경우, 해당 ID 저장
//                 if (link.isSubMenu) {
//                     activeMainMenu = link.id;
//                 }
//             }
//         }
//     });

//     // 2. 현재 페이지가 서브메뉴인지 확인
//     if (currentPageName in subMenuMapping) {
//         const subMenuInfo = subMenuMapping[currentPageName];
//         activeMainMenu = subMenuInfo.parentId;
        
//         // 현재 페이지와 일치하는 서브메뉴 링크 찾기
//         const mainMenuElement = document.getElementById(activeMainMenu);
//         if (mainMenuElement) {
//             const parentLi = mainMenuElement.closest('.group');
//             if (parentLi) {
//                 const subMenuLinks = parentLi.querySelectorAll('.subUl a');
//                 subMenuLinks.forEach(link => {
//                     if (link.getAttribute('href') === currentPageName) {
//                         activeSubMenu = link;
//                         link.classList.add('active');
//                         link.classList.add('text-[#1E4799]');
//                     }
//                 });
//             }
//         }
//     }

//     // 서브메뉴 토글 함수
//     function toggleSubMenu(event, forceOpen = false) {
//         event.preventDefault();
//         event.stopPropagation();

//         const mainLink = event.currentTarget;
//         const parentLi = mainLink.closest('.group');
//         const submenu = parentLi.querySelector('.subUl');
//         const arrow = parentLi.querySelector('.subIcon');
        
//         // 서브메뉴 상태 확인
//         const isOpen = !submenu.classList.contains('max-h-0');

//         // 기존 토글 동작 유지 (모든 메뉴 닫기는 forceOpen이 false일 때만)
//         if (!forceOpen) {
//             // 모든 서브메뉴 닫기
//             document.querySelectorAll('.subUl').forEach(ul => {
//                 if (ul !== submenu) {
//                     ul.classList.add('max-h-0');
//                     ul.classList.remove('max-h-150', 'py-2');
                    
//                     // 해당 화살표도 초기화
//                     const parentGroup = ul.closest('.group');
//                     if (parentGroup) {
//                         const arrow = parentGroup.querySelector('.subIcon');
//                         if (arrow) {
//                             arrow.classList.remove('rotate-[-90deg]');
//                         }
//                     }
//                 }
//             });
//         }

//         // 현재 서브메뉴 열기/닫기
//         if (forceOpen || submenu.classList.contains('max-h-0')) {
//             // 서브메뉴 열기
//             submenu.classList.remove('max-h-0');
//             submenu.classList.add('max-h-150', 'py-2');
//             arrow.classList.add('rotate-[-90deg]');
            
//             // 로컬 스토리지에 상태 저장
//             localStorage.setItem(mainLink.id, 'open');
//         } else {
//             // 서브메뉴 닫기 (forceOpen이 false일 때만)
//             submenu.classList.add('max-h-0');
//             submenu.classList.remove('max-h-96', 'py-2');
//             arrow.classList.remove('rotate-[-90deg]');
            
//             // 로컬 스토리지에 상태 저장
//             localStorage.setItem(mainLink.id, 'closed');
//         }
//     }

//     // 모든 메인 링크에 toggleSubMenu 이벤트 연결 (서브메뉴가 있는 경우에만)
//     document.querySelectorAll('.mainLink').forEach(link => {
//         const id = link.id;
//         const targetLink = links.find(l => l.id === id);
//         if (targetLink && targetLink.isSubMenu) {
//             link.addEventListener('click', function(e) {
//                 toggleSubMenu(e);
//             });
//         }else {
//             // 서브메뉴가 없는 링크에 포커스 및 active 클래스 처리
//             link.addEventListener('click', function(e) {
//                 e.stopPropagation(); // 이벤트 버블링 중단
//                 // 모든 active 클래스 제거
//                 document.querySelectorAll('.mainLink').forEach(l => l.classList.remove('active'));
//                 // 현재 클릭된 링크에 active 클래스 추가
//                 link.classList.add('active');
//                 link.focus(); // 포커스를 명시적으로 설정
//             });
//         }
//     });

//     // 페이지 로드 시 서브메뉴 상태 처리
//     function initializeMenu() {
//         // 현재 페이지가 서브메뉴 페이지인 경우
//         if (activeMainMenu) {
//             const mainMenuElement = document.getElementById(activeMainMenu);
//             if (mainMenuElement) {
//                 // 메인 메뉴 활성화
//                 mainMenuElement.classList.add('active');
                
//                 // 해당 서브메뉴 열기
//                 const event = {
//                     preventDefault: () => {},
//                     stopPropagation: () => {},
//                     currentTarget: mainMenuElement
//                 };
//                 toggleSubMenu(event, true);
                
//                 // 서브메뉴 아이템 활성화 및 포커스
//                 if (activeSubMenu) {
//                     activeSubMenu.classList.add('active');
//                     activeSubMenu.classList.add('bg-[#EDF3FF]','text-[#1E4799]');
//                     activeSubMenu.focus();
                    
//                     // 메인 메뉴에도 포커스를 설정
//                     mainMenuElement.focus();
//                 }
//             }
//         } else {
//             // 서브메뉴가 없는 경우에도 메인 메뉴에 포커스를 주기
//             const activeLink = document.querySelector('.mainLink.active');
//             if (activeLink) {
//                 activeLink.focus();
//             }
//         }
//     }
//     document.querySelectorAll('.subUl a').forEach(link => {
//         link.setAttribute('tabindex', '0'); // 키보드 접근성
//         link.classList.add('focus:bg-[#EDF3FF]'); // 포커스 스타일
//         link.addEventListener('click', e => {
//             e.stopPropagation(); // 메인 메뉴가 접히지 않도록
//         });
//     });

//     // 초기화 실행
//     initializeMenu();
// });

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
            mainMenuElement.classList.add('active');

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

        if (!forceOpen) {
            document.querySelectorAll('.subUl').forEach(ul => {
                if (ul !== submenu) {
                    ul.classList.add('max-h-0');
                    ul.classList.remove('max-h-150', 'py-2');

                    const otherGroup = ul.closest('.group');
                    if (otherGroup) {
                        const otherArrow = otherGroup.querySelector('.subIcon');
                        if (otherArrow) {
                            otherArrow.classList.remove('rotate-[-90deg]');
                        }
                    }

                    // 저장
                    const otherMain = otherGroup?.querySelector('.mainLink');
                    if (otherMain?.id) {
                        localStorage.setItem(otherMain.id, 'closed');
                    }
                }
            });
        }

        if (forceOpen || submenu.classList.contains('max-h-0')) {
            submenu.classList.remove('max-h-0');
            submenu.classList.add('max-h-150', 'py-2');
            arrow.classList.add('rotate-[-90deg]');
            localStorage.setItem(mainLink.id, 'open');
        } else {
            submenu.classList.add('max-h-0');
            submenu.classList.remove('max-h-150', 'py-2');
            arrow.classList.remove('rotate-[-90deg]');
            localStorage.setItem(mainLink.id, 'closed');
        }
    }

    // 4. 각 메인 메뉴에 이벤트 연결
    document.querySelectorAll('.mainLink').forEach(link => {
        const id = link.id;
        const parentLi = link.closest('.group');
        const submenu = parentLi?.querySelector('.subUl');

        if (submenu) {
            link.addEventListener('click', e => toggleSubMenu(e));
        } else {
            link.addEventListener('click', e => {
                e.stopPropagation();
                document.querySelectorAll('.mainLink').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                link.focus();
            });
        }
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

            // 메인 메뉴에도 active 클래스 추가
            const parentGroup = link.closest('.group');
            if (parentGroup) {
                document.querySelectorAll('.mainLink').forEach(l => l.classList.remove('active'));
                const mainLink = parentGroup.querySelector('.mainLink');
                if (mainLink) {
                    mainLink.classList.add('active');
                }
            }
        });
    });

    // 6. 로컬 스토리지 기반으로 서브메뉴 상태 복원
    function restoreSubMenuState() {
        document.querySelectorAll('.mainLink').forEach(link => {
            const savedState = localStorage.getItem(link.id);
            if (savedState === 'open') {
                const event = {
                    preventDefault: () => {},
                    stopPropagation: () => {},
                    currentTarget: link
                };
                toggleSubMenu(event, true);
            }
        });
    }

    // 7. 초기화 실행
    restoreSubMenuState();
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








