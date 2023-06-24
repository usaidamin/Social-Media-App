var parent = document.querySelector("#parent");
var loginUser;

window.addEventListener("load", function () {
    var userLogin = localStorage.getItem("loginUser")
    if(!userLogin) {
        window.location.replace("./index.html");
        return;
    }

    var userInformation = JSON.parse(localStorage.getItem("loginUser"));
    loginUser = userInformation;
    var fullName = this.document.querySelector("#fullName");
    if(fullName) {
        fullName.innerHTML = "WELCOME" + " " + loginUser.fullName;
    }


    if (parent) {
        var viewPost = JSON.parse(localStorage.getItem("myPost")) || []
        for (var value of viewPost) {
            parent.innerHTML += `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <button class="btn btn-secondary" onclick="postEdit(${value.id} , this)">EDIT</button>
                <button class="btn btn-danger" onclick="postDelete(${value.id}, this)">DELETE</button>
            </div>
        </div>`
        }

    }


})

function postAdd() {
    var title = document.querySelector("#title");
    var description = document.querySelector("#description");


    if (!title.value || !description.value) {
        alert("Please Enter Any Content")
        return;
    }

    var id;
    var viewPost = JSON.parse(localStorage.getItem("myPost")) || []

    if(viewPost.length > 0) 
    {
        id = viewPost[0].id + 1;
    }
    else {
        id = 1;
    }

    var postBox = `<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${title.value}</h5>
        <p class="card-text">${description.value}</p>
        <button class="btn btn-secondary" onclick="postEdit(${id} , this)">EDIT</button>
        <button class="btn btn-danger" onclick="postDelete(${id}, this)">DELETE</button>
    </div>
</div>`
    parent.innerHTML = postBox + parent.innerHTML;

    var createPost = {
        id: id,
        title: title.value,
        description: description.value
    }

        viewPost.unshift(createPost)
        localStorage.setItem("myPost", JSON.stringify(viewPost))

    title.value = ""
    description.value = ""

}

function postDelete(id, e) {
    var viewPost = JSON.parse(localStorage.getItem("myPost"))
    var indexNum = viewPost.findIndex(function (value) {
        if (value.id === id) 
        {
            return true;
        }
    })
    viewPost.splice(indexNum, 1);
    localStorage.setItem("myPost", JSON.stringify(viewPost));


    e.parentNode.parentNode.remove();
}
function postEdit(id, e) {
    var indexNum;
    var viewPost = JSON.parse(localStorage.getItem("myPost"));
    var post = viewPost.find(function (value, index) {
        if (value.id === id) {
            indexNum = index;
            return true;
        }
    })
    var titleEdit = prompt("Edit Title", post.title);
    var descriptionEdit = prompt("Edit Description", post.description);
    const editObj = {
        id: post.id,
        title: titleEdit,
        description: descriptionEdit
    }
    viewPost.splice(indexNum, 1, editObj);
    localStorage.setItem("myPost", JSON.stringify(viewPost));

    var h5Title = e.parentNode.firstElementChild;
    var paraDescription = e.parentNode.firstElementChild.nextElementSibling;
    h5Title.innerHTML = titleEdit;
    paraDescription.innerHTML = descriptionEdit;


}

function logout() {
    localStorage.removeItem("loginUser")
    window.location.replace("./index.html")
}