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
