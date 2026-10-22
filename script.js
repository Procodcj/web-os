const searchInput = document.getElementById('language-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const tableRows = document.querySelectorAll('.languages-table tbody tr');

let activeDifficulty = 'All';

function filterTable() {
    const query = searchInput.value.trim().toLowerCase();

    tableRows.forEach((row) => {
        const languageName = row.cells[0].textContent.trim().toLowerCase();
        const difficulty = row.cells[2].textContent.trim();

        const matchesSearch = languageName.includes(query);
        const matchesDifficulty = activeDifficulty === 'All' || difficulty === activeDifficulty;

        row.style.display = matchesSearch && matchesDifficulty ? '' : 'none';
    });
}

searchInput.addEventListener('input', filterTable);

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        activeDifficulty = button.dataset.difficulty;
        filterTable();
    });
});

const communityProjects = [
    {
        title: 'Web-OS Portal',
        description: 'Open collaborative hub to learn and share knowledge about programming languages and operating systems.',
        link: 'https://github.com/'
    },
    {
        title: 'CLI Cheat Sheet',
        description: 'Quick reference guide for essential Linux, macOS, and Windows terminal commands.',
        link: '#operating-systems'
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
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}">View Project →</a>
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
