// Lấy dữ liệu giỏ hàng từ Local Storage
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hiển thị thông tin sản phẩm trên trang cart
function displayCart() {

    var cartContainer = document.querySelector('.cart_left');
    cartContainer.innerHTML = ''; // Xóa bỏ nội dung cũ trước khi cập nhật

    if (cart.length === 0) {
        // Nếu giỏ hàng trống, hiển thị thông báo
        cartContainer.innerHTML = `<img src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"> `;
    } else {
        // Nếu giỏ hàng không trống, hiển thị sản phẩm
        cart.forEach(function(item) {
        
            let productList = document.createElement('div');
            productList.classList.add('product_cart_list');
            productList.innerHTML = `
            <img src="${item.imgItem}" alt="" width="180px">
            <div>
                <div class="product_cart_titleprice">
                    <p class = "title">
                        ${item.name}
                    </p>
                    <p class="price"><b>${item.price}</b></p>
                </div>
                <p class="product_cart_bestseller"><span>#1 Best Seller</span> in Computer Tablets</p>
                <p class="product_cart_stock">In Stock</p>
                <p class="product_cart_delivery">FREE delivery <b>Mon, April 29</b> available at checkout</p>
                <p class="product_cart_returns">FREE Returns &#11191</p>
                <p class="product_cart_giftoption">Gift options not available. <span>Learn more</span></p>
                <div class="product_cart_specs">
                    <p><b>Style:</b></p> <p>Wi-Fi</p>
                    <p><b>Size:</b></p> <p>64GB</p>
                    <p><b>Color:</b></p> <p>Space Gray</p>
                </div>
                <div class="product_car_list_action">
                    <div class="quanlity">Quanlity: <input type="number" class="product_quantity" min="1" max="9999" value="${item.quantity}"></div>
                    <hr>
                    <p class="action_btn action_btn_delete">Delete</p>
                    <hr>
                    <p class="action_btn">Save for later</p>
                    <hr>
                    <p class="action_btn">Compare with similar items</p>
                    <hr>
                    <p class="action_btn">Share</p>
                </div>
            </div>
            <hr/>
            `;
    
            cartContainer.appendChild(productList);
        });
    } 
    // Hiển thị số lượng sản phẩm
    var cartItemCount = document.querySelector('.cart_subtotal strong');
    cartItemCount.innerText = cart.length;
}

// Gọi hàm hiển thị giỏ hàng khi trang được tải
displayCart();

// Lấy danh sách sản phẩm từ Local Storage
var cart = JSON.parse(localStorage.getItem('cart')) || [];
var subtotal = 0;

// Duyệt qua danh sách sản phẩm và tính tổng số tiền
cart.forEach(function(product) {
    var price = parseFloat(product.price.replace('$', ''));
    var quantity = parseInt(product.quantity);
    subtotal += price * quantity;
});

// Hiển thị tổng số tiền trong phần tổng số tiền và phần subtotal
var totalAmountElements = document.querySelectorAll('.cart_subtotal span');
totalAmountElements.forEach(function(element) {
    element.innerText = subtotal.toFixed(2);
});

var subtotalElements = document.querySelectorAll('.product_car_list_subtotal span');
subtotalElements.forEach(function(element) {
    element.innerText = subtotal.toFixed(2);
});

// Bắt sự kiện khi người dùng muốn xóa sản phẩm
var deleteButtons = document.querySelectorAll('.action_btn_delete');
deleteButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        // Xác định sản phẩm cần xóa
        var productName = event.target.closest('.product_cart_list').querySelector('.title').innerText;
        // Xóa sản phẩm khỏi danh sách giỏ hàng
        cart = cart.filter(function(product) {
            return product.name !== productName;
        });
        // Lưu lại danh sách giỏ hàng mới vào Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Cập nhật lại tổng số tiền
        subtotal = 0;
        cart.forEach(function(product) {
            var price = parseFloat(product.price.replace('$', ''));
            var quantity = parseInt(product.quantity);
            subtotal += price * quantity;
        });
        totalAmountElements.forEach(function(element) {
            element.innerText = subtotal.toFixed(2);
        });
        subtotalElements.forEach(function(element) {
            element.innerText = subtotal.toFixed(2);
        });
        // Cập nhật lại giao diện để phản ánh sự thay đổi
        var productRow = event.target.closest('.product_cart_list');
        productRow.remove();
        
        // Lưu lại tổng số tiền mới vào Local Storage
        localStorage.setItem('subtotal', subtotal.toFixed(2));
    });
});