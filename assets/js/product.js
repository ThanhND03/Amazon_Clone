const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Products Slider
    const scrollContainer = $('.products');
    const btnNext = $('.control_next');
    const btnPrev = $('.control_prev');
    
    scrollContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
        scrollContainer.style.scrollBehavior = "auto";
    });

    btnNext.onclick = () => {
        scrollContainer.style.scrollBehavior = "smooth";
        scrollContainer.scrollLeft += 900;
    }

    btnPrev.onclick = () => {
        scrollContainer.style.scrollBehavior = "smooth";
        scrollContainer.scrollLeft -= 900;
    }


// Thay đổi ảnh khi click

// Add datas from product
let products = null;
fetch('/assets/js/productSlider.json').then(response => response.json()).then(data => {
    products = data;
    console.log(products);
    showProduct();
});


function showProduct() {
    let product_icons = $('.product_icons');
    let product_main_images = $('.product_main_images');
    let product_title = $('.product_title');
    let product_display_price = $('.product_display_price');
    let productID = new URLSearchParams(window.location.search).get('id');
    let thisProduct = products.filter(value => {
        return value.id == productID;
    })[0];

    // console.log(Object.keys(thisProduct.imgs).length);
    // Nếu không tồn tại trả về home page
    if(!thisProduct) {
        window.location.href = "/";
    }

    // Nếu có thì add data vào html
    // Tạo img icon

    for (let img of Object.keys(thisProduct.imgs)) {
        let newimgIcon = document.createElement("img");
        newimgIcon.classList.add('iconImg');
        newimgIcon.src = thisProduct.imgs[img];
        newimgIcon.style.width = "60px";
        product_icons.appendChild(newimgIcon);
    }

    // Ảnh chính
    let newImgMain = document.createElement("img");
    newImgMain.classList.add("imgMain");
    newImgMain.src = `${thisProduct.imgs.img_1}`
    newImgMain.style.width = "400px";
    product_main_images.appendChild(newImgMain);


    const allIconImg = document.querySelectorAll('.iconImg');
    const imgMain = document.querySelector('.imgMain');
    allIconImg.forEach(img => {
        img.addEventListener("click", function() {
            $('.click')?.classList.remove("click");
            img.classList.add("click");
            imgMain.src = this.src;
        });
    });

    // title
    product_title.innerText = `${thisProduct.name}`;
    
    // price
    product_display_price.innerHTML = `
    <div>
        <p>-35%</p>
        <h1>$<span>${thisProduct.price}</span>.99</h1>
    </div>
    <h5>List Price : <span>$${thisProduct.listPrice}.99</span></h5>
    <p>Get <b>Fast, Free Shipping</b> with <span>Amazon Prime</span></p>
    <p><span>FREE Returns</span></p>
    <p><span>Join Prime to buy this item at $22.99</span></p>
    <p>Avaible at a lower price from <span>other sellers</span> that may not offer free Prime shipping.</p>
    `
}   

//  Add to Cart
const productAddCart = $('.product_addCart');
const productBuy = $('.product_buy');

productAddCart.addEventListener('click', () => {
    var productImg = $('.product_main_images img').src
    var productName = $('.product_title').innerText;
    var productPrice = $('.product_display_price h1').innerText;
    var productQuantity  = parseInt($('.product_quantity').value);

    var productItem = {
        name : productName,
        price : productPrice,
        quantity : productQuantity,
        imgItem : productImg
    }
    // addCart(productName,productImg,productPrice,productQuantity);


    // Kiểm tra xem giỏ hàng đã được lưu trữ trong Local Storage chưa
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingProductIndex = cart.findIndex(item => item.name === productItem.name);
    if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        cart[existingProductIndex].quantity += productItem.quantity;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng
        cart.push(productItem);
    }

    // Lưu trữ giỏ hàng mới vào Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Thông báo cho người dùng biết sản phẩm đã được thêm vào giỏ hàng
    alert('Product added to cart!');
});


