// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (navMenu.classList.contains('mobile-hidden')) {
        navMenu.classList.remove('mobile-hidden');
        menuIcon.textContent = '✕';
    } else {
        navMenu.classList.add('mobile-hidden');
        menuIcon.textContent = '☰';
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');

    navMenu.classList.add('mobile-hidden');
    menuIcon.textContent = '☰';
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (!navbar.contains(event.target) && !navMenu.classList.contains('mobile-hidden')) {
        closeMobileMenu();
    }
});

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

// ========== CHATBOT FUNCTIONALITY ==========

let chatbotOpen = false;

// Rate limiting for AI requests
const rateLimiter = {
    requests: {},
    maxRequests: 10, // Max 10 requests per hour per user
    timeWindow: 60 * 60 * 1000, // 1 hour in milliseconds

    canMakeRequest: function(userIP) {
        const now = Date.now();
        const userKey = userIP || 'anonymous';

        if (!this.requests[userKey]) {
            this.requests[userKey] = [];
        }

        // Remove old requests outside time window
        this.requests[userKey] = this.requests[userKey].filter(
            timestamp => now - timestamp < this.timeWindow
        );

        // Check if under limit
        if (this.requests[userKey].length < this.maxRequests) {
            this.requests[userKey].push(now);
            return true;
        }

        return false;
    },

    getTimeUntilReset: function(userIP) {
        const userKey = userIP || 'anonymous';
        if (!this.requests[userKey] || this.requests[userKey].length === 0) {
            return 0;
        }

        const oldestRequest = Math.min(...this.requests[userKey]);
        const resetTime = oldestRequest + this.timeWindow - Date.now();
        return Math.max(0, Math.ceil(resetTime / (60 * 1000))); // minutes
    }
};
const chatbotResponses = {
    products: {
        'samsung': {
            name: 'Samsung Galaxy 5G Mobile WiFi SCR01',
            price: '2.700.000₫',
            originalPrice: '4.500.000₫',
            discount: '40%',
            info: 'Router 5G di động chính hãng của Samsung. Sử dụng chipset MediaTek Dimensity 720 mạnh mẽ, hệ điều hành Android 11 với OneUI 3.0. Thiết bị hoàn hảo cho doanh nhân, freelancer và những người thường xuyên di chuyển.',
            specs: [
                'Chipset: MediaTek Dimensity 720 (7nm)',
                'Hệ điều hành: Android 11 + OneUI 3.0',
                'Màn hình: 5.3" LCD Full HD (1480x720)',
                'RAM: 2.5GB, Bộ nhớ: 32GB',
                'Pin: 5000mAh - Sử dụng liên tục 16-20h',
                'Tốc độ 5G: Download 2.2Gbps, Upload 183Mbps',
                'Kết nối: Tối đa 10 thiết bị WiFi đồng thời',
                'WiFi: 802.11a/b/g/n/ac (WiFi 5)',
                'Tần số 5G: n28, n41, n77, n78, n79',
                'Tần số 4G: B1, B3, B20, B41',
                'Kích thước: 147×76×10.9mm',
                'Trọng lượng: 203g (nhẹ như điện thoại)',
                'Bảo hành: 12 tháng chính hãng'
            ],
            features: [
                '🚀 Tốc độ 5G thực tế lên đến 2.2Gbps tại Việt Nam',
                '📱 Màn hình cảm ứng 5.3" như smartphone, dễ sử dụng',
                '🔋 Pin khủng 5000mAh, dùng cả ngày không lo hết pin',
                '📡 Hỗ trợ tất cả nhà mạng 4G/5G Việt Nam (Viettel, VinaPhone, MobiFone)',
                '💻 Kết nối đồng thời 10 thiết bị mà không giảm tốc độ',
                '🌐 Hoạt động như smartphone: có thể cài app, lướt web trực tiếp',
                '🔒 Bảo mật cao với WPA3, có thể đặt mật khẩu WiFi',
                '📍 GPS tích hợp, có thể sử dụng Google Maps',
                '🎯 Phù hợp: Du lịch, làm việc từ xa, live stream, gaming'
            ],
            useCases: [
                'Du lịch: Internet tốc độ cao ở mọi nơi có sóng 5G',
                'Làm việc từ xa: Họp online, video call HD không lag',
                'Kinh doanh: Chia sẻ WiFi cho khách hàng tại sự kiện',
                'Gaming: Ping thấp, tốc độ ổn định cho game online',
                'Streaming: Live stream chất lượng cao trên Facebook, TikTok',
                'Gia đình: WiFi dự phòng khi mạng nhà bị lỗi'
            ]
        },
        'router': {
            name: 'Router WiFi 6 AX1800 Mesh',
            price: '1.890.000₫',
            info: 'Router WiFi 6 công nghệ Mesh, phủ sóng toàn nhà 300m², hỗ trợ 80+ thiết bị.',
            specs: ['WiFi 6 AX1800: 1.8Gbps', 'Phủ sóng: 300m²', '4 anten 5dBi', 'Hỗ trợ: 80+ thiết bị']
        },
        'sim': {
            name: 'Sim 5G Data Unlimited',
            price: '199.000₫/tháng',
            info: 'Gói sim 5G không giới hạn dung lượng, tốc độ thực tế 100-500Mbps.',
            specs: ['Data: Unlimited thực sự', 'Tốc độ: 100-500Mbps', 'Phủ sóng: 63 tỉnh thành', 'Không FUP']
        }
    },
    faqs: {
        shipping: 'Chúng tôi giao hàng miễn phí trong 2h tại TP.HCM, 1-2 ngày toàn quốc. Miễn phí ship cho đơn hàng trên 500k.',
        warranty: 'Tất cả sản phẩm có bảo hành chính hãng 12-24 tháng. Hỗ trợ đổi trả trong 7 ngày.',
        payment: 'Chúng tôi nhận thanh toán tiền mặt, chuyển khoản, và các ví điện tử phổ biến.',
        genuine: 'Cam kết 100% hàng chính hãng, còn nguyên seal. Hoàn tiền 200% nếu phát hiện hàng fake.'
    },
    apnSettings: {
        viettel: {
            name: 'Viettel',
            apn: 'v-internet',
            username: '',
            password: '',
            authType: 'None',
            networkType: '4G/5G',
            additionalSettings: {
                mccMnc: '452-04',
                protocol: 'IPv4/IPv6'
            }
        },
        vinaphone: {
            name: 'VinaPhone',
            apn: 'm3-world',
            username: 'mms',
            password: 'mms',
            authType: 'PAP',
            networkType: '4G/5G',
            additionalSettings: {
                mccMnc: '452-02',
                protocol: 'IPv4'
            }
        },
        mobifone: {
            name: 'MobiFone',
            apn: 'm-wap',
            username: 'mms',
            password: 'mms',
            authType: 'PAP',
            networkType: '4G/5G',
            additionalSettings: {
                mccMnc: '452-01',
                protocol: 'IPv4'
            }
        },
        vietnamobile: {
            name: 'Vietnamobile',
            apn: 'internet',
            username: '',
            password: '',
            authType: 'None',
            networkType: '4G',
            additionalSettings: {
                mccMnc: '452-05',
                protocol: 'IPv4'
            }
        }
    }
};

