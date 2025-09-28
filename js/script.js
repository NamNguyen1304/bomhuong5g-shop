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
const chatbotResponses = {
    products: {
        'samsung': {
            name: 'Samsung Galaxy 5G Mobile WiFi SCR01',
            price: '4.990.000₫',
            originalPrice: '6.990.000₫',
            discount: '29%',
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
            price: '2.490.000₫',
            info: 'Router WiFi 6 công nghệ Mesh, phủ sóng toàn nhà 300m², hỗ trợ 80+ thiết bị.',
            specs: ['WiFi 6 AX1800: 1.8Gbps', 'Phủ sóng: 300m²', '4 anten 5dBi', 'Hỗ trợ: 80+ thiết bị']
        },
        'sim': {
            name: 'Sim 5G Data Unlimited',
            price: '290.000₫/tháng',
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

    if (!message) return;

    // Add user message
    addChatbotMessage(message, 'user');
    input.value = '';

    // Process and respond
    setTimeout(() => {
        const response = processChatbotMessage(message);
        addChatbotMessage(response, 'bot');
    }, 500);
}

// Add message to chatbot
function addChatbotMessage(content, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;

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
        📱 <strong>Samsung Galaxy 5G SCR01:</strong> 4.990.000₫<br>
        🔥 <em>(Giảm 29% từ 6.990.000₫)</em><br><br>
        📶 <strong>Router WiFi 6 AX1800:</strong> 2.490.000₫<br>
        🔥 <em>(Giảm 29% từ 3.490.000₫)</em><br><br>
        📊 <strong>Sim 5G Unlimited:</strong> 290.000₫/tháng<br>
        🔥 <em>(Giảm 51% từ 590.000₫)</em><br><br>
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

    console.log('🤖 vOz Chatbot with APN setup initialized successfully!');
});