


var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl")
var boxModal = document.getElementById('box')
var closeBtn = document.getElementById("closeBtn");
var siteContainer = []


if (localStorage.getItem('site') !== null) {
    siteContainer = JSON.parse(localStorage.getItem('site'))
    displayInfo()
}



function addSite() {
    if (validation(siteName) && validation(siteUrl)) {
        var site =
        {
            code: siteName.value,
            url: siteUrl.value
        }

        siteContainer.push(site)
        localStorage.setItem("site", JSON.stringify(siteContainer))
        console.log(siteContainer);
        clearSite()
        displayInfo()
    }
    else {
        //  window.alert(`Site Name or Url is not valid, Please follow the rules below :
        //      -Site name must contain at least 3 characters
        //     -Site URL must be a valid one`)

        wrongInput()
    }


}


function clearSite() {
    siteName.value = '',
        siteUrl.value = ''
}



function displayInfo() {
    var box = ''
    for (var i = 0; i < siteContainer.length; i++) {
        box += `
         <tr>
            <td>${[i]}</td>
            <td>${siteContainer[i].code}</td>
            <td><button onclick="openUrl(${i})" class="btn visit "><i class="fa-solid fa-eye pe-2" ></i>visit</button></td>
            <td><button onclick="deleteSite(${i})" class="btn delete "><i class="fa-solid fa-trash-can pe-2"></i>delete</button></td>
        </tr>
        `
    }
    document.getElementById('content').innerHTML = box;
}


function deleteSite(deletedIndex) {
    siteContainer.splice(deletedIndex, 1);
    displayInfo();
    localStorage.setItem("site", JSON.stringify(siteContainer))
    console.log(siteContainer)

}


function validation(input) {
    var Regex = {
        siteName: /^[\w]{3,}(\s\w+)*$/,
        siteUrl: /^(https:\/\/)?(w{3}\.)?(\w+\.)(\w+\.\w{2,5})?(\/\w+)?$/
    }

    if (Regex[input.id].test(input.value)) {
        input.classList.add("is-valid")
        input.classList.remove("is-invalid")

        return true
    }

    else {
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")

        return false
    }
}

function wrongInput() {

    boxModal.classList.replace('d-none', 'd-block')
}
function CloseMessage() {

    boxModal.classList.replace('d-block', 'd-none')
}



function openUrl(websiteIndex) {

    for (var i = 0; i < siteContainer.length; i++) {
    console.log(siteContainer[websiteIndex].url)
    open(siteContainer[websiteIndex].url)
    
    }
}