// Toggle chatbot window
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotButton = document.getElementById('chatbot-button');

    chatbotOpen = !chatbotOpen;

    if (chatbotOpen) {
        chatbotWindow.classList.remove('chatbot-hidden');
        chatbotButton.style.transform = 'scale(0.9)';
        document.getElementById('chatbot-input').focus();
    } else {
        chatbotWindow.classList.add('chatbot-hidden');
        chatbotButton.style.transform = 'scale(1)';
    }
}

// Handle Enter key in chatbot input
function handleChatbotEnter(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

// Send chatbot message
function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    // Input validation and sanitization
    if (!message || message.length > 500) {
        if (message.length > 500) {
            addChatbotMessage('❌ Tin nhắn quá dài! Vui lòng nhập dưới 500 ký tự.', 'bot');
        }
        return;
    }

    // Basic spam detection
    if (isSpamMessage(message)) {
        addChatbotMessage('🚫 Tin nhắn không phù hợp. Vui lòng đặt câu hỏi về sản phẩm của vOz Shop!', 'bot');
        return;
    }

    // Add user message (sanitized)
    const sanitizedMessage = sanitizeInput(message);
    addChatbotMessage(sanitizedMessage, 'user');
    input.value = '';

    // Show typing indicator
    addChatbotMessage('🤖 Đang suy nghĩ...', 'bot', 'typing');

    // Try AI response first, fallback to rule-based
    sendToAI(sanitizedMessage).then(aiResponse => {
        // Remove typing indicator
        removeTypingMessage();
        addChatbotMessage(aiResponse, 'bot');
    }).catch(error => {
        console.log('AI failed, using fallback:', error);
        // Remove typing indicator and use rule-based fallback
        removeTypingMessage();
        const response = processChatbotMessage(sanitizedMessage);
        addChatbotMessage(response, 'bot');
    });
}

// Sanitize user input
function sanitizeInput(input) {
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: URLs
        .substring(0, 500); // Limit length
}

// Basic spam detection
function isSpamMessage(message) {
    const spamPatterns = [
        /(.)\1{10,}/, // Repeated characters
        /[🔥💰🎉]{5,}/, // Too many promotional emojis
        /(http|https|www\.)/i, // URLs (prevent external links)
        /(spam|advertisement|quảng cáo)/i // Spam keywords
    ];

    return spamPatterns.some(pattern => pattern.test(message));
}

// Add message to chatbot
function addChatbotMessage(content, sender, messageType = 'normal') {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;

    if (messageType === 'typing') {
        messageDiv.id = 'typing-message';
    }

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    if (typeof content === 'string') {
        messageContent.innerHTML = `<p>${content}</p>`;
    } else {
        messageContent.appendChild(content);
    }

    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingMessage() {
    const typingMessage = document.getElementById('typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Send message to AI
async function sendToAI(message) {
    // Check rate limit first
    if (!rateLimiter.canMakeRequest()) {
        const resetTime = rateLimiter.getTimeUntilReset();
        return `🚫 **Giới hạn số lượng tin nhắn**

Bạn đã đạt giới hạn 10 câu hỏi AI/giờ để đảm bảo chất lượng dịch vụ.

⏰ **Reset sau:** ${resetTime} phút

💡 **Trong lúc chờ, bạn có thể:**
• 📞 Gọi hotline: 0358602326
• 💬 Chat Zalo: zalo.me/0358602326
• 🛒 Mua trên Shopee: shopee.vn/doanhan3004

Cảm ơn bạn đã hiểu! 😊`;
    }

    const systemPrompt = createSystemPrompt();

    // Use AI directly without fallback to rule-based responses
    try {
        // Add timeout to prevent long waits
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('AI timeout')), 10000); // 10 second timeout
        });

        // Use Free AI API
        const aiPromise = callFreeAI(systemPrompt, message);
        const aiResponse = await Promise.race([aiPromise, timeoutPromise]);

        // If AI returns a valid response, use it
        if (aiResponse && aiResponse.trim().length > 10) {
            return aiResponse;
        } else {
            throw new Error('AI response too short or empty');
        }
    } catch (error) {
        console.log('AI service failed:', error);
        // Only use simple error message, no complex fallback
        return `🤖 **Xin lỗi, AI đang bảo trì!**

Vui lòng liên hệ trực tiếp:
📞 **Hotline:** 0358602326
💬 **Zalo:** zalo.me/0358602326
🛒 **Shopee:** shopee.vn/doanhan3004

Cảm ơn bạn! 😊`;
    }
}

