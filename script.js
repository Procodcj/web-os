const languagesData = [
    {
        name: 'HTML',
        difficulty: 'Easy',
        description: 'Structures the content of a web page.'
    },
    {
        name: 'CSS',
        difficulty: 'Easy',
        description: 'Styles and designs a web page.'
    },
    {
        name: 'JavaScript',
        difficulty: 'Intermediate',
        description: 'Adds interactivity and dynamism to a web page.'
    },
    {
        name: 'Python',
        difficulty: 'Easy',
        description: 'Web development, data science, artificial intelligence and automation.'
    },
    {
        name: 'PHP',
        difficulty: 'Intermediate',
        description: 'Server-side web development.'
    },
    {
        name: 'C',
        difficulty: 'Hard',
        description: 'Systems programming, hardware and low-level software.'
    },
    {
        name: 'C++',
        difficulty: 'Hard',
        description: 'Video games, high-performance applications and operating systems.'
    },
    {
        name: 'Go',
        difficulty: 'Intermediate',
        description: 'Server development, APIs and high-performance applications.'
    },
    {
        name: 'Rust',
        difficulty: 'Hard',
        description: 'Systems programming language focused on performance, concurrency, and memory safety without a garbage collector.'
    },
    {
        name: 'TypeScript',
        difficulty: 'Intermediate',
        description: 'Strongly typed superset of JavaScript that adds static typing and modern developer tooling.'
    },
    {
        name: 'Java',
        difficulty: 'Intermediate',
        description: 'Cross-platform, object-oriented language widely used for enterprise backends and distributed systems.'
    },
    {
        name: 'C#',
        difficulty: 'Intermediate',
        description: 'Modern, type-safe programming language developed by Microsoft for .NET and game development.'
    },
    {
        name: 'SQL',
        difficulty: 'Easy',
        description: 'Standard structured query language for defining, manipulating, and managing relational databases.'
    },
    {
        name: 'Kotlin',
        difficulty: 'Intermediate',
        description: 'Modern concise language targeting the JVM, designated as the preferred language for Android development.'
    },
    {
        name: 'Swift',
        difficulty: 'Intermediate',
        description: 'High-performance, intuitive programming language developed by Apple for iOS and macOS systems.'
    },
    {
        name: 'Ruby',
        difficulty: 'Easy',
        description: 'Dynamic, open-source language focused on developer happiness and rapid web application development.'
    }
];

const searchInput = document.getElementById('language-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const languagesContainer = document.getElementById('languages-container');
const languageModal = document.getElementById('language-modal');
const modalTitle = document.getElementById('modal-title');
const modalDifficulty = document.getElementById('modal-difficulty');
const modalDescription = document.getElementById('modal-description');
const modalCloseBtn = languageModal ? languageModal.querySelector('.modal-close') : null;

let activeDifficulty = 'All';

function openLanguageModal(lang) {
    if (!languageModal) return;
    modalTitle.textContent = lang.name;
    modalDifficulty.textContent = lang.difficulty;
    modalDescription.textContent = lang.description;
    languageModal.showModal();
}

function renderLanguageTags() {
    if (!languagesContainer) return;
    languagesContainer.innerHTML = '';

    languagesData.forEach((lang) => {
        const tag = document.createElement('button');
        tag.type = 'button';
        tag.className = 'lang-tag';
        tag.textContent = lang.name;
        tag.dataset.name = lang.name.toLowerCase();
        tag.dataset.difficulty = lang.difficulty;

        tag.addEventListener('click', () => openLanguageModal(lang));
        languagesContainer.appendChild(tag);
    });
}

function filterLanguages() {
    const query = searchInput.value.trim().toLowerCase();
    const tags = languagesContainer.querySelectorAll('.lang-tag');

    tags.forEach((tag) => {
        const matchesSearch = tag.dataset.name.includes(query);
        const matchesDifficulty = activeDifficulty === 'All' || tag.dataset.difficulty === activeDifficulty;

        tag.style.display = matchesSearch && matchesDifficulty ? '' : 'none';
    });
}

renderLanguageTags();

searchInput.addEventListener('input', filterLanguages);

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        activeDifficulty = button.dataset.difficulty;
        filterLanguages();
    });
});

if (modalCloseBtn && languageModal) {
    modalCloseBtn.addEventListener('click', () => {
        languageModal.close();
    });

    languageModal.addEventListener('click', (event) => {
        if (event.target === languageModal) {
            languageModal.close();
        }
    });
}

const communityProjects = [
    {
        title: 'Web-OS Portal',
        description: 'Open collaborative hub to learn and share knowledge about programming languages and operating systems.',
        link: 'https://github.com/'
    },
    {
        title: 'CLI Cheat Sheet',
        description: 'Quick reference guide for essential Linux, macOS, and Windows terminal commands.',
        link: 'https://cli.github.com/manual/'
    },
    {
        title: 'Language Explorer',
        description: 'Interactive directory to compare programming languages by use case and difficulty.',
        link: '#languages'
    }
];

function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    communityProjects.forEach((project) => {
        const card = document.createElement('article');
        card.className = 'project-card';
        const isExternal = /^https?:\/\//i.test(project.link);
        const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';

        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}"${externalAttrs}>View Project →</a>
        `;
        projectsGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);

const sliderTrack = document.getElementById('workspace-slider');

if (sliderTrack) {
    const sliderThumb = sliderTrack.querySelector('.slider-thumb');
    const sliderText = sliderTrack.querySelector('.slider-text');

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let maxOffset = 0;

    function resetSlider() {
        currentX = 0;
        sliderThumb.style.transform = 'translateX(0px)';
        sliderText.style.opacity = '1';
        sliderTrack.setAttribute('aria-valuenow', '0');
    }

    sliderThumb.addEventListener('pointerdown', (event) => {
        isDragging = true;
        startX = event.clientX - currentX;
        maxOffset = Math.max(0, sliderTrack.clientWidth - sliderThumb.offsetWidth - sliderThumb.offsetLeft * 2);

        sliderThumb.classList.add('is-dragging');
        sliderTrack.classList.add('is-dragging');
        sliderThumb.setPointerCapture(event.pointerId);
    });

    sliderThumb.addEventListener('pointermove', (event) => {
        if (!isDragging || maxOffset <= 0) return;

        const deltaX = event.clientX - startX;
        currentX = Math.min(Math.max(0, deltaX), maxOffset);
        const progress = currentX / maxOffset;

        sliderThumb.style.transform = `translateX(${currentX}px)`;
        sliderText.style.opacity = String(Math.max(0, 1 - progress * 1.15));
        sliderTrack.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    });

    function handlePointerRelease(event) {
        if (!isDragging) return;
        isDragging = false;

        sliderThumb.classList.remove('is-dragging');
        sliderTrack.classList.remove('is-dragging');

        if (sliderThumb.hasPointerCapture(event.pointerId)) {
            sliderThumb.releasePointerCapture(event.pointerId);
        }

        const progress = maxOffset > 0 ? currentX / maxOffset : 0;

        if (progress >= 0.8) {
            sliderThumb.style.transform = `translateX(${maxOffset}px)`;
            sliderText.style.opacity = '0';
            sliderTrack.setAttribute('aria-valuenow', '100');
            window.open('https://github.com/Procodcj', '_blank', 'noopener,noreferrer');
            setTimeout(resetSlider, 600);
        } else {
            resetSlider();
        }
    }

    sliderThumb.addEventListener('pointerup', handlePointerRelease);
    sliderThumb.addEventListener('pointercancel', handlePointerRelease);
}
