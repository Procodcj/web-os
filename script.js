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