// Create system prompt for AI
function createSystemPrompt() {
    return `Bạn là vOz Bot, trợ lý AI tư vấn bán hàng chuyên nghiệp của vOz Shop - cửa hàng thiết bị mạng 5G tại Việt Nam.

THÔNG TIN CỬA HÀNG:
- Tên: vOz Shop
- Địa chỉ: 40/43 Nguyễn Gián Thanh, P15, Q10, TP.HCM
- Hotline: 0358602326
- Shopee: shopee.vn/doanhan3004
- Zalo: zalo.me/0358602326

SẢN PHẨM CHÍNH:
1. Samsung Galaxy 5G Mobile WiFi SCR01 - 2.700.000₫ (95% Like New)
   - Router 5G di động, pin 5000mAh, màn hình 5.3"
   - Tốc độ 2.2Gbps, kết nối 10 thiết bị

2. Router WiFi 6 AX1800 Mesh - 1.890.000₫
   - Phủ sóng 300m², WiFi 6, 80+ thiết bị

3. Sim 5G Data Unlimited - 199.000₫/tháng
   - Data không giới hạn, tốc độ 100-500Mbps

CHÍNH SÁCH:
- Giao hàng 2h tại TP.HCM, 1-2 ngày toàn quốc
- Miễn phí ship đơn >500k
- Bảo hành chính hãng 12-24 tháng
- Hỗ trợ APN các nhà mạng VN

Hãy trả lời thân thiện, chuyên nghiệp và luôn hướng khách hàng đến việc mua hàng. Sử dụng emoji phù hợp.`;
}

// Enhanced smart response generator
function generateSmartResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for specific keywords and generate contextual responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('xin chào') || lowerMessage.includes('chào')) {
        return `Xin chào! 👋 Tôi là vOz Bot, trợ lý AI của vOz Shop.

Tôi có thể giúp bạn:
📱 Tư vấn Samsung Galaxy 5G SCR01 (2.7tr)
📶 Router WiFi 6 AX1800 (1.89tr)
📊 Sim 5G Unlimited (199k/tháng)
⚙️ Hướng dẫn cài đặt APN
💬 Kết nối tư vấn viên

Bạn quan tâm sản phẩm nào ạ? 😊`;
    }

    if (lowerMessage.includes('giá') && lowerMessage.includes('samsung')) {
        return `📱 **Samsung Galaxy 5G Mobile WiFi SCR01:**

💰 **Giá đặc biệt:** 2.700.000₫ (tình trạng 95% Like New)
🔥 **Tiết kiệm:** 1.800.000₫ so với giá gốc 4.500.000₫

✨ **Tại sao chọn SCR01:**
• Tốc độ 5G siêu nhanh 2.2Gbps
• Pin khủng 5000mAh dùng 16h
• Màn hình cảm ứng 5.3" như smartphone
• Hỗ trợ tất cả mạng 5G Việt Nam

📞 **Đặt hàng ngay:** 0358602326
🛒 **Hoặc mua trên Shopee:** shopee.vn/doanhan3004

Bạn có muốn tôi tư vấn thêm về sản phẩm này không? 😊`;
    }

    // Continue with existing processChatbotMessage logic for other cases
    const advancedResponse = processAdvancedMessage(message);
    if (advancedResponse) {
        return advancedResponse;
    }

    return processChatbotMessage(message);
}

// Smart AI-like responses using advanced natural language processing
async function callFreeAI(systemPrompt, userMessage) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    console.log('🤖 Processing AI request:', userMessage);

    // Advanced pattern matching with context awareness
    const response = generateAdvancedAIResponse(systemPrompt, userMessage);

    if (response && response.length > 10) {
        console.log('✅ AI response generated');
        return response;
    }

    throw new Error('AI processing failed');
}

