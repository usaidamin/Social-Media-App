const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector(".form_close"),
signupBtn = document.querySelector("#signup"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if(getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash","uil-eye");
        }
        else{
            getPwInput.type = "password";
            icon.classList.replace("uil-eye","uil-eye-slash");
        }
    })
})

window.addEventListener("load", function () {
    var userLogin = localStorage.getItem("loginUser")
    if (userLogin) {
        window.location.replace("./dashboard.html")
    }
})

function signUp() {
    var fullName = document.querySelector("#fullName").value;
    var phoneNumber = document.querySelector("#phoneNumber").value;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var confirmPassword = document.querySelector("#confirmPassword").value;

    var userDetail = {
        fullName,
        phoneNumber,
        email,
        password,
        confirmPassword
    }

    var userInfo = JSON.parse(localStorage.getItem("users"))

    if(userInfo === null) {
        var user = [];
        user.push(userDetail);
        localStorage.setItem("users" , JSON.stringify(user));
        alert("User Successfully SignUp");
        window.location.href = "./index.html"
    }

    else{
        var findUser = userInfo.find(function(value) {
            if(value.email === email) {
                return true;
            }
        })

    if(findUser === undefined) {
        userInfo.push(userDetail)
        localStorage.setItem("users", JSON.stringify(userInfo))
        alert("User Successfully SignUp");
        window.location.href = "./index.html"
    }
    else{
        alert("Email Already Exists")
    }

    if(confirmPassword === password){
        alert("Password Successfully Created")
    }
    else {
        alert("Password does not match");
    }
    }
    
}