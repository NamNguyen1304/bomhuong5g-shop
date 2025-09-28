// Product data
const products = {
    1: {
        id: 1,
        name: "Samsung Galaxy 5G Mobile WiFi SCR01",
        price: 4500000,
        image: "https://www.4gltemall.com/media/catalog/product/cache/1/image/650x650/9df78eab33525d08d6e5fb8d27136e95/s/a/samsung_galaxy_5g_mobile_wifi_scr01_.png",
        features: [
            "Tốc độ 5G lên đến 2.2Gbps",
            "Màn hình LCD 5.3 inch (1480x720)",
            "Pin 5000mAh - 16h sử dụng",
            "Kết nối tối đa 10 thiết bị",
            "Chipset MediaTek Dimensity 720",
            "Hỗ trợ Android 11 + OneUI 3.0",
            "Bảo hành 12 tháng"
        ],
        specifications: {
            "Màn hình": "5.3 inch LCD (1480x720)",
            "Chipset": "MediaTek Dimensity 720",
            "RAM": "2.5GB",
            "Bộ nhớ": "32GB",
            "Pin": "5000mAh",
            "Tốc độ tải xuống": "2.2Gbps",
            "Tốc độ tải lên": "183Mbps",
            "Kết nối WiFi": "802.11a/b/g/n/ac",
            "Kích thước": "147x76x10.9mm",
            "Trọng lượng": "203g",
            "5G Bands": "n28, n41, n77, n78, n79",
            "4G Bands": "B1, B3, B20, B41"
        }
    },
    2: {
        id: 2,
        name: "Samsung SCR01 5G Pro Package",
        price: 5500000,
        image: "https://www.4gltemall.com/media/catalog/product/cache/1/image/650x650/9df78eab33525d08d6e5fb8d27136e95/s/a/samsung_galaxy_5g_mobile_wifi_scr01_.png",
        features: [
            "Samsung SCR01 5G Router",
            "Tốc độ 5G lên đến 2.2Gbps",
            "Pin 5000mAh + Pin dự phòng 10000mAh",
            "Màn hình LCD 5.3 inch",
            "Kết nối 10 thiết bị đồng thời",
            "Ốp lưng bảo vệ cao cấp",
            "Cáp USB-C + Adapter sạc nhanh",
            "Bảo hành 18 tháng"
        ],
        specifications: {
            "Bao gồm": "SCR01 + Pin dự phòng + Phụ kiện",
            "Màn hình": "5.3 inch LCD (1480x720)",
            "Pin chính": "5000mAh",
            "Pin dự phòng": "10000mAh",
            "Thời gian sử dụng": "Lên đến 32h",
            "Sạc nhanh": "25W",
            "Ốp lưng": "Chống sốc, chống nước IP54",
            "Phụ kiện": "Cáp USB-C, Adapter, Túi đựng"
        }
    },
    3: {
        id: 3,
        name: "Samsung SCR01 5G Business Package",
        price: 7500000,
        image: "https://www.4gltemall.com/media/catalog/product/cache/1/image/650x650/9df78eab33525d08d6e5fb8d27136e95/s/a/samsung_galaxy_5g_mobile_wifi_scr01_.png",
        features: [
            "Samsung SCR01 5G Router chính hãng",
            "Tốc độ 5G siêu cao 2.2Gbps",
            "Pin 5000mAh + 2x Pin dự phòng",
            "Đế sạc không dây Qi",
            "Sim 5G unlimited 12 tháng",
            "Phần mềm quản lý doanh nghiệp",
            "Hỗ trợ VPN tích hợp",
            "Bảo hành 24 tháng"
        ],
        specifications: {
            "Gói doanh nghiệp": "SCR01 + Sim + Phần mềm",
            "Data 5G": "Unlimited 12 tháng",
            "Sạc không dây": "15W Qi Wireless",
            "Pin tổng": "25000mAh (3 pin)",
            "VPN": "Tích hợp sẵn",
            "Quản lý": "Web dashboard + Mobile app",
            "Bảo mật": "WPA3 + Enterprise Security",
            "Hỗ trợ": "24/7 Business Support"
        }
    }
};

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const closeModal = document.querySelector('.close');
const cartBtn = document.querySelector('.cart-btn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    setupEventListeners();
});