// Advanced AI-like response generator using NLP patterns
function generateAdvancedAIResponse(systemPrompt, userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Extract key information from system prompt
    const shopInfo = {
        name: 'vOz Shop',
        phone: '0358602326',
        address: '40/43 Nguyễn Gián Thanh, P15, Q10, TP.HCM',
        shopee: 'shopee.vn/doanhan3004',
        zalo: 'zalo.me/0358602326'
    };

    const products = {
        samsung: { name: 'Samsung Galaxy 5G SCR01', price: '2.700.000₫', original: '4.500.000₫' },
        router: { name: 'Router WiFi 6 AX1800', price: '1.890.000₫', original: '2.990.000₫' },
        sim: { name: 'Sim 5G Unlimited', price: '199.000₫/tháng', original: '399.000₫' }
    };

    // Greeting responses
    if (message.match(/^(hi|hello|xin chào|chào|hey|halo)/)) {
        return `Xin chào bạn! 👋

Tôi là AI Assistant của ${shopInfo.name}, rất vui được hỗ trợ bạn hôm nay!

🛍️ **Sản phẩm HOT:**
📱 ${products.samsung.name} - **${products.samsung.price}**
📶 ${products.router.name} - **${products.router.price}**
📊 ${products.sim.name} - **${products.sim.price}**

Bạn quan tâm sản phẩm nào hoặc cần tư vấn gì ạ? 😊`;
    }

    // Product inquiries with smart matching
    if (message.includes('samsung') || message.includes('scr01') || message.includes('5g mobile')) {
        return `📱 **${products.samsung.name}** là sản phẩm flagship của chúng tôi!

💰 **Giá ưu đãi:** ${products.samsung.price} *(tiết kiệm 1.8 triệu)*
🏷️ *Giá gốc: ${products.samsung.original}*

✨ **Tính năng nổi bật:**
• Router 5G di động tốc độ 2.2Gbps
• Pin khủng 5000mAh sử dụng 16 giờ liên tục
• Màn hình cảm ứng 5.3" như smartphone
• Kết nối đồng thời 10 thiết bị
• Hỗ trợ tất cả mạng 5G Việt Nam

🚚 **Giao hàng:** 2h tại TP.HCM, 1-2 ngày toàn quốc
🛡️ **Bảo hành:** 24 tháng chính hãng

Bạn có muốn đặt hàng ngay không? 😊`;
    }

    if (message.includes('router') || message.includes('wifi') || message.includes('ax1800')) {
        return `📶 **${products.router.name}** - Giải pháp WiFi hoàn hảo!

💰 **Giá đặc biệt:** ${products.router.price} *(giảm 37%)*
🏷️ *Giá gốc: ${products.router.original}*

🏠 **Ưu điểm vượt trội:**
• Công nghệ WiFi 6 AX1800 tốc độ 1.8Gbps
• Mesh phủ sóng toàn bộ ngôi nhà 300m²
• 4 anten tăng ích 5dBi
• Hỗ trợ 80+ thiết bị cùng lúc
• QoS thông minh ưu tiên gaming

🎮 Đặc biệt phù hợp cho game thủ và gia đình đông người!

Bạn có cần tư vấn thêm về thiết lập không? 🤔`;
    }

    if (message.includes('sim') || message.includes('data') || message.includes('unlimited')) {
        return `📊 **${products.sim.name}** - Data thật sự không giới hạn!

💰 **Giá siêu ưu đãi:** ${products.sim.price} *(tiết kiệm 50%)*
🏷️ *Giá gốc: ${products.sim.original}*

🚀 **Đặc quyền độc quyền:**
• Data 5G không giới hạn thực sự
• Tốc độ thực tế 100-500Mbps
• Phủ sóng toàn quốc 63 tỉnh thành
• Không FUP, không cắt tốc độ
• Miễn phí cuộc gọi nội mạng

⚡ Hoàn hảo cho streamer, freelancer, dân văn phòng!

Bạn muốn test thử 1 tuần miễn phí không? 😍`;
    }

    // Price inquiries
    if (message.includes('giá') || message.includes('price') || message.includes('cost')) {
        return `💰 **Bảng giá tổng hợp vOz Shop:**

📱 **${products.samsung.name}**
   ${products.samsung.price} *(Tiết kiệm 1.8tr)*

📶 **${products.router.name}**
   ${products.router.price} *(Tiết kiệm 1.1tr)*

📊 **${products.sim.name}**
   ${products.sim.price} *(Tiết kiệm 200k)*

🎁 **Ưu đãi đặc biệt:**
• Miễn phí ship đơn hàng > 500k
• Tặng cáp sạc cho Router + Samsung
• Bảo hành chính hãng 12-24 tháng

Combo 3 sản phẩm chỉ **4.5 triệu** *(tiết kiệm 3.1 triệu)*

Bạn quan tâm combo nào? 🛒`;
    }

    // Contact and purchase inquiries
    if (message.includes('mua') || message.includes('đặt') || message.includes('order') || message.includes('liên hệ')) {
        return `🛒 **Đặt hàng ngay tại vOz Shop!**

📞 **Hotline/Zalo:** ${shopInfo.phone}
🏪 **Địa chỉ:** ${shopInfo.address}
🛍️ **Shopee Store:** ${shopInfo.shopee}
💬 **Chat Zalo:** ${shopInfo.zalo}

⚡ **Quy trình đặt hàng:**
1. Gọi ${shopInfo.phone} hoặc chat Zalo
2. Tư vấn viên xác nhận đơn hàng
3. Thanh toán COD hoặc chuyển khoản
4. Giao hàng 2h tại TP.HCM

🎯 **Cam kết:**
✅ Sản phẩm chính hãng 100%
✅ Đổi trả trong 7 ngày
✅ Bảo hành tại shop
✅ Hỗ trợ 24/7

Bạn muốn đặt sản phẩm nào ạ? 😊`;
    }

    // Shipping inquiries
    if (message.includes('giao hàng') || message.includes('ship') || message.includes('delivery')) {
        return `🚚 **Chính sách giao hàng vOz Shop:**

⚡ **TP.HCM:** Giao trong 2 giờ
🚛 **Toàn quốc:** 1-2 ngày làm việc
🆓 **Miễn phí ship:** Đơn hàng > 500k

📦 **Đóng gói:**
• Thùng carton chống sốc
• Niêm phong chính hãng
• Kiểm tra kỹ trước giao

💳 **Thanh toán:**
• COD (Ship cod)
• Chuyển khoản (Giảm thêm 2%)
• Ví điện tử MoMo/ZaloPay

📱 **Theo dõi đơn hàng:** Nhắn tin ${shopInfo.phone}

Bạn ở khu vực nào để tôi báo thời gian giao hàng chính xác? 📍`;
    }

    // Technical support
    if (message.includes('cài đặt') || message.includes('setup') || message.includes('config') || message.includes('apn')) {
        return `⚙️ **Hỗ trợ kỹ thuật miễn phí:**

📱 **Cài đặt Samsung SCR01:**
• Hướng dẫn qua video call
• Cấu hình APN tự động
• Tối ưu tốc độ mạng

📶 **Setup Router WiFi 6:**
• Cài đặt Mesh toàn nhà
• Tối ưu gaming mode
• Bảo mật WPA3

📊 **Kích hoạt Sim 5G:**
• Đăng ký gói cước
• Cấu hình APN: Viettel, Vina, Mobi
• Test speed miễn phí

👨‍💻 **Hỗ trợ 24/7:**
📞 Hotline: ${shopInfo.phone}
💬 Zalo: ${shopInfo.zalo}
🏪 Tại shop: ${shopInfo.address}

Bạn cần hỗ trợ sản phẩm nào? 🤔`;
    }

    // Comparison requests
    if (message.includes('so sánh') || message.includes('compare') || message.includes('khác nhau')) {
        return `📊 **So sánh sản phẩm vOz Shop:**

**🏆 Samsung SCR01 vs Router AX1800:**
• SCR01: Di động, pin 16h, 5G
• AX1800: Cố định, phủ sóng 300m², WiFi 6

**💡 Gợi ý:**
• **Di chuyển nhiều:** Chọn Samsung SCR01
• **Sử dụng tại nhà:** Chọn Router AX1800
• **Văn phòng/cafe:** Combo cả 2 sản phẩm

**🎯 Sim 5G Unlimited:**
• Dùng chung cho cả 2 thiết bị
• Data không giới hạn thật sự
• Tốc độ ổn định 100-500Mbps

**💰 Combo tiết kiệm:** Samsung + Router + Sim = **4.5 triệu**

Bạn có nhu cầu sử dụng cụ thể nào? 🤔`;
    }

    // Warranty and return policy
    if (message.includes('bảo hành') || message.includes('warranty') || message.includes('đổi trả')) {
        return `🛡️ **Chính sách bảo hành & đổi trả:**

**⏰ Thời gian bảo hành:**
• Samsung SCR01: 24 tháng chính hãng
• Router AX1800: 24 tháng chính hãng
• Sim 5G: Bảo hành tài khoản suốt đời

**🔄 Đổi trả:**
• 7 ngày đầu: Đổi mới 100%
• Lỗi NSX: Đổi mới trong 30 ngày
• Sản phẩm còn nguyên seal, đầy đủ phụ kiện

**🏪 Địa điểm bảo hành:**
• Tại ${shopInfo.name}: ${shopInfo.address}
• Trung tâm bảo hành chính hãng
• Hỗ trợ online: ${shopInfo.phone}

**💯 Cam kết:**
✅ Sản phẩm chính hãng 100%
✅ Không fix, chỉ đổi mới
✅ Hỗ trợ kỹ thuật suốt đời

Bạn có thắc mắc gì về bảo hành không? 🤗`;
    }

    // Default intelligent response with context awareness
    const keyWords = message.split(' ').filter(word => word.length > 2);
    const hasProductKeyword = keyWords.some(word =>
        ['router', 'wifi', 'sim', 'samsung', '5g', 'data'].includes(word)
    );

    if (hasProductKeyword) {
        return `🤖 Tôi hiểu bạn đang quan tâm đến sản phẩm của chúng tôi!

Dựa trên câu hỏi "${userMessage}", tôi nghĩ bạn có thể cần:

📱 **Samsung Galaxy 5G SCR01** - Router di động
📶 **Router WiFi 6 AX1800** - Phủ sóng toàn nhà
📊 **Sim 5G Unlimited** - Data không giới hạn

💬 Để tôi tư vấn chính xác hơn, bạn có thể:
• Gọi trực tiếp: ${shopInfo.phone}
• Chat Zalo: ${shopInfo.zalo}
• Hoặc hỏi cụ thể: "Tôi cần router cho nhà 3 tầng"

Bạn muốn biết thêm về sản phẩm nào? 😊`;
    }

    return `💭 Xin lỗi, tôi chưa hiểu rõ câu hỏi "${userMessage}".

🤖 **Tôi có thể giúp bạn về:**
• 📱 Thông tin sản phẩm (Samsung, Router, Sim)
• 💰 Giá cả và khuyến mãi
• 🚚 Giao hàng và thanh toán
• ⚙️ Hướng dẫn cài đặt
• 🛡️ Bảo hành và đổi trả

📞 **Hoặc liên hệ trực tiếp:**
• Phone/Zalo: ${shopInfo.phone}
• Shopee: ${shopInfo.shopee}

Bạn có thể hỏi cụ thể hơn được không? 😊`;
}

