// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

function initializeCart() {
    // Quantity controls
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const control = this.closest('.quantity-control');
            const valueSpan = control.querySelector('.quantity-value');
            let currentValue = parseInt(valueSpan.textContent);

            if (this.classList.contains('plus')) {
                currentValue++;
            } else if (this.classList.contains('minus') && currentValue > 1) {
                currentValue--;
            }

            valueSpan.textContent = currentValue;
            updateCartPrice();
        });
    });

    // Remove item buttons
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartPrice();
                updateCartCount();
            }, 300);
        });
    });

    // Coupon apply button
    const couponBtn = document.querySelector('.coupon-apply-btn');
    if (couponBtn) {
        couponBtn.addEventListener('click', function() {
            const input = document.querySelector('.coupon-input');
            if (input.value.trim()) {
                alert('쿠폰이 적용되었습니다!');
                input.value = '';
            }
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('결제 페이지로 이동합니다.');
        });
    }
}

function updateCartPrice() {
    // This is a simplified version - in real app, calculate based on actual cart items
    const items = document.querySelectorAll('.cart-item');
    const count = items.length;
    
    // Update badge
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function updateCartCount() {
    const items = document.querySelectorAll('.cart-item');
    const badge = document.getElementById('wishlist-badge');
    
    if (badge) {
        if (items.length > 0) {
            badge.textContent = items.length;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
            // Show empty cart message
            const cartItems = document.querySelector('.cart-items');
            if (cartItems && items.length === 0) {
                cartItems.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" style="margin: 0 auto 16px;">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                        </svg>
                        <p style="font-size: 16px; font-weight: 500; color: var(--text-secondary); margin-bottom: 8px;">장바구니가 비어있습니다</p>
                        <p style="font-size: 14px; color: var(--text-secondary);">마음에 드는 상품을 담아보세요</p>
                    </div>
                `;
            }
        }
    }
}
