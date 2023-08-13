var siteNameInput = document.getElementById("siteName");
var siteLinkInput = document.getElementById("siteLink");
var alarmMessage = document.getElementById("alarm");

var siteContainer = [];

// localStorage.getItem("sites" , JSON.stringify(siteContainer));
// if(sites != null){
//     siteContainer = localStorage.getItem("sites" , JSON.parse(siteContainer));
// }
if (localStorage.getItem("sites") != null) {
  siteContainer = JSON.parse(localStorage.getItem("sites"));
  displayData();
}

function addSite() {
  if (validateSiteLink() == true) {
    var site = {
      name: siteNameInput.value,
      link: siteLinkInput.value,
    };
    siteContainer.push(site);
    localStorage.setItem("sites", JSON.stringify(siteContainer));
    displayData();
    clearData();
  } else {
    alarmMessage.classList.remove("d-none");
  }
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < siteContainer.length; i++) {
    cartona += `
        <td> ${i + 1}</td>
        <td> ${siteContainer[i].name}</td>
        <td><button class="btn btn-success"><span><i class="fa-solid fa-eye" style="color: #fbfcfe;"></i></span> <a href="${
          siteContainer[i].link
        }" target="_blank" class="text-decoration-none text-white">Visit</a></button></td>
        <td><button onclick="deleteData(${i});" class="btn btn-danger"><span><i class="fa-solid fa-trash" style="color: #fbfcfe;"></i></span>  Delete</button></td>
    </tr>
        `;
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function clearData() {
  siteNameInput.value = " ";
  siteLinkInput.value = " ";
}

function deleteData(elementNumber) {
  siteContainer.splice(elementNumber, 1);
  localStorage.setItem("sites", JSON.stringify(siteContainer));
  displayData();
}
var linkSite = document.getElementById("siteLink");
linkSite.addEventListener("input", function () {
  if (validateSiteLink() == true) {
    linkSite.classList.add("is-valid");
    linkSite.classList.remove("is-invalid");
  } else {
    linkSite.classList.add("is-invalid");
    linkSite.classList.remove("is-valid");
  }
});
function validateSiteLink() {
  var regex = /^https:\/\/www\.[a-z]{3,}\.com$/;
  return regex.test(siteLinkInput.value);
}

var nameSite = document.getElementById("siteName");
nameSite.addEventListener("input", function () {
  validatedSiteName();
});
function validatedSiteName() {
  var regex = /^[a-zA-z]{3,}/;
  if (regex.test(siteNameInput.value) == true) {
    nameSite.classList.add("is-valid");
    nameSite.classList.remove("is-invalid");
  } else {
    nameSite.classList.add("is-invalid");
    nameSite.classList.remove("is-valid");
  }
}
var againBtn = document.getElementById("btnMessage");
againBtn.addEventListener("click", function () {
  alarmMessage.classList.add("d-none");
});
