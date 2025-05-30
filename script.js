// بيانات السلة
let cart = []; // قائمة السلة
const cartItemsContainer = document.querySelector('.cart-items'); // حاوية المنتجات في السلة
const totalPriceElement = document.getElementById('total-price'); // عنصر إجمالي السعر

// إضافة منتج إلى السلة
function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name); // البحث إذا كان المنتج موجودًا
    if (existingProduct) {
        existingProduct.quantity += 1; // زيادة الكمية
    } else {
        cart.push({ name, price, quantity: 1 }); // إضافة منتج جديد
    }
    updateCart(); // تحديث واجهة السلة
}

// تحديث واجهة السلة
function updateCart() {
    cartItemsContainer.innerHTML = ''; // تفريغ السلة الحالية
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity; // حساب الإجمالي
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} × ${item.quantity} - ${item.price * item.quantity} جنيه</span>
                <button onclick="removeFromCart(${index})" class="remove-btn">إزالة</button>
            </div>
        `;
    });

    totalPriceElement.textContent = total; // تحديث الإجمالي
}

// إزالة منتج من السلة
function removeFromCart(index) {
    cart.splice(index, 1); // حذف المنتج من السلة
    updateCart(); // تحديث السلة
}

// إضافة أحداث للأزرار عند الضغط على "إضافة للسلة"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name'); // الحصول على اسم المنتج
        const price = parseFloat(button.getAttribute('data-price')); // الحصول على سعر المنتج
        addToCart(name, price); // إضافة المنتج إلى السلة
    });
});
