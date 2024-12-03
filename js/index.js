// الحصول على جميع العناصر المدخلة
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

// للحصول على عنوان URL الأساسي
var pathparts = location.pathname.split('/');
var baseURL = '';
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i];
}

// عرض رسالة الترحيب في الصفحة الرئيسية
var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

// تحميل بيانات المستخدمين من التخزين المحلي
var signUpArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// التحقق من الحقول الفارغة للتسجيل
function isEmpty() {
    return signupName.value !== "" && signupEmail.value !== "" && signupPassword.value !== "";
}

// التحقق مما إذا كان البريد الإلكتروني موجودًا بالفعل
function isEmailExist(email) {
    return signUpArray.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// دالة التسجيل
function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var newUser = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
    };

    if (isEmailExist(newUser.email)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return false;
    }

    signUpArray.push(newUser);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Registration Successful</span>';
    return true;
}

// التحقق من الحقول الفارغة لتسجيل الدخول
function isLoginEmpty() {
    return signinEmail.value !== "" && signinPassword.value !== "";
}

// دالة تسجيل الدخول
function login() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var email = signinEmail.value;
    var password = signinPassword.value;
    var user = signUpArray.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

    if (user) {
        localStorage.setItem('sessionUsername', user.name);
        var homeURL = baseURL === '/' ? 'https://' + location.hostname + '/home.html' : baseURL + '/home.html';
        location.replace(homeURL);
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">Incorrect email or password</span>';
    }
}

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('sessionUsername');
}
