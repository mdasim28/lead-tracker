"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://leads-tracker-27c4a-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "Leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.querySelector("#delete-btn");

function render(leads) {
  ulEl.innerHTML = "";
  for (let i = 0; i < leads.length; i++) {
    ulEl.innerHTML +=
      "<li><a href='" +
      leads[i] +
      "' target='_blank'>" +
      leads[i] +
      "</a></li>";
  }
}

onValue(referenceInDB, function (snapshot) {
  if (snapshot.exists()) {
    const snapshotValues = snapshot.val();
    const leads = Object.values(snapshotValues);
    render(leads);
  }
});

inputBtn.addEventListener("click", function () {
  push(referenceInDB, inputEl.value);
  inputEl.value = "";
});

deleteBtn.addEventListener("dblclick", () => {
  remove(referenceInDB);
  ulEl.innerHTML = "";
});
