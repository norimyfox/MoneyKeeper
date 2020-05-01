"use strict"
//We get objects from the page using:
let start = document.getElementById('start');
    budgetVal = document.getElementsByClassName('budget-value');
    dayBudgetVal = document.getElementsByClassName('daybudget-value');
    levelVal = document.getElementsByClassName('level-value');
    expensesVal = document.getElementsByClassName('expenses-value');
    optExpenesVal = document.getElementsByClassName('optionalexpenses-value');
    incomeVal = document.getElementsByClassName('income-value');
    monthSavingsVal = document.getElementsByClassName('monthsavings-value');
    yearSavingsVal = document.getElementsByClassName('yearsavings-value');
    input = document.getElementsByClassName('expenses-item');

    buttons = document.getElementsByTagName('button');
    expBtn = (buttons[0]);
    optBtn = (buttons[1]); 
    countBtn = (buttons[2]);

    optExItem = document.querySelectorAll('.optionalexpenses-item');

    chooseInc = document.querySelector('.choose-income');
    checkBox = document.querySelector('#savings');
    inputSum = document.querySelector('.choose-sum');
    inputPerc = document.querySelector('.choose-percent');
    year = document.querySelector('.year-value');
    month = document.querySelector('.month-value');
    day = document.querySelector('.day-value');

//Move variables to the global execution area:
let money, time;
//We will learn budget information from the user:
function start() {
	money = +prompt("What is your monthly budget?", ""); 
	time = prompt("Enter date in format YYYY-MM-DD", "");

	while(isNaN(money) || money == "" || money == null) {
		money = +prompt("What is your monthly budget?", ""); 
	}
}
start();

//Create our main object
let appData={ 
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
	savings: true,
	chooseExpenses: function() {
		for (let i = 1; i < 3; i++) {
			let a = prompt("Enter a required cost item this month", ''),
				b = prompt("How much will it cost?", '');
		
			if ( (typeof(a))=== "string" && a != null && b != null && a != "" && b != "" && a.length < 50 ) {
				console.log("done");
				appData.expenses[a] = b;
			} else {
				alert("Error entering data, try again!"),
				console.log("error!"),
				i--;
			}
		}
	},
	detectDayBudget: function() { // Daily budget calculation
		appData.moneyPerDay = (appData.budget / 30).toFixed(1);
		alert("Ежедневный бютжет: " + appData.moneyPerDay);
	},

	checkSavings: function() { //Calculation of income per month from a deposit
		if (appData.savings = true) {
			let save = +prompt("What is the amount of savings?"),
				percent = +prompt("What percentage?");

			appData.monthIncome = save/100/12*percent;
			alert("Доход в месяц с вашего депозита: " +appData.monthIncome);
		}
	},

	detectLevel: function() { //Determining the level of wealth
		if(appData.moneyPerDay < 100) {
			console.log("Minimum level of wealth");
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log("Average income");
		} else if (appData.moneyPerDay > 2000) {
			console.log("High level of wealth"); 
		} else {
			console.log("An error has occurred");
		}
	},
	chooseOptExpense: function() { //Optional expenses
		for (let i = 1; i < 4; i++) {
			let	a = +prompt("An item of optional expenses?");
	
			if (a != null && a != "") {
				console.log("done", i);
				appData.optionalExpenses[i] = a;
			} else {
				alert("Error entering data, try again!"),
				console.log("error!", i),
				i--;
			}	
		}
	},
	chooseIncome: function() { //Additional income
		let items = prompt("What brings additional income? (Comma list)", "");
		
		while(!isNaN(items) || items == "" || items == null) {
			items = prompt("What will bring additional income? (List with a comma)", "");
		}
		appData.income = items.split(', ');

		let subItems = prompt("Maybe something else?", "");

		while(!isNaN(subItems) || subItems == "" || subItems == null) {
			subItems = prompt("Maybe something else?", "");
			appData.income.push(subItems);
		}
		appData.income.sort();
		appData.income.forEach(function(item, a) {
			alert((a + 1) + ": Additional methods earnings: " + item);
		});
	},
	showData: function() {
		console.log("Our program includes data: ");
		for(let key in appData) {
			console.log(key);
		}
	}
};
