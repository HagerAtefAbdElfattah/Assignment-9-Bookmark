var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var boxInfo = document.querySelector(".box-info");
var closeBtn = document.getElementById("closeBtn");

var regex ={
    bookmarkName: /^\w{3,}(\s+\w+)*$/,
    bookmarkURL: /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
}

var sitesAll = [];

if (localStorage.getItem("sitesAll")==null) {
    sitesAll = [];
}else{
    sitesAll = JSON.parse(localStorage.getItem("sitesAll"));
    displayBookmarks();
}

function validateAllInput(input, errorId) {
    var errorMsg = document.getElementById(errorId);
    if (regex[input.id].test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        errorMsg.classList.add("d-none");
        errorMsg.classList.remove("d-flex");
        return true;
    }else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        errorMsg.classList.add("d-flex");
        errorMsg.classList.remove("d-none");
        return false;
    }
}

closeBtn.addEventListener("click", function () {
    boxInfo.classList.remove("d-flex");
    boxInfo.classList.add("d-none");
});

closeBtn.addEventListener("keypress", function (e) {
    if (e.key === "Escape") {
        boxInfo.classList.remove("d-flex");
        boxInfo.classList.add("d-none");
    }
});



function addBookmark() {
    var siteName = bookmarkName.value;
    var siteURL = bookmarkURL.value;
    var nameExists = sitesAll.some(sitesAll => sitesAll.name.toLowerCase() === siteName.toLowerCase());
    if (!nameExists && validateAllInput(bookmarkName, "bookmarkErrorMsg") && validateAllInput(bookmarkURL, "urlErrorMsg")) {
        var site = {
        name: siteName,
        url: siteURL,
        };

        sitesAll.push(site);
        localStorage.setItem("sitesAll", JSON.stringify(sitesAll));
        displayBookmarks();
        clearBookmarks();
        }else{
            boxInfo.classList.remove("d-none");
            boxInfo.classList.add("d-flex");
        }
}

function displayBookmarks() {
    tableBody = "";

    for (var i = 0; i < sitesAll.length; i++) {
        tableBody += `
            <tr>
                <td>${i}</td>
                <td>${sitesAll[i].name}</td>    
                <td><a href="${i}" class="btn btn-primary">Visit</a></td>
                <td><button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button></td>
            </tr>
        `;

        document.getElementById("tableContent").innerHTML = tableBody;
    }
}

function clearBookmarks() {
    bookmarkName.value = "";    
    bookmarkURL.value = "";

    bookmarkName.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-valid");
}

function deleteBookmark(index) {
    sitesAll.splice(index, 1);
    localStorage.setItem("sitesAll", JSON.stringify(sitesAll));
    displayBookmarks();
}

function visitBookmark(index) {
    window.open(sitesAll[index].url);
}