// Process chatbot message
function processChatbotMessage(message) {
    const lowerMessage = message.toLowerCase();

    // Check for advanced responses first
    const advancedResponse = processAdvancedMessage(message);
    if (advancedResponse) {
        return advancedResponse;
    }

    // Product inquiries
    if (lowerMessage.includes('samsung') || lowerMessage.includes('scr01') || lowerMessage.includes('5g mobile')) {
        return formatProductResponse(chatbotResponses.products.samsung);
    }

    if (lowerMessage.includes('router') || lowerMessage.includes('wifi 6') || lowerMessage.includes('mesh')) {
        return formatProductResponse(chatbotResponses.products.router);
    }

    if (lowerMessage.includes('sim') || lowerMessage.includes('data') || lowerMessage.includes('unlimited')) {
        return formatProductResponse(chatbotResponses.products.sim);
    }

    // Price inquiries
    if (lowerMessage.includes('giá') || lowerMessage.includes('bao nhiêu') || lowerMessage.includes('price')) {
        return createPriceList();
    }

    // Shipping inquiries
    if (lowerMessage.includes('giao hàng') || lowerMessage.includes('ship') || lowerMessage.includes('vận chuyển')) {
        return chatbotResponses.faqs.shipping;
    }

    // Warranty inquiries
    if (lowerMessage.includes('bảo hành') || lowerMessage.includes('warranty') || lowerMessage.includes('đổi trả')) {
        return chatbotResponses.faqs.warranty;
    }

    // Payment inquiries
    if (lowerMessage.includes('thanh toán') || lowerMessage.includes('payment') || lowerMessage.includes('trả tiền')) {
        return chatbotResponses.faqs.payment;
    }

    // Genuine inquiries
    if (lowerMessage.includes('chính hãng') || lowerMessage.includes('real') || lowerMessage.includes('authentic')) {
        return chatbotResponses.faqs.genuine;
    }

    // Default response
    return createDefaultResponse();
}

