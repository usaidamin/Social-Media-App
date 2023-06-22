const formOpenBtn = document.querySelector("#open-form"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector("#close_form"),
loginBtn = document.querySelector("#login"),
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
})

function loginUp(){
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;

    var userInformation = JSON.parse(localStorage.getItem("userDetail"));

    var userIndex = userInformation.find(function (value) {
        if(value.email === email && value.password === password)
        {
            return true;
        }
    })

    if(userIndex !== -1) {
        alert("User Successfully Login")
        localStorage.setItem("userLogin" , JSON.stringify(userIndex))
        window.location.replace("./dashboard.html")
    }
    else {
        alert("Please Enter a valid Email OR Password")
    }

}