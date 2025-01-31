// بيانات الكتب
let books = [
    { id: 1, name: "كتاب الفيزياء", price: 50, image: "https://via.placeholder.com/150" },
    { id: 2, name: "كتاب الكيمياء", price: 60, image: "https://via.placeholder.com/150" },
    { id: 3, name: "كتاب الأحياء", price: 70, image: "https://via.placeholder.com/150" }
];

// سلة التسوق
let cart = [];

// إضافة كتاب إلى السلة
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    updateCart();
}

// تحديث السلة
function updateCart() {
    const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-quantity').textContent = cartQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// عرض الفاتورة
function showInvoice() {
    const invoiceTable = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    invoiceTable.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)"></td>
                <td>${item.price} جنيه</td>
                <td>${item.price * item.quantity} جنيه</td>
                <td><button onclick="removeFromCart(${item.id})">حذف</button></td>
            </tr>
        `;
        invoiceTable.innerHTML += row;
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `الإجمالي: ${totalPrice} جنيه`;
}

// تحديث الكمية
function updateQuantity(bookId, quantity) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity = parseInt(quantity);
        updateCart();
        showInvoice();
    }
}

// حذف كتاب من السلة
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCart();
    showInvoice();
}

// تأكيد الطلب
function submitOrder() {
    alert('تم تأكيد الطلب بنجاح!');
    cart = [];
    updateCart();
    showInvoice();
}

// تحميل السلة من localStorage
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCart();
}