// Event listeners
function setupEventListeners() {
    // Cart button click
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showCart();
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
    
    // Show success message
    showNotification('Đã thêm sản phẩm vào giỏ hàng!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    displayCartItems();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        displayCartItems();
    }
}

// Update cart display
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = formatPrice(total);
}

// Show cart modal
function showCart() {
    displayCartItems();
    cartModal.style.display = 'block';
}

// Display cart items
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p class="item-price">${formatPrice(item.price)}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="qty-btn">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="qty-btn">+</button>
            </div>
            <div class="item-total">
                ${formatPrice(item.price * item.quantity)}
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">×</button>
        </div>
    `).join('');
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order summary
    let orderSummary = 'Đơn hàng của bạn:\n\n';
    cart.forEach(item => {
        orderSummary += `${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    orderSummary += `\nTổng cộng: ${formatPrice(total)}`;
    
    // Show order form
    showOrderForm(orderSummary, total);
}

// Show order form
function showOrderForm(orderSummary, total) {
    const orderForm = `
        <div class="order-form">
            <h3>Thông tin đặt hàng</h3>
            <form id="checkout-form">
                <div class="form-group">
                    <label>Họ và tên:</label>
                    <input type="text" id="customer-name" required>
                </div>
                <div class="form-group">
                    <label>Số điện thoại:</label>
                    <input type="tel" id="customer-phone" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" id="customer-email" required>
                </div>
                <div class="form-group">
                    <label>Địa chỉ giao hàng:</label>
                    <textarea id="customer-address" required></textarea>
                </div>
                <div class="form-group">
                    <label>Ghi chú:</label>
                    <textarea id="order-notes"></textarea>
                </div>
                <div class="order-summary">
                    <h4>Tổng đơn hàng: ${formatPrice(total)}</h4>
                </div>
                <button type="submit" class="btn-confirm-order">Xác nhận đặt hàng</button>
            </form>
        </div>
    `;
    
    cartItems.innerHTML = orderForm;
    
    // Handle form submission
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        processOrder();
    });
}

// Process order
function processOrder() {
    const customerData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        address: document.getElementById('customer-address').value,
        notes: document.getElementById('order-notes').value
    };

    // Generate order ID
    const orderId = 'WF' + Date.now().toString().slice(-8);
    
    // Save order to localStorage (in real app, send to server)
    const order = {
        id: orderId,
        customer: customerData,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Show success message
    cartModal.style.display = 'none';
    showOrderSuccess(orderId);
}

// Show order success
function showOrderSuccess(orderId) {
    const successModal = `
        <div class="modal" id="success-modal" style="display: block;">
            <div class="modal-content">
                <h2 style="color: #27ae60; text-align: center;">✅ Đặt hàng thành công!</h2>
                <p style="text-align: center; margin: 2rem 0;">
                    Mã đơn hàng của bạn: <strong>${orderId}</strong><br>
                    Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng.
                </p>
                <button onclick="closeSuccessModal()" class="btn-primary" style="width: 100%;">Đóng</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successModal);
}

// Close success modal
function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.remove();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .cart-item {
        display: grid;
        grid-template-columns: 60px 1fr auto auto auto;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #ecf0f1;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .qty-btn {
        background: #3498db;
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .qty-btn:hover {
        background: #2980b9;
    }
    
    .remove-btn {
        background: #e74c3c;
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
    }
    
    .remove-btn:hover {
        background: #c0392b;
    }
    
    .form-group {
        margin-bottom: 1rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
    }
    
    .form-group textarea {
        height: 80px;
        resize: vertical;
    }
    
    .btn-confirm-order {
        background: #27ae60;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.1rem;
        width: 100%;
        margin-top: 1rem;
    }
    
    .btn-confirm-order:hover {
        background: #219a52;
    }
    
    .empty-cart {
        text-align: center;
        color: #7f8c8d;
        font-style: italic;
        padding: 2rem;
    }
    
    .order-summary {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 5px;
        margin: 1rem 0;
        text-align: center;
    }
`;

document.head.appendChild(style);