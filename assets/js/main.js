const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Slider
const imgs = $$('.header_slider ul img');
const btnPrev = $('.control_prev');
const btnNext = $('.control_next');

let n = 0;

let auto = setInterval(() => {
    btnNext.click();
},5000);

function changeSlider() {
    for ( let i = 0; i < imgs.length; i++ ) {
        imgs[i].style.overflow = "hidden";
    } 
    imgs[n].style.overflow = "visible";
    
    // Xóa thời gian auto
    clearInterval(auto);
    // chạy lại time auto
    auto = setInterval(() => {
        btnNext.click();
    },5000);
}
changeSlider()

btnPrev.addEventListener('click', (evt) => {
    // Ngăn hành vi mặc định của thẻ <a></a>
    evt.preventDefault();
    if(n > 0) {
        n--;
    }else{
        n = imgs.length - 1;
    }
    changeSlider()
}); 

btnNext.addEventListener('click', (evt) => {
    // Ngăn hành vi mặc định của thẻ <a></a>
    evt.preventDefault();
    if(n < imgs.length -1) {
        n++;
    }else{
        n = 0
    }
    changeSlider();
});

// End Silder

// Products Slider

// Tạo một lóp chứa hành động kéo slider khi click
class Slider {
    constructor(scrollContainer, nextProducts, prevProducts) {
        this.scrollContainer = document.querySelector(scrollContainer);
        this.nextProducts = document.querySelector(nextProducts);
        this.prevProducts = document.querySelector(prevProducts);

        this.run();
    }

    run() {
        this.scrollContainer.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            this.scrollContainer.scrollLeft += evt.deltaY;
            this.scrollContainer.style.scrollBehavior = "auto";
        });

        this.nextProducts.addEventListener('click', () => {
            this.scrollContainer.style.scrollBehavior = "smooth";
            this.scrollContainer.scrollLeft += 900;
        });

        this.prevProducts.addEventListener('click', () => {
            this.scrollContainer.style.scrollBehavior = "smooth";
            this.scrollContainer.scrollLeft -= 900;
        });
    }
}
    
const slider1 = new Slider('.products.slider-1', '.control_next.next-1', '.control_prev.prev-1');
const slider2 = new Slider('.products.slider-2', '.control_next.next-2', '.control_prev.prev-2');
const slider3 = new Slider('.products.slider-3', '.control_next.next-3', '.control_prev.prev-3');

// End Products Slider


// Get datas from product
let products_slider = null;
fetch('/assets/js/productSlider.json').then(response => response.json()).then(data => {
    products_slider = data;
    console.log(products_slider);
    addDatatoHTML();
});

// Add data product to html
let productSlider = $('.products.slider');
function addDatatoHTML() {
    products_slider.forEach(product => {
        let newProduct = document.createElement("a");
        newProduct.href = '/html/product.html?id=' + product.id;
        let newImg = document.createElement("img");
        newImg.src = `${product.imgs.img_1}`;
        
        productSlider.appendChild(newProduct);
        newProduct.appendChild(newImg);
    });
};