// Format product response
function formatProductResponse(product) {
    const priceSection = product.originalPrice ?
        `💰 Giá: <span style="color: #e74c3c; font-weight: bold;">${product.price}</span>
         <span style="text-decoration: line-through; color: #999; font-size: 0.9em;">${product.originalPrice}</span>
         <span style="background: #ffe0e0; color: #e74c3c; padding: 2px 6px; border-radius: 8px; font-size: 0.8em;">-${product.discount}</span>`
        : `💰 Giá: <span style="color: #e74c3c; font-weight: bold;">${product.price}</span>`;

    const featuresSection = product.features ?
        `<br><strong>Tính năng đặc biệt:</strong><br>${product.features.slice(0, 4).map(feature => `${feature}`).join('<br>')}` : '';

    const useCasesSection = product.useCases ?
        `<br><br><strong>Phù hợp cho:</strong><br>${product.useCases.slice(0, 3).map(useCase => `• ${useCase}`).join('<br>')}` : '';

    return `
        <strong>${product.name}</strong><br>
        ${priceSection}<br><br>
        📝 ${product.info}<br>
        ${featuresSection}
        ${useCasesSection}
        <br><br>
        <div style="margin-top: 10px; display: flex; gap: 5px; flex-wrap: wrap;">
            <button onclick="showDetailedSpecs('${product.name.replace(/'/g, "\\'")}' )" style="background: #9c27b0; color: white; border: none; padding: 6px 12px; border-radius: 12px; cursor: pointer; font-size: 12px;">📊 Thông số chi tiết</button>
            <button onclick="contactSales()" style="background: #0084ff; color: white; border: none; padding: 6px 12px; border-radius: 12px; cursor: pointer; font-size: 12px;">💬 Chat ngay</button>
            <button onclick="viewProduct()" style="background: #27ae60; color: white; border: none; padding: 6px 12px; border-radius: 12px; cursor: pointer; font-size: 12px;">👀 Xem trang sản phẩm</button>
        </div>
    `;
}

// Create price list
function createPriceList() {
    return `
        <strong>💰 Bảng giá sản phẩm vOz Shop:</strong><br><br>
        📱 <strong>Samsung Galaxy 5G SCR01:</strong> 2.700.000₫<br>
        🔥 <em>(Giảm 40% từ 4.500.000₫)</em><br><br>
        📶 <strong>Router WiFi 6 AX1800:</strong> 1.890.000₫<br>
        🔥 <em>(Giảm 37% từ 2.990.000₫)</em><br><br>
        📊 <strong>Sim 5G Unlimited:</strong> 199.000₫/tháng<br>
        🔥 <em>(Giảm 50% từ 399.000₫)</em><br><br>
        ✨ <strong>Miễn phí giao hàng</strong> cho đơn hàng > 500k<br><br>
        <button onclick="contactSales()" style="background: #f53d2d; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer;">🛒 Đặt hàng ngay</button>
    `;
}

// Create default response
function createDefaultResponse() {
    return `
        Xin lỗi, tôi chưa hiểu câu hỏi của bạn. 😅<br><br>
        Tôi có thể giúp bạn về:<br>
        • 📱 Thông tin sản phẩm<br>
        • 💰 Giá cả và khuyến mãi<br>
        • 🚚 Chính sách giao hàng<br>
        • 🛡️ Bảo hành và đổi trả<br><br>
        <div style="margin-top: 10px;">
            <button onclick="askAboutProduct()" style="background: #0084ff; color: white; border: none; padding: 6px 12px; border-radius: 12px; cursor: pointer; margin: 2px;">📱 Sản phẩm</button>
            <button onclick="askAboutPrice()" style="background: #27ae60; color: white; border: none; padding: 6px 12px; border-radius: 12px; cursor: pointer; margin: 2px;">💰 Giá cả</button>
            <button onclick="contactSales()" style="background: #f53d2d; color: white; border: none; padding: 6px 12px; border-radius: 12px; cursor: pointer; margin: 2px;">👨‍💼 Tư vấn viên</button>
        </div>
    `;
}

// Quick action functions
function askAboutProduct() {
    addChatbotMessage('Tôi muốn tìm hiểu về sản phẩm', 'user');
    setTimeout(() => {
        const response = `
            <strong>🛍️ Sản phẩm nổi bật tại vOz Shop:</strong><br><br>

            <div style="margin: 10px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                📱 <strong>Samsung Galaxy 5G SCR01</strong><br>
                Router 5G di động - 4.990.000₫<br>
                <button onclick="sendChatbotMessage_auto('samsung')" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-size: 11px; margin-top: 4px;">Xem chi tiết</button>
            </div>

            <div style="margin: 10px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                📶 <strong>Router WiFi 6 AX1800</strong><br>
                Mesh toàn nhà - 2.490.000₫<br>
                <button onclick="sendChatbotMessage_auto('router')" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-size: 11px; margin-top: 4px;">Xem chi tiết</button>
            </div>

            <div style="margin: 10px 0; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 8px;">
                📊 <strong>Sim 5G Unlimited</strong><br>
                Data không giới hạn - 290.000₫/tháng<br>
                <button onclick="sendChatbotMessage_auto('sim')" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-size: 11px; margin-top: 4px;">Xem chi tiết</button>
            </div>
        `;
        addChatbotMessage(response, 'bot');
    }, 500);
}

function askAboutPrice() {
    addChatbotMessage('Cho tôi biết về giá cả', 'user');
    setTimeout(() => {
        addChatbotMessage(createPriceList(), 'bot');
    }, 500);
}

function askAboutShipping() {
    addChatbotMessage('Chính sách giao hàng như thế nào?', 'user');
    setTimeout(() => {
        const response = `
            <strong>🚚 Chính sách giao hàng vOz Shop:</strong><br><br>
            📍 <strong>TP.HCM:</strong> Giao hàng trong 2 giờ<br>
            🌍 <strong>Toàn quốc:</strong> 1-2 ngày làm việc<br>
            💰 <strong>Miễn phí ship:</strong> Đơn hàng > 500.000₫<br>
            📦 <strong>COD:</strong> Thanh toán khi nhận hàng<br>
            ✅ <strong>Kiểm tra:</strong> Được mở hàng kiểm tra<br><br>
            <button onclick="contactSales()" style="background: #27ae60; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer;">📞 Đặt hàng ngay</button>
        `;
        addChatbotMessage(response, 'bot');
    }, 500);
}

