const photos = [
    { url: 'https://unsplash.com', title: 'Tropical Beach', category: 'Beach' },
    { url: 'https://unsplash.com', title: 'Vintage Violin', category: 'Violin' },
    { url: 'https://unsplash.com', title: 'Electric Guitar', category: 'Guitar' }
];

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const addForm = document.getElementById('addPhotoForm');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxCap = lightbox.querySelector('p');
const closeBtn = document.querySelector('.close-btn');

function renderGallery(filter = 'All', search = '') {
    gallery.innerHTML = '';
    const filtered = photos.filter(p => 
        (filter === 'All' || p.category === filter) &&
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    filtered.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}">
            <p>${photo.title}</p>
        `;
        card.onclick = () => {
            lightboxImg.src = photo.url;
            lightboxCap.textContent = photo.title;
            lightbox.classList.add('active');
        };
        gallery.appendChild(card);
    });
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderGallery(btn.dataset.filter, searchInput.value);
    };
});

// Search Logic
searchInput.oninput = (e) => {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    renderGallery(activeFilter, e.target.value);
};

// Form Submission
addForm.onsubmit = (e) => {
    e.preventDefault();
    const newPhoto = {
        url: document.getElementById('imgUrl').value,
        title: document.getElementById('imgTitle').value,
        category: document.getElementById('imgCategory').value
    };
    photos.push(newPhoto);
    renderGallery(document.querySelector('.filter-btn.active').dataset.filter, searchInput.value);
    addForm.reset();
};

// Lightbox Close
closeBtn.onclick = () => lightbox.classList.remove('active');
lightbox.onclick = (e) => { if(e.target === lightbox) lightbox.classList.remove('active'); };

// Initial Load
renderGallery();
