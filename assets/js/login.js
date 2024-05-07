const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const loginStart = $(".form_login_start");
const loginEnd = $(".form_login_end");
const change = $(".change");
const inputPass = $(".password");
const showEmail = $('.email-or-phone');
const hideShowPass = $("#hideshow");
const btnContinue = $('.btnContinue');
const btnSignin = $('.btnSignin');


const errPhoneOrEmail = $('.notification.phone-or-email'); 
const errPassword = $('.notification.password'); 
const contactPhoneOrEmail = $('#contact-email-or-phone');
const contactPassword = $('#contact-password-login');


function validateEmailOrPhone() {
    let email = contactPhoneOrEmail.value;

    if(email.length == 0) {
        errPhoneOrEmail.innerHTML = '<i class="fa-solid fa-exclamation"></i> Enter your email or mobile phone number';
        return false;
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        errPhoneOrEmail.innerHTML = '<i class="fa-solid fa-exclamation"></i> Wrong or Invalid email address or mobile phone number. Please correct and try again.';
        return false;
    }
    errPhoneOrEmail.innerHTML = '';
    return true;
}

function validatePasswordLogin() {
    let password = contactPassword.value;
    
    // Kiểm tra độ dài mật khẩu
    if(password.length < 6) {
        errPassword.innerHTML = '<i class="fa-solid fa-exclamation"></i> Minimum 6 characters required';
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
        errPassword.innerHTML = '<i class="fa-solid fa-exclamation"></i> Password must be from (A-za-z) and have at least 1 character (@,#,!,&,...)'
        return false;
    }

    errPassword.innerHTML = '';
    return true;
}

btnContinue.onclick = (e) => {

    let isValid = true;

    if (!validateEmailOrPhone()) {
        errPhoneOrEmail.innerHTML = '<i class="fa-solid fa-exclamation"></i> Enter your email or mobile phone number';
        isValid = false; // Gán false nếu điều kiện không đúng
    } else {
        errPhoneOrEmail.innerHTML = ''; // Xóa thông báo lỗi nếu điều kiện đúng
    }

    if(isValid) {
        e.preventDefault();
        // Lấy ra input value của các thẻ input
        let email = contactPhoneOrEmail.value;
    
        const User = localStorage.getItem(email);
        const data = JSON.parse(User);

        if(User) {
            showEmail.innerHTML = `${email} `;
            if(email == data.contactEmail) {
                loginStart.classList.add("hide");
                loginEnd.classList.add("show");
            }
        }else{
            errPhoneOrEmail.innerHTML = 'User does not exist!' // Nếu người dùng không tồn tại, hiển thị thông báo người dùng không tồn tại
        }
    }
    
    setTimeout(function() {
        errPhoneOrEmail.innerHTML = '';
    },5000);

    return isValid;
    
}

    
btnSignin.onclick = (e) => {
    let isValid = true;

    if(!validatePasswordLogin) {
        isValid = false;
    }
    
    if(isValid) {
        e.preventDefault();
        let password = contactPassword.value;
        let email = contactPhoneOrEmail.value; // Lấy giá trị email từ input
        // Lấy dữ liệu người dùng từ localStorage sử dụng email
        
        const User = localStorage.getItem(email);

        // Kiểm tra xem dữ liệu người dùng đã tồn tại hay không
        if (User) {
            const data = JSON.parse(User); // Chuyển đổi dữ liệu từ chuỗi JSON sang đối tượng JavaScript
            // Kiểm tra mật khẩu
            
            if (password === data.contactPassword) {
                console.log("Đăng nhập thành công!"); // Nếu mật khẩu khớp, hiển thị thông báo đăng nhập thành công
                window.location.href = "/html/index.html";
            }else if(password.length === 0) {
                errPassword.innerHTML = '<i class="fa-solid fa-exclamation"></i> Enter your password'
            } 
            else {
                errPassword.innerHTML = '<i class="fa-solid fa-exclamation"></i> Wrong password';
            }
        } else {
            errPhoneOrEmail.innerHTML = 'User does not exist!' // Nếu người dùng không tồn tại, hiển thị thông báo người dùng không tồn tại
        }
    }

    setTimeout(() => {
        errPassword.innerHTML = '';
    },5000)

    return isValid;
    
}


// Ẩn hiện password
hideShowPass.onclick = () => {

    if(inputPass.type === "password") {
        inputPass.type = "text";
        hideShowPass.classList.remove("fa-solid", "fa-eye");
        hideShowPass.classList.add("fa-solid", "fa-eye-slash")
    }else{
        inputPass.type = "password";
        hideShowPass.classList.remove("fa-solid", "fa-eye-slash");
        hideShowPass.classList.add("fa-solid", "fa-eye");
    }
}

// Quay lại trang đầu
change.onclick = () => {
    // window.location.reload();
    loginStart.classList.remove("hide");
    loginEnd.classList.remove("show");
}