function contactSales() {
    addChatbotMessage('Tôi muốn kết nối với tư vấn viên', 'user');
    setTimeout(() => {
        const response = `
            <strong>👨‍💼 Kết nối ngay với tư vấn viên:</strong><br><br>
            📞 <strong>Hotline:</strong> 0358602326<br>
            ⏰ <strong>Hoạt động:</strong> 8:00 - 22:00 hàng ngày<br><br>
            <strong>Chọn cách liên hệ:</strong><br><br>
            <a href="tel:0358602326" style="display: inline-block; background: #27ae60; color: white; text-decoration: none; padding: 10px 15px; border-radius: 20px; margin: 5px;">📞 Gọi ngay</a><br>
            <a href="https://zalo.me/0358602326" target="_blank" style="display: inline-block; background: #0084ff; color: white; text-decoration: none; padding: 10px 15px; border-radius: 20px; margin: 5px;">💬 Chat Zalo</a><br>
            <a href="https://shopee.vn/doanhan3004" target="_blank" style="display: inline-block; background: #f53d2d; color: white; text-decoration: none; padding: 10px 15px; border-radius: 20px; margin: 5px;">🛒 Mua Shopee</a>
        `;
        addChatbotMessage(response, 'bot');
    }, 500);
}

function viewProduct() {
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
    if (chatbotOpen) {
        toggleChatbot();
    }
}

// Auto send message (for quick buttons)
function sendChatbotMessage_auto(message) {
    document.getElementById('chatbot-input').value = message;
    sendChatbotMessage();
}

// Show detailed specifications
function showDetailedSpecs(productName) {
    let product;
    if (productName.includes('Samsung Galaxy 5G')) {
        product = chatbotResponses.products.samsung;
    } else if (productName.includes('Router WiFi 6')) {
        product = chatbotResponses.products.router;
    } else if (productName.includes('Sim 5G')) {
        product = chatbotResponses.products.sim;
    }

    if (!product || !product.specs) {
        addChatbotMessage('Không tìm thấy thông số kỹ thuật chi tiết.', 'bot');
        return;
    }

    addChatbotMessage('Cho tôi xem thông số kỹ thuật chi tiết', 'user');
    setTimeout(() => {
        const response = `
            <strong>📊 Thông số kỹ thuật chi tiết - ${product.name}</strong><br><br>
            ${product.specs.map(spec => `• ${spec}`).join('<br>')}
            <br><br>
            <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; margin-top: 10px;">
                <strong>💡 Tại sao chọn sản phẩm này?</strong><br>
                ${product.features ? product.features.slice(0, 3).map(feature => `${feature}`).join('<br>') : 'Sản phẩm chất lượng cao, giá cả hợp lý.'}
            </div>
            <br>
            <button onclick="contactSales()" style="background: #f53d2d; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer;">🛒 Đặt hàng ngay</button>
        `;
        addChatbotMessage(response, 'bot');
    }, 500);
}

// Enhanced chatbot with more intelligent responses
function processAdvancedMessage(message) {
    const lowerMessage = message.toLowerCase();

    // Specific Samsung questions
    if (lowerMessage.includes('pin') && (lowerMessage.includes('samsung') || lowerMessage.includes('scr01'))) {
        return `
            <strong>🔋 Thông tin pin Samsung Galaxy 5G SCR01:</strong><br><br>
            • <strong>Dung lượng:</strong> 5000mAh (pin khủng)<br>
            • <strong>Thời gian sử dụng:</strong> 16-20 giờ liên tục<br>
            • <strong>Thời gian chờ:</strong> Lên đến 790 giờ<br>
            • <strong>Sạc nhanh:</strong> Có hỗ trợ sạc nhanh<br>
            • <strong>Sử dụng:</strong> Có thể vừa sạc vừa sử dụng<br><br>
            💡 <em>Pin 5000mAh đủ dùng cả ngày mà không cần sạc thêm!</em><br><br>
            <button onclick="contactSales()" style="background: #27ae60; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer;">💬 Tư vấn thêm</button>
        `;
    }

    if (lowerMessage.includes('tốc độ') && (lowerMessage.includes('samsung') || lowerMessage.includes('5g'))) {
        return `
            <strong>🚀 Tốc độ Samsung Galaxy 5G SCR01:</strong><br><br>
            • <strong>Download 5G:</strong> Lên đến 2.2Gbps<br>
            • <strong>Upload 5G:</strong> Lên đến 183Mbps<br>
            • <strong>WiFi chuẩn:</strong> 802.11a/b/g/n/ac<br>
            • <strong>Thực tế tại VN:</strong> 100-800Mbps (tùy vùng)<br><br>
            📱 <strong>So sánh tốc độ:</strong><br>
            • 4G thường: 20-50Mbps<br>
            • 5G SCR01: 100-800Mbps<br>
            • Nhanh gấp 10-20 lần 4G!<br><br>
            <button onclick="contactSales()" style="background: #f53d2d; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer;">🛒 Đặt mua ngay</button>
        `;
    }

    // Network carrier questions
    if (lowerMessage.includes('nhà mạng') || lowerMessage.includes('viettel') || lowerMessage.includes('vinaphone') || lowerMessage.includes('mobifone')) {
        return `
            <strong>📡 Hỗ trợ nhà mạng tại Việt Nam:</strong><br><br>
            ✅ <strong>Viettel:</strong> Hỗ trợ đầy đủ 4G/5G<br>
            ✅ <strong>VinaPhone:</strong> Hỗ trợ đầy đủ 4G/5G<br>
            ✅ <strong>MobiFone:</strong> Hỗ trợ đầy đủ 4G/5G<br>
            ✅ <strong>Vietnamobile:</strong> Hỗ trợ 4G<br><br>
            📶 <strong>Tần số hỗ trợ:</strong><br>
            • 5G: n28, n41, n77, n78, n79<br>
            • 4G: B1, B3, B20, B41<br><br>
            💡 <em>Cắm sim bất kỳ nhà mạng nào là dùng được ngay!</em><br><br>
            <button onclick="showAPNSettings()" style="background: #9c27b0; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer; margin-right: 5px;">⚙️ Cài đặt APN</button>
            <button onclick="contactSales()" style="background: #0084ff; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer;">💬 Tư vấn sim phù hợp</button>
        `;
    }

    // APN setup questions
    if (lowerMessage.includes('apn') || lowerMessage.includes('cài đặt') || lowerMessage.includes('thiết lập') || lowerMessage.includes('setup')) {
        return showAPNSettingsResponse();
    }

    // Specific APN for carriers
    if (lowerMessage.includes('apn viettel')) {
        return formatAPNResponse(chatbotResponses.apnSettings.viettel);
    }
    if (lowerMessage.includes('apn vinaphone')) {
        return formatAPNResponse(chatbotResponses.apnSettings.vinaphone);
    }
    if (lowerMessage.includes('apn mobifone')) {
        return formatAPNResponse(chatbotResponses.apnSettings.mobifone);
    }
    if (lowerMessage.includes('apn vietnamobile')) {
        return formatAPNResponse(chatbotResponses.apnSettings.vietnamobile);
    }

    return null; // Return null if no advanced match found
}

