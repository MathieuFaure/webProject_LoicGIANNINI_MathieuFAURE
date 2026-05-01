document.addEventListener('DOMContentLoaded', () => {
    const pubList = document.getElementById('publicationsList');
    const cards = Array.from(document.querySelectorAll('.pub-card'));

    // CORRECTION ICI : l'id dans ton HTML est 'searchInput'
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const catBtns = document.querySelectorAll('.cat-btn');
    const dateSort = document.getElementById('dateSort');

    // Sécurité : on vérifie que les éléments existent pour éviter que le script ne bloque
    if (!searchInput || !searchBtn) {
        console.error("Erreur : Les éléments de recherche sont introuvables.");
        return;
    }

    // 1. Reset on Load
    searchInput.value = '';

    // 2. Filter & Search Function
    function filterPubs(forcedQuery = null) {
        const query = forcedQuery !== null ? forcedQuery : searchInput.value.toLowerCase().trim();

        // On récupère le filtre du bouton qui a la classe 'active'
        const activeBtn = document.querySelector('.cat-btn.active');
        const activeCat = activeBtn ? activeBtn.dataset.filter : 'all';

        cards.forEach(card => {
            const title = card.querySelector('.pub-title').textContent.toLowerCase();
            const type = card.dataset.type; // Ex: "Article"

            const matchesSearch = title.includes(query);
            const matchesCat = (activeCat === 'all' || type === activeCat);

            // On utilise flex pour garder la mise en page
            card.style.display = (matchesSearch && matchesCat) ? 'flex' : 'none';
        });
    }

    // Clic sur les catégories
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterPubs();
        });
    });

    // Clic sur le bouton Research
    searchBtn.addEventListener('click', () => {
        const currentSearch = searchInput.value.toLowerCase().trim();
        filterPubs(currentSearch);
        searchInput.value = ''; // Efface après avoir filtré
    });

    // Touche Entrée
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const currentSearch = searchInput.value.toLowerCase().trim();
            filterPubs(currentSearch);
            searchInput.value = '';
        }
    });

    // 3. Sort by Date (Tri)
    dateSort.addEventListener('change', () => {
        const sorted = cards.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateSort.value === 'latest' ? dateB - dateA : dateA - dateB;
        });
        // On ré-injecte les cartes dans le bon ordre
        sorted.forEach(card => pubList.appendChild(card));
    });

    // 4. Modal Logic
    const modal = document.getElementById('pubModal');
    const closeModal = document.querySelector('.close-modal');

    cards.forEach(card => {
        const readBtn = card.querySelector('.read-btn');
        if (readBtn) {
            readBtn.addEventListener('click', () => {
                document.getElementById('modalPubTitle').textContent = card.querySelector('.pub-title').textContent;
                document.getElementById('modalPubMeta').textContent = card.querySelector('.pub-meta').textContent;
                document.getElementById('modalAuthorName').textContent = card.dataset.author;
                document.getElementById('modalFullText').textContent = card.dataset.fulltext;

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            });
        }
    });

    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});