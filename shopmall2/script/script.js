const productCatalog = {
    '신상품': [
        {
            id: 1,
            name: '소프트 베이지 니트',
            category: '니트',
            price: 68000,
            discount: 15,
            image: 'https://images.unsplash.com/photo-1755519024774-864df34fcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMHN3ZWF0ZXIlMjB3b21hbnxlbnwxfHx8fDE3NzQ5MjQxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
            description: '포근한 터치감과 여유로운 실루엣이 매력적인 데일리 니트입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1755519024774-864df34fcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                'https://images.unsplash.com/photo-1764974345389-09da4244809c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 3,
            name: '로즈 실크 블라우스',
            category: '상의',
            price: 89000,
            discount: 20,
            image: 'https://images.unsplash.com/photo-1764271692129-767f58952c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwcGluayUyMGJsb3VzZXxlbnwxfHx8fDE3NzQ5MjQxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
            description: '은은한 광택과 여성스러운 컬러감이 돋보이는 실크 블라우스입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1764271692129-767f58952c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 9,
            name: '시그니처 캐주얼 원피스',
            category: '원피스',
            price: 98000,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1773439877634-e6ef9f571c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBjbG90aGluZyUyMGJlaWdlfGVufDF8fHx8MTc3NDkyNDE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
            description: '자연스럽게 흐르는 핏으로 단독 착용만으로도 완성도 높은 룩을 연출합니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1773439877634-e6ef9f571c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 10,
            name: '소프트 모달 티셔츠',
            category: '상의',
            price: 38000,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBmZW1pbmluZSUyMHN0eWxlfGVufDF8fHx8MTc3NDkyNDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
            description: '부드러운 모달 혼방 소재로 착용감이 가볍고 편안한 기본 티셔츠입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        }
    ],
    '아우터': [
        {
            id: 4,
            name: '엘레강스 울 코트',
            category: '아우터',
            price: 198000,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1764179690282-62eb5052a5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY29hdCUyMHdvbWFufGVufDF8fHx8MTc3NDkyNDE1OHww&ixlib=rb-4.1.0&q=80&w=1080',
            description: '정돈된 실루엣과 울 블렌드 소재가 어우러진 클래식 롱 코트입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1764179690282-62eb5052a5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 7,
            name: '오피스 베이직 블레이저',
            category: '아우터',
            price: 156000,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1632282004709-98206cfa8452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwb2ZmaWNlJTIwZmFzaGlvbiUyMHdvbWFufGVufDF8fHx8MTc3NDkyNDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
            description: '포멀과 캐주얼 사이를 자연스럽게 연결해주는 베이직 블레이저입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1632282004709-98206cfa8452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        }
    ],
    '상의': [
        {
            id: 2,
            name: '미니멀 화이트 셔츠',
            category: '상의',
            price: 52000,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1568163059147-8d321a0c5f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd2hpdGUlMjBkcmVzc3xlbnwxfHx8fDE3NzQ5MjQxNTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
            description: '깔끔한 카라와 여유로운 핏으로 다양한 스타일링이 가능한 셔츠입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1568163059147-8d321a0c5f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 3,
            name: '로즈 실크 블라우스',
            category: '상의',
            price: 89000,
            discount: 20,
            image: 'https://images.unsplash.com/photo-1764271692129-767f58952c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '차분한 핑크 톤으로 얼굴빛을 밝혀주는 포인트 블라우스입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1764271692129-767f58952c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 10,
            name: '소프트 모달 티셔츠',
            category: '상의',
            price: 38000,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '단독 또는 이너로 활용하기 좋은 데일리 필수 티셔츠입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        }
    ],
    '하의': [
        {
            id: 6,
            name: '페미닌 플레어 스커트',
            category: '하의',
            price: 76000,
            discount: 15,
            image: 'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '움직일 때마다 자연스럽게 퍼지는 실루엣이 우아한 스커트입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1756036043432-b3c034358107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 8,
            name: '데일리 슬림 팬츠',
            category: '하의',
            price: 62000,
            discount: 20,
            image: 'https://images.unsplash.com/photo-1594734415578-00fc9540929b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '군더더기 없는 라인으로 매일 입기 좋은 슬림 팬츠입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1594734415578-00fc9540929b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        }
    ],
    '원피스': [
        {
            id: 9,
            name: '시그니처 캐주얼 원피스',
            category: '원피스',
            price: 98000,
            discount: 10,
            image: 'https://images.unsplash.com/photo-1773439877634-e6ef9f571c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '단정한 분위기와 편안한 착용감을 동시에 느낄 수 있는 원피스입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1773439877634-e6ef9f571c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        }
    ],
    '니트': [
        {
            id: 1,
            name: '소프트 베이지 니트',
            category: '니트',
            price: 68000,
            discount: 15,
            image: 'https://images.unsplash.com/photo-1755519024774-864df34fcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '따뜻한 컬러감과 포근한 조직감이 돋보이는 니트입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1755519024774-864df34fcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        },
        {
            id: 5,
            name: '캐시미어 터틀넥',
            category: '니트',
            price: 125000,
            discount: 0,
            image: 'https://images.unsplash.com/photo-1764974345389-09da4244809c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '고급스러운 캐시미어 블렌드로 보온성과 터치감이 뛰어난 아이템입니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1764974345389-09da4244809c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        }
    ],
    '세트': [
        {
            id: 11,
            name: '소프트 트위드 셋업',
            category: '세트',
            price: 174000,
            discount: 12,
            image: 'https://images.unsplash.com/photo-1632282004709-98206cfa8452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: '자켓과 스커트가 조화롭게 구성된 세트 아이템으로 완성도 높은 스타일을 연출합니다.',
            detailImages: [
                'https://images.unsplash.com/photo-1632282004709-98206cfa8452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
            ]
        }
    ]
};

const products = [...new Map(Object.values(productCatalog).flat().map(product => [product.id, product])).values()];
const bestProducts = [findProductById(7), findProductById(8), findProductById(9), findProductById(5)].filter(Boolean);

let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

const categoryMeta = {
    '신상품': { subtitle: '가장 먼저 만나보는 이번 시즌 신상' },
    '아우터': { subtitle: '가볍게 걸쳐도 완성되는 아우터 컬렉션' },
    '상의': { subtitle: '매일 손이 가는 감도 높은 탑 아이템' },
    '하의': { subtitle: '실루엣을 정리해주는 팬츠와 스커트' },
    '원피스': { subtitle: '한 벌로 완성되는 데일리 드레스' },
    '니트': { subtitle: '포근하고 여성스러운 니트웨어' },
    '세트': { subtitle: '고민 없이 완성하는 셋업 스타일' }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderHomeSections();
    initializeCategoryChips();
    initializeCategoryCards();
    initializeProductListPage();
    initializeProductDetailPage();
    initializeTabBar();
    updateWishlistBadge();
}

function renderHomeSections() {
    renderProducts('mood-products', productCatalog['신상품'] || []);
    renderProducts('best-products', bestProducts);
    renderProducts('daily-products', [findProductById(3), findProductById(4), findProductById(8), findProductById(11)].filter(Boolean));
}

function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    productList.forEach(product => container.appendChild(createProductCard(product)));
}

function createProductCard(product) {
    const card = document.createElement('a');
    card.className = 'product-card product-link-card';
    card.href = `product-detail.html?id=${product.id}`;

    const finalPrice = getFinalPrice(product);

    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button class="wishlist-button" type="button" data-product-id="${product.id}" aria-label="위시리스트 추가">
                <svg class="wishlist-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
            </button>
            ${product.discount > 0 ? `<div class="discount-badge"><span class="discount-text">${product.discount}%</span></div>` : ''}
        </div>
        <div class="product-info">
            <p class="product-category-text">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price-wrapper">
                ${product.discount > 0 ? `<span class="product-original-price">${product.price.toLocaleString()}원</span>` : ''}
                <span class="product-price ${product.discount > 0 ? 'discounted' : 'regular'}">${finalPrice.toLocaleString()}원</span>
            </div>
        </div>
    `;

    const wishlistButton = card.querySelector('.wishlist-button');
    if (wishlist.includes(product.id)) {
        wishlistButton.classList.add('active');
    }

    wishlistButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(product.id, wishlistButton);
    });

    return card;
}

function initializeCategoryChips() {
    const chips = document.querySelectorAll('.category-chip');
    if (!chips.length) return;

    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            const category = this.dataset.category || this.textContent.trim();
            window.location.href = `product-list.html?category=${encodeURIComponent(category)}`;
        });
    });
}

function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-large-card, .special-category-item');
    if (!categoryCards.length) return;

    categoryCards.forEach(card => {
        card.addEventListener('click', event => {
            event.preventDefault();
            const category = card.dataset.category;
            if (!category) return;
            window.location.href = `product-list.html?category=${encodeURIComponent(category)}`;
        });
    });
}

function initializeProductListPage() {
    const listContainer = document.getElementById('product-list-grid');
    if (!listContainer) return;

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category') || '신상품';
    const pageTitle = document.getElementById('list-page-title');
    const pageSubtitle = document.getElementById('list-page-subtitle');
    const countElement = document.getElementById('list-product-count');

    const productList = productCatalog[category] || productCatalog['신상품'];

    if (pageTitle) pageTitle.textContent = category;
    if (pageSubtitle) pageSubtitle.textContent = categoryMeta[category]?.subtitle || '선택한 카테고리의 아이템을 모아봤어요.';
    if (countElement) countElement.textContent = `${productList.length} items`;

    renderProducts('product-list-grid', productList);
}

function initializeProductDetailPage() {
    const detailContainer = document.getElementById('product-detail-page');
    if (!detailContainer) return;

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get('id'));
    const product = findProductById(productId) || products[0];

    const detailImage = document.getElementById('detail-main-image');
    const detailCategory = document.getElementById('detail-category');
    const detailName = document.getElementById('detail-name');
    const detailDescription = document.getElementById('detail-description');
    const detailPrice = document.getElementById('detail-price');
    const detailOriginalPrice = document.getElementById('detail-original-price');
    const detailDiscount = document.getElementById('detail-discount-rate');
    const detailGallery = document.getElementById('detail-gallery');
    const detailBuyButton = document.getElementById('detail-buy-button');

    if (detailImage) detailImage.src = product.image;
    if (detailImage) detailImage.alt = product.name;
    if (detailCategory) detailCategory.textContent = product.category;
    if (detailName) detailName.textContent = product.name;
    if (detailDescription) detailDescription.textContent = product.description;
    if (detailPrice) detailPrice.textContent = `${getFinalPrice(product).toLocaleString()}원`;

    if (detailOriginalPrice) {
        if (product.discount > 0) {
            detailOriginalPrice.textContent = `${product.price.toLocaleString()}원`;
            detailOriginalPrice.style.display = 'inline';
        } else {
            detailOriginalPrice.style.display = 'none';
        }
    }

    if (detailDiscount) {
        if (product.discount > 0) {
            detailDiscount.textContent = `${product.discount}% OFF`;
            detailDiscount.style.display = 'inline-flex';
        } else {
            detailDiscount.style.display = 'none';
        }
    }

    if (detailBuyButton) {
        detailBuyButton.textContent = `${product.name} 구매하기`;
    }

    if (detailGallery) {
        detailGallery.innerHTML = '';
        product.detailImages.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = product.name;
            img.className = 'detail-gallery-image';
            detailGallery.appendChild(img);
        });
    }
}

function toggleWishlist(productId, button) {
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        button.classList.remove('active');
    } else {
        wishlist.push(productId);
        button.classList.add('active');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
}

function updateWishlistBadge() {
    const badges = document.querySelectorAll('#wishlist-badge');
    badges.forEach(badge => {
        if (wishlist.length > 0) {
            badge.textContent = wishlist.length;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

function initializeTabBar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.tab-button').forEach(button => {
        const href = button.getAttribute('href');
        button.classList.toggle('active', href === currentPage || (currentPage === '' && href === 'index.html'));
    });
}

function findProductById(productId) {
    return products.find(product => product.id === productId);
}

function getFinalPrice(product) {
    return Math.round(product.price * (1 - product.discount / 100));
}
