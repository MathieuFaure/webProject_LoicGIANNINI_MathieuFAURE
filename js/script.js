document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const roleFilter = document.getElementById('roleFilter');
    const cards = document.querySelectorAll('.person-card');

    // 1. Fonction pour réinitialiser les champs au reload (F5)
    function resetInputs() {
        searchInput.value = '';
        roleFilter.value = 'all';
        cards.forEach(card => card.style.display = 'block');
    }

    // Appeler la réinitialisation dès que la page charge
    resetInputs();

    function performFiltering() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedRole = roleFilter.value;

        cards.forEach(card => {
            const name = card.querySelector('.name').textContent.toLowerCase();
            const role = card.getAttribute('data-role');

            const matchesSearch = name.includes(query);
            const matchesRole = (selectedRole === 'all' || role === selectedRole);

            if (matchesSearch && matchesRole) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // 2. Effacer le contenu de la barre de recherche après le clic sur Research
        searchInput.value = '';
    }

    // Écouteur pour le bouton de recherche
    searchBtn.addEventListener('click', performFiltering);

    // Écouteur pour le menu déroulant
    roleFilter.addEventListener('change', () => {
        // Optionnel : on ne vide pas la barre ici car l'utilisateur
        // n'a peut-être pas fini de combiner les filtres
        performFiltering();
    });

    // Permettre de valider avec la touche Entrée
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performFiltering();
    });
});