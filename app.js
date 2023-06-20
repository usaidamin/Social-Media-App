const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form_container"),
formCloseBtn = document.querySelector(".form_close"),
signupBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"))
formCloseBtn.addEventListener("click", () => home.classList.remove("show"))

pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if(getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        }
        else{
            getPwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.add("active");
} )

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.classList.remove("active");
} )

var userLogin;
var parent = document.querySelector("#parent");

window.addEventListener("load", function() {
    var userIn = JSON.parse(localStorage.getItem("userLogin"))
    userLogin = userIn;

    if(parent) {
        var viewPost = JSON.parse(localStorage.getItem("posts"))
        for (var value of viewPost) {
            parent.innerHTML += `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <button class="btn btn-info">EDIT</button>
                <button class="btn btn-danger">DELETE</button>
            </div>
        </div>`
        }
    }
})

//Signup Form

function signUp() {
var firstName = document.querySelector("#firstName").value;
var phone = document.querySelector("#phone").value;
var email = document.querySelector("#email").value;
var password = document.querySelector("password").value;
var confirmPassword = document.querySelector("#confirmPassword").value;

var userDetail = {
    firstName,
    phone,
    email,
    password,
    confirmPassword,
}

var userInfo = JSON.parse(localStorage.getItem("userDetail"))

if(userInfo === null) {
    var user = [];
    user.push(userDetail);
    localStorage.setItem("userDetail", JSON.stringify(user))
    window.location.href = "./index.html"
}
else {
    var userFind = userInfo.find(function(value) {
        if(value.email === email) {
            return true;
        }
    })

    if(userFind === undefined) {
        userInfo.push(userDetail)
        localStorage.setItem("userDetail",JSON.stringify(userDetail))
        window.location.href = "./index.html";
    }
    else {
        alert("Email already exists")
    }

    if(value.confirmPassword === value.password)
    {
        return true;
    }
    else {
        alert("Your Passowrd does not match");
    }
}
}

//Login form

function loginUser() {
    var validEmail = document.querySelector("#validemail").value;
    var validPassword = document.querySelector("#validpassword").value;

    var userIn = JSON.parse(localStorage.getItem("userDetail"));

    var findUser = userIn.findIndex(function(value) {
        if(value.validEmail === email && value.validPassword === password) {
            return true;
        }
    })

    if(findUser !== -1) {
        alert("Successfully Login");
        window.location.replace("./dashboard.html");
    }
    else {
        alert("Email OR Password does not match");
    }

}

//Dashboard

function addPost() {
    var title = document.querySelector("#title");
    var description = document.querySelector("#description");

    if(!title.value || !description.value) {
        alert("Please Enter a Value");
        return;
    }

var postBox = `<div class="card" style="width: 18rem;">
<div class="card-body">
    <h5 class="card-title">${title.value}</h5>
    <p class="card-text">${description.value}</p>
    <button class="btn btn-info">EDIT</button>
    <button class="btn btn-danger">DELETE</button>
</div>
</div>`

parent.innerHTML += postBox;

var postValue = {
    title : title.value,
    description : description.value
}

var viewPost = JSON.parse(localStorage.getItem("posts"))

if (viewPost == null) {
    var arr = [];
    arr.push(postValue);
    localStorage.setItem("posts", JSON.stringify(arr))

}
else {
    viewPost.unshift(postValue)
    localStorage.setItem("posts",JSON.stringify(viewPost))
}


title.value = "";
description.value = "";

}