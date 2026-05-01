document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const roleFilter = document.getElementById('roleFilter');
    const cards = document.querySelectorAll('.person-card');

    // Eléments de la modale
    const modal = document.getElementById('memberModal');
    const closeModal = document.querySelector('.close-modal');

    // 1. FILTRAGE (Gardé de l'étape précédente)
    function performFiltering() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedRole = roleFilter.value;

        cards.forEach(card => {
            const name = card.querySelector('.name').textContent.toLowerCase();
            const role = card.getAttribute('data-role');
            const matchesSearch = name.includes(query);
            const matchesRole = (selectedRole === 'all' || role === selectedRole);
            card.style.display = (matchesSearch && matchesRole) ? 'block' : 'none';
        });
        searchInput.value = '';
    }

    searchBtn.addEventListener('click', performFiltering);
    roleFilter.addEventListener('change', performFiltering);

    // 2. GESTION DE LA MODALE
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Récupérer les données de la carte cliquée
            const name = card.querySelector('.name').textContent;
            const role = card.querySelector('.role').textContent;
            const bio = card.getAttribute('data-bio') || "No biography available.";
            const edu = card.getAttribute('data-edu') || "Education details coming soon.";

            // Remplir la modale
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalRole').textContent = role;
            document.getElementById('modalBio').textContent = bio;
            document.getElementById('modalEdu').textContent = edu;

            // Afficher la modale
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Empêche de scroller derrière
        });
    });

    // Fermer la modale
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    // Fermer si on clique en dehors du bloc blanc
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});