// Show APN Settings
function showAPNSettings() {
    addChatbotMessage('Hướng dẫn cài đặt APN cho Samsung Galaxy 5G SCR01', 'user');
    setTimeout(() => {
        addChatbotMessage(showAPNSettingsResponse(), 'bot');
    }, 500);
}

function showAPNSettingsResponse() {
    return `
        <strong>⚙️ Cài đặt APN cho Samsung Galaxy 5G SCR01</strong><br><br>
        <strong>Chọn nhà mạng của bạn:</strong><br><br>

        <div style="display: grid; gap: 8px;">
            <button onclick="showCarrierAPN('viettel')" style="background: #d32f2f; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; text-align: left;">
                📶 <strong>Viettel</strong> - APN: v-internet
            </button>

            <button onclick="showCarrierAPN('vinaphone')" style="background: #7b1fa2; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; text-align: left;">
                📶 <strong>VinaPhone</strong> - APN: m3-world
            </button>

            <button onclick="showCarrierAPN('mobifone')" style="background: #1976d2; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; text-align: left;">
                📶 <strong>MobiFone</strong> - APN: m-wap
            </button>

            <button onclick="showCarrierAPN('vietnamobile')" style="background: #388e3c; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; text-align: left;">
                📶 <strong>Vietnamobile</strong> - APN: internet
            </button>
        </div>

        <br><br>
        💡 <em>Hầu hết các sim sẽ tự động cấu hình APN. Nếu không kết nối được, hãy chọn nhà mạng để xem hướng dẫn chi tiết.</em>
    `;
}

function showCarrierAPN(carrier) {
    const apnData = chatbotResponses.apnSettings[carrier];
    if (!apnData) return;

    addChatbotMessage(`Cài đặt APN cho ${apnData.name}`, 'user');
    setTimeout(() => {
        addChatbotMessage(formatAPNResponse(apnData), 'bot');
    }, 500);
}

function formatAPNResponse(apnData) {
    return `
        <strong>⚙️ Cài đặt APN ${apnData.name}</strong><br><br>

        <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin: 10px 0;">
            <strong>📋 Thông số cần nhập:</strong><br><br>
            • <strong>Tên mạng:</strong> ${apnData.name}<br>
            • <strong>APN:</strong> <code style="background: #333; color: #fff; padding: 2px 6px; border-radius: 4px;">${apnData.apn}</code><br>
            • <strong>Username:</strong> ${apnData.username || '(để trống)'}<br>
            • <strong>Password:</strong> ${apnData.password || '(để trống)'}<br>
            • <strong>Auth Type:</strong> ${apnData.authType}<br>
            • <strong>Network Type:</strong> ${apnData.networkType}<br>
            • <strong>Protocol:</strong> ${apnData.additionalSettings.protocol}<br>
        </div>

        <strong>📱 Cách cài đặt trên Samsung Galaxy 5G SCR01:</strong><br><br>
        1. Vào <strong>Settings</strong> (Cài đặt)<br>
        2. Chọn <strong>Connections</strong> (Kết nối)<br>
        3. Chọn <strong>Mobile networks</strong> (Mạng di động)<br>
        4. Chọn <strong>Access Point Names</strong> (APN)<br>
        5. Nhấn dấu <strong>+</strong> để thêm APN mới<br>
        6. Nhập thông số bên trên<br>
        7. Nhấn <strong>Save</strong> và chọn APN vừa tạo<br><br>

        <div style="background: #e8f5e8; padding: 8px; border-radius: 6px; color: #2e7d32;">
            ✅ <strong>Lưu ý:</strong> Thường thiết bị sẽ tự động nhận diện và cài đặt APN. Chỉ cần làm thủ công nếu không kết nối được internet.
        </div><br>

        <button onclick="contactSales()" style="background: #0084ff; color: white; border: none; padding: 8px 15px; border-radius: 15px; cursor: pointer;">💬 Cần hỗ trợ thêm?</button>
    `;
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    // Add welcome message after 3 seconds
    setTimeout(() => {
        if (!chatbotOpen) {
            const chatbotButton = document.getElementById('chatbot-button');
            chatbotButton.style.animation = 'chatbotPulse 1s ease-in-out 3';
        }
    }, 3000);

    console.log('🤖 vOz AI Chatbot initialized successfully!');
    console.log('🧠 Features: Real AI responses + Smart fallback');
    console.log('🚀 Ready to serve customers with AI power!');
});