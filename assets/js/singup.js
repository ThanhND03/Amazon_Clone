const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const startForm = $('.start_form');
const createForm = $('.end_form');
const notification = $('.notification');
const change = $('.change');
const showEmail = $('.showEmail');
const btnContinueSignup = $('.btn-continue');
const btnCreate = $('.btn-create');

// Lấy ra từng mục thông báo
const nameError = $('.notification.name');
const emailError = $('.notification.email');
const passError = $('.notification.password');
const repassError = $('.notification.repassword');

// Lấy input id name của từng input
const contactName = $('#contact-name');
const contactEmail = $('#contact-email');
const contactPassword = $('#contact-password-signup');                           
const contactRepassword = $('#contact-repassword');
const contactOTP = $('#contact-OTP');



// Kiểm tra điều kiện

function validateName() {
    // Lấy dữ liệu nhập vào
    let name = contactName.value;
    // Kiểm tra
    if(name.length == 0) {
        nameError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Enter your name';
        return false;
    }

    // !name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)
    if(!name.match(/^[A-Za-z]+$/)) {
        nameError.innerHTML = '<i class="fa-solid fa-exclamation"></i> The name starts from (A-Z,a-z) and has no spaces';
        return false;
    }
    nameError.innerHTML = '';
    return true;
}

function validateEmail() {
    // Lấy dữ liệu nhập vào
    let email = contactEmail.value;
    // Kiểm tra
    if(email.length == 0){
        emailError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Enter your email or mobile phone number';
        return false;
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Wrong or Invalid email address or mobile phone number. Please correct and try again.';
        return false;
    }
    emailError.innerHTML = '';
    return true;
}
 
function validatePass() {
    // Lấy dữ liệu nhập vào
    let password = contactPassword.value;
    // Kiểm tra độ dài mật khẩu
    if(password.length < 6) {
        passError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Minimum 6 characters required';
        return false;
    }    

    // Nếu mật khẩu không đủ 6 ký tự, ngưng kiểm tra và trả về false
    if (password.length < 6) {
        return false;
    }

    // Kiểm tra các ký tự chữ cái, số và ký tự đặc biệt
    let containsText = /[A-Za-z]/.test(password);
    let containsNumber = /[a-zA-Z\d]/.test(password);
    let containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    // Kiểm tra xem mật khẩu có chứa các yếu tố cần thiết không
    if (!containsText || !containsNumber || !containsSpecialCharacter) {
        passError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Password must be from (A-za-z) and have at least 1 character (@,#,!,&,...)'
        return false;
    }

    passError.innerHTML = '';
    return true;
}


function validateRepass() {
    let password = contactPassword.value;
    let repassword = contactRepassword.value;

    if (repassword !== password) {
        repassError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Passwords do not match';
        return false;
    }

    // Nếu mật khẩu nhập lại khớp với mật khẩu ban đầu
    // Bạn có thể thực hiện các hành động khác ở đây, ví dụ như xóa thông báo lỗi
    repassError.innerHTML = '';
    return true;
}



btnContinueSignup.onclick = (evt) => {
    let email = contactEmail.value;
    let isValid = true; // Biến để kiểm tra tất cả các điều kiện

    // Kiểm tra điều kiện về tên
    if (!validateName()) {
        nameError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Enter your name';
        isValid = false; // Gán false nếu điều kiện không đúng
    } else {
        nameError.innerHTML = ''; // Xóa thông báo lỗi nếu điều kiện đúng
    }

    // Kiểm tra điều kiện về email
    if (!validateEmail()) {
        emailError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Enter your email or mobile phone number';
        isValid = false; // Gán false nếu điều kiện không đúng
    } else {
        emailError.innerHTML = ''; // Xóa thông báo lỗi nếu điều kiện đúng
    }

    // Kiểm tra điều kiện về mật khẩu
    if (!validatePass()) {
        // Không cần innerHTML Ở đây bởi vì function validatePass() đã có rồi
    } else {
        passError.innerHTML = ''; // Xóa thông báo lỗi nếu điều kiện đúng
    }

    // Kiểm tra điều kiện về nhập lại mật khẩu
    if (!validateRepass()) {
        repassError.innerHTML = '<i class="fa-solid fa-exclamation"></i> Passwords do not match';
        isValid = false; // Gán false nếu điều kiện không đúng
    } else {
        repassError.innerHTML = ''; // Xóa thông báo lỗi nếu điều kiện đúng
    }

    // Nếu tất cả các điều kiện đều đúng, tiến hành chuyển sang mục tiếp theo
    if (isValid) {
        showEmail.innerHTML = `${email}`
        evt.preventDefault(); // Ngăn chặn hành động mặc định của nút submit
        startForm.classList.add("hide");
        createForm.classList.add("show");
    }

    // Hẹn giờ để ẩn thông báo lỗi
    setTimeout(function() { 
        nameError.innerHTML = '';
        emailError.innerHTML = '';
        passError.innerHTML = '';
        repassError.innerHTML = '';
    }, 5000);
    
    return isValid; // Trả về true nếu tất cả các điều kiện đều đúng, ngược lại trả về false
}

btnCreate.onclick = (e) => {
    e.preventDefault();
    // Lấy ra input value của các thẻ input
    let name = contactName.value;
    let email = contactEmail.value;
    let password = contactPassword.value;
    let repassword = contactRepassword.value;
    let otp = contactOTP.value;

    let checkOTP = 12345;

    if(otp == checkOTP) {
        const User = {
            contactName : name,
            contactEmail : email ,
            contactPassword : password,
            contactRepassword : repassword
        }
    
        const json = JSON.stringify(User);
        localStorage.setItem(email, json);
        
        console.log("Đăng kí thành công nhân !!!");
        window.location.href ="/html/index.html"
    }else{
        console.log("OTP Sai");
    }
}

// Hideshow pass
// Tạo một lớp để sử dụng đỡ lặp code

class hideShow {
    constructor(hideShow, inputPass) {
        this.hideShow = document.querySelector(hideShow);
        this.inputPass = document.querySelector(inputPass);
        // Khai báo hàm thực hiện
        this.run();
    }

    run() {
        this.hideShow.onclick = () => {
            if(this.inputPass.type === "password") {
                this.inputPass.type = "text";
                this.hideShow.classList.remove("fa-solid", "fa-eye");
                this.hideShow.classList.add("fa-solid", "fa-eye-slash");
            }else{
                this.inputPass.type ="password";
                this.hideShow.classList.remove("fa-solid", "fa-eye-slash");
                this.hideShow.classList.add("fa-solid", "fa-eye");
            }
        }
    }

}
// Sử dụng
const hideShow_1 = new hideShow('#hideshowpass', '.password');
const hideShow_2 = new hideShow('#hideshowrepass', '.repass');


// Quay lại trang đâu để sửa thông tin  
change.onclick = () => {
    // window.location.reload();
    startForm.classList.remove("hide");
    createForm.classList.remove("show");
}



