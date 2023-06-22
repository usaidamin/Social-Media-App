var userLogin;
var parent = document.querySelector("#parent");

window.addEventListener("load", function () {
    var userInformation = JSON.parse(localStorage.getItem("userLogin"))
    userLogin = userInformation;

    if (parent) {
        var viewPost = JSON.parse(localStorage.getItem("myPost")) || []
        for (var value of viewPost) {
            parent.innerHTML += `<div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${value.title}</h5>
                <p class="card-text">${value.description}</p>
                <button class="btn btn-info">EDIT</button>
                <button class="btn btn-danger" onclick="postDelete(${value.id}, this)">DELETE</button>
            </div>
        </div>`
        }

    }


})

function postAdd() {
    var title = document.querySelector("#title")
    var description = document.querySelector("#description")


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
        <button class="btn btn-info">EDIT</button>
        <button class="btn btn-danger">DELETE</button>
    </div>
</div>`
    parent.innerHTML += postBox

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
            return true
        }
    })
    viewPost.splice(indexNum, 1)
    localStorage.setItem("myPost", JSON.stringify(viewPost))


    e.parentNode.parentNode.remove()
}