// Product Data
const products = [
    {
        id: 1,
        name: '소프트 베이지 니트',
        price: 68000,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1755519024774-864df34fcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHN3ZWF0ZXIlMjB3b21hbnxlbnwxfHx8fDE3NzQ5MjQxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 2,
        name: '미니멀 화이트 셔츠',
        price: 52000,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1568163059147-8d321a0c5f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2hpdGUlMjBkcmVzc3xlbnwxfHx8fDE3NzQ5MjQxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 3,
        name: '로즈 실크 블라우스',
        price: 89000,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1764271692129-767f58952c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcGluayUyMGJsb3VzZXxlbnwxfHx8fDE3NzQ5MjQxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 4,
        name: '엘레강스 울 코트',
        price: 198000,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1764179690282-62eb5052a5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY29hdCUyMHdvbWFufGVufDF8fHx8MTc3NDkyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 5,
        name: '캐시미어 터틀넥',
        price: 125000,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1764974345389-09da4244809c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMGtuaXR3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzQ5MjQxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 6,
        name: '페미닌 플레어 스커트',
        price: 76000,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmZW1pbmluZSUyMHN0eWxlfGVufDF8fHx8MTc3NDkyNDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    }
];

const bestProducts = [
    {
        id: 7,
        name: '오피스 베이직 블레이저',
        price: 156000,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1632282004709-98206cfa8452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwb2ZmaWNlJTIwZmFzaGlvbiUyMHdvbWFufGVufDF8fHx8MTc3NDkyNDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 8,
        name: '데일리 슬림 팬츠',
        price: 62000,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1594734415578-00fc9540929b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZmVtaW5pbmUlMjBmYXNoaW9uJTIwb3V0Zml0fGVufDF8fHx8MTc3NDkyNDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 9,
        name: '시그니처 캐주얼 원피스',
        price: 98000,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1773439877634-e6ef9f571c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBjbG90aGluZyUyMGJlaWdlfGVufDF8fHx8MTc3NDkyNDE1NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
        id: 10,
        name: '소프트 모달 티셔츠',
        price: 38000,
        discount: 0,
        image: 'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmZW1pbmluZSUyMHN0eWxlfGVufDF8fHx8MTc3NDkyNDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    }
];

// State
let wishlist = [];
let activeTab = 'home';

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderProducts('mood-products', products.slice(0, 4));
    renderProducts('best-products', bestProducts);
    renderProducts('daily-products', products.slice(2, 6));
    initializeCategoryChips();
    initializeTabBar();
}

// Render Products
function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    productList.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const finalPrice = product.price * (1 - product.discount / 100);

    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="wishlist-button" data-product-id="${product.id}">
                <svg class="wishlist-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
            </button>
            ${product.discount > 0 ? `
                <div class="discount-badge">
                    <span class="discount-text">${product.discount}%</span>
                </div>
            ` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price-wrapper">
                ${product.discount > 0 ? `
                    <span class="product-original-price">${product.price.toLocaleString()}원</span>
                ` : ''}
                <span class="product-price ${product.discount > 0 ? 'discounted' : 'regular'}">
                    ${finalPrice.toLocaleString()}원
                </span>
            </div>
        </div>
    `;

    // Add wishlist event listener
    const wishlistButton = card.querySelector('.wishlist-button');
    wishlistButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(product.id, wishlistButton);
    });

    return card;
}

// Toggle Wishlist
function toggleWishlist(productId, button) {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        button.classList.remove('active');
    } else {
        wishlist.push(productId);
        button.classList.add('active');
    }
    
    updateWishlistBadge();
}

// Update Wishlist Badge
function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-badge');
    
    if (wishlist.length > 0) {
        badge.textContent = wishlist.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Initialize Category Chips
function initializeCategoryChips() {
    const chips = document.querySelectorAll('.category-chip');
    
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            chips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize Tab Bar
function initializeTabBar() {
    // Tab buttons are now links, no need to handle click events for navigation
    // Just update active states based on current page
    const currentPath = window.location.pathname;
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        const href = button.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html')) {
            button.classList.add('active');
        }
    });
}