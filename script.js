let users = [
	{
		id: "123456789",
		createdDate: "2021-01-06",
		status: "validation",
		firstName: "Mohamed",
		lastName: "Taha",
		userName: "mtaha",
		registrationNumber: "2584",
	},
	{
		id: "987654321",
		createdDate: "2021-07-25",
		status: "Validé",
		firstName: "Hamid",
		lastName: "Orrich",
		userName: "horrich",
		registrationNumber: "1594",
	},
	{
		id: "852963741",
		createdDate: "2021-09-15",
		status: "Rejeté",
		firstName: "Rachid",
		lastName: "Mahidi",
		userName: "rmahidi",
		registrationNumber: "3576",
	},
];

//selectors
const tableDiv = document.querySelector("#users-table");

let firstNameInput = document.querySelector("#firstName");
let lastNameInput = document.querySelector("#lastName");
let userNameInput = document.querySelector("#userName");
let codeInput = document.querySelector("#code");
let creationDate = document.querySelector("#creaDate");
let statusInput = document.querySelector("#status");

// takes inputs values and creates a new user object to add to the global users list
// if firstname | lastname are empty user cannot be added
function addUser() {
	let newUser = {
		id: 23425 + generateID(),
		createdDate: creationDate.value ?? getDate(),
		status: statusInput.value,
		firstName: firstNameInput.value,
		lastName: lastNameInput.value,
		userName: userNameInput.value,
		registrationNumber: codeInput.value,
	};

	if (newUser.firstName != "" && newUser.lastName != "") {
		users.push(newUser);
		modal.classList.remove("open");
		overlay.classList.remove("open");
		drawTable();
	} else {
		let spans = [...document.getElementsByClassName("errorSpan")];
		spans.forEach((span) => {
			span.innerText = "Champs requis!";
		});
	}
}

//dynamicly fills the table headers
function fillHeader() {
	let tableHeaders = [
		"ID",
		"Date de création",
		"Etat",
		"Nom",
		"Prénmom",
		"Nom d'utilisateur",
		"Matricule",
		"Action",
	];
	let newTable = document.createElement("table");
	newTable.id = "nxt-table";

	let tableHead = document.createElement("thead");
	let headRow = document.createElement("tr");
	headRow.className = "no-border";

	tableHeaders.forEach((header) => {
		headerTitle = document.createElement("th");
		headerTitle.innerText = header;
		headerTitle.className = "text-start";
		headerTitle.dataset.th = header;
		headRow.append(headerTitle);
	});

	headRow.lastChild.className = "text-end";
	tableHead.append(headRow);
	newTable.append(tableHead);

	let tableBody = document.createElement("tbody");
	tableBody.className = "table-body";
	newTable.append(tableBody);
	tableDiv.append(newTable);
}

function fillTable(user) {
	let body = document.querySelector(".table-body");
	let newRow = document.createElement("tr");
	let newId = document.createElement("td");
	newId.innerText = user.id;

	let newDate = document.createElement("td");
	newDate.innerText = user.createdDate || getDate();

	let newStatus = document.createElement("td");
	newStatus.innerHTML = `<span class="badge ${user.status}"> ${user.status}</span>`;

	let newFirstName = document.createElement("td");
	newFirstName.innerText = user.firstName;

	let newLastname = document.createElement("td");
	newLastname.innerText = user.lastName;

	let newUserName = document.createElement("td");
	newUserName.innerText = user.userName;

	let newRegistrationNumber = document.createElement("td");
	newRegistrationNumber.innerText = user.registrationNumber;

	let icon = document.createElement("td");
	icon.innerHTML = ` <button class="hiddenbtn" id='${user.id}'
	onclick="deleteUser(${user.id})" >
	<span class='material-icons'>delete</span></button> `;
	icon.className = "text-end";

	newRow.append(
		newId,
		newDate,
		newStatus,
		newFirstName,
		newLastname,
		newUserName,
		newRegistrationNumber,
		icon
	);

	body.append(newRow);
}

// takes the users list and draw the table with a row for each user
function drawTable() {
	tableDiv.innerHTML = "";
	fillHeader();
	users.forEach((user, index) => {
		fillTable(user);
	});
}

//helper functions
function getDate() {
	let date = new Date();
	let day = date.getDay();
	let month = date.getMonth();
	let year = date.getFullYear();
	return `${day} / ${month} / ${year}`;
}

function resetInputs() {
	firstNameInput.value = null;
	lastNameInput.value = null;
	userNameInput.value = null;
	codeInput.value = null;
	creationDate.value = null;
	statusInput.value = null;
	let spans = [...document.getElementsByClassName("errorSpan")];
	spans.forEach((span) => {
		span.innerText = "";
	});
}

function generateID() {
	let id = Date.now() + Math.random().toLocaleString();
	return id.split(".")[1];
}

function deleteUser(id) {
	users = users.filter((user) => user.id != id);
	drawTable();
}

function filter() {
	let input = document.getElementById("txt_search");
	let querry = input.value.toUpperCase();
	let table = document.getElementById("nxt-table");

	let tr = table.getElementsByTagName("tr");

	if (querry.length != 0) {
		for (let i = 0; i < tr.length; i++) {
			let tds = tr[i].getElementsByTagName("td");
			let searched = false;
			for (let j = 0; j < tds.length; j++) {
				let td = tds[j];
				if (td.innerHTML.toUpperCase().indexOf(querry) > -1) {
					searched = true;
				}
			}
			if (searched) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	} else {
		drawTable();
	}
}

//modal code
const modal = document.querySelector("#modal");
const modalOpenBtn = document.querySelector("#open-modal-btn");
const overlay = document.querySelector("#overlay");

modalOpenBtn.addEventListener("click", (e) => {
	resetInputs();
	modal.classList.add("open");
	overlay.classList.add("open");
});

overlay.addEventListener("click", (e) => {
	modal.classList.remove("open");
	overlay.classList.remove("open");
});

window.onload = (event) => {
	drawTable();
	creationDate.innerText = getDate();
};
