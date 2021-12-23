//graping the HTML elements to play with them and manipulate
const balance = document.getElementById("balance");
const incomeAmount = document.getElementById("income-amount");
const expenseAmount = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//dummy Data
// const dummyTransactions = [
//   { id: 1, text: "Burger", amount: -30 },
//   { id: 2, text: "Web Project", amount: 1000 },
//   { id: 3, text: "Course Fee", amount: -100 },
//   { id: 4, text: "Web Project 2", amount: 300 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
//function to add transaction to the DOM

function AddTransactionDOM(transaction) {
  //deciding the sign of the amount
  const sign = transaction.amount < 0 ? "-" : "+";

  //creating a new li tag to put our transaction
  const item = document.createElement("li");

  //adding class to the li element
  item.classList.add(transaction.amount < 0 ? "removeAmount" : "addAmount");

  //adding value to the li element
  item.innerHTML = `${transaction.text}
          <span>${sign}${Math.abs(transaction.amount)}$</span>
          <button class="deleteButton" onClick="RemoveTransaction(${
            transaction.id
          })">X</button>`;

  //adding li element to the ul element
  transactionList.appendChild(item);
}
//delete button functionality

function RemoveTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  UpdateLocalStorage();
  Init();
}
//add the transaction coming from form to the history or list
function AddTransactionHistory(event) {
  event.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter message and amount");
  } else {
    const transaction = {
      id: GenerateId(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    AddTransactionDOM(transaction);
    UpdateValues();
    UpdateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//Generate ID
function GenerateId() {
  return Math.floor(Math.random() * 10000000);
}
//update values
function UpdateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `${total}`;
  incomeAmount.innerText = `${income}`;
  expenseAmount.innerText = `${expense}`;
}

//update local storage
function UpdateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
//Init App
function Init() {
  transactionList.innerHTML = "";
  transactions.forEach(AddTransactionDOM);
  UpdateValues();
}

form.addEventListener("submit", AddTransactionHistory);
Init();
