"use strict"
let start = document.getElementById('start'); //Начать расчет
    budgetVal = document.getElementsByClassName('budget-value'); //Доход
    dayBudgetVal = document.getElementsByClassName('daybudget-value'); //Бюджет на 1 день
    levelVal = document.getElementsByClassName('level-value'); //Уровень дохода
    expensesVal = document.getElementsByClassName('expenses-value'); //Обязательные расходы
    optExpenesVal = document.getElementsByClassName('optionalexpenses-value'); //Возможные траты
    incomeVal = document.getElementsByClassName('income-value'); //Дополнительный доход
    monthSavingsVal = document.getElementsByClassName('monthsavings-value'); //Накопления за 1 месяц
    yearSavingsVal = document.getElementsByClassName('yearsavings-value'); //Накопления за 1 год
    input = document.getElementsByClassName('expenses-item'); //Поля input 

    buttons = document.getElementsByTagName('button'); //Все buttons
    expBtn = (buttons[0]); // Утвердить (1)
    optBtn = (buttons[1]); //Утвердить (2)
    countBtn = (buttons[2]); //Рассчитать

    optExItem = document.querySelectorAll('.optionalexpenses-item'); //Поля ввода необяз. расходов

    chooseInc = document.querySelector('.choose-income'); // Поле возможного дохода
    checkBox = document.querySelector('#savings'); //Чек бокс накоплений
    inputSum = document.querySelector('.choose-sum'); //Поле ввода "Сумма"
    inputPerc = document.querySelector('.choose-percent'); //Полее ввода "Процент"
    year = document.querySelector('.year-value'); //Поле ввода "год"
    month = document.querySelector('.month-value'); //Поле ввода "месяц"
    day = document.querySelector('.day-value'); //Поле ввода "день"

let money, time; //переменные вынесены за функцию для доступа к ним
function start() { //Сбор информации по бюджету
	money = +prompt("Ваш бюджет на месяц?", ""); 
	time = prompt("Введите дату в формате YYYY-MM-DD", "");

	while(isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", ""); 
	}
}
start();

let appData={ 
    budget: money,
    timeData: time,
    expenses: {}, //обязательные расходы
    optionalExpenses: {}, //не обязательные расходы 
    income: [], //массив данных с доп. доходом  (оставляем пока пустым)
	savings: true,
	chooseExpenses: function() {
		for (let i = 1; i < 3; i++) {
			let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
				b = prompt("Во сколько обойдется?", '');
		
			if ( (typeof(a))=== "string" && a != null && b != null && a != "" && b != "" && a.length < 50 ) {
				console.log("done");
				appData.expenses[a] = b;
			} else {
				alert("Ошибка при вводе данных, повторите попытку!"),
				console.log("error!"),
				i--;
			}
		}
	},
	detectDayBudget: function() { // Расчет дневного бюджета
		appData.moneyPerDay = (appData.budget / 30).toFixed(1);
		alert("Ежедневный бютжет: " + appData.moneyPerDay);
	},

	checkSavings: function() { //расчет дохода в месяц с депозита
		if (appData.savings = true) {
			let save = +prompt("Какова сумма накоплений?"),
				percent = +prompt("Под какой процент?");

			appData.monthIncome = save/100/12*percent;
			alert("Доход в месяц с вашего депозита: " +appData.monthIncome);
		}
	},

	detectLevel: function() { //определение уровеня достатка
		if(appData.moneyPerDay < 100) {
			console.log("Минимальный уровень достатка");
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log("Средний уровень достатка");
		} else if (appData.moneyPerDay > 2000) {
			console.log("Высокий уровень достатка"); 
		} else {
			console.log("Произошла ошибка");
		}
	},
	chooseOptExpense: function() { //Способ FOR
		for (let i = 1; i < 4; i++) {
			let	a = +prompt("Статья необязательных расходов?");
	
			if (a != null && a != "") {
				console.log("done", i);
				appData.optionalExpenses[i] = a;
			} else {
				alert("Ошибка при вводе данных, повторите попытку!"),
				console.log("error!", i),
				i--;
			}	
		}
	},
	chooseIncome: function() { //Доп. доходы
		let items = prompt("Что принесёт дополнительный доход? (Перечислите через запятую)", "");
		
		while(!isNaN(items) || items == "" || items == null) {
			items = prompt("Что принесёт дополнительный доход? (Перечислите через запятую)", "");
		}
		appData.income = items.split(', ');

		let subItems = prompt("Может что-то еще?", "");

		while(!isNaN(subItems) || subItems == "" || subItems == null) {
			subItems = prompt("Может что-то еще?", "");
			appData.income.push(subItems);
		}
		appData.income.sort();
		appData.income.forEach(function(item, a) {
			alert((a + 1) + ": Способы доп. заработка: " + item);
		});
	},
	showData: function() {
		console.log("Наша программа включает в себя данные: ");
		for(let key in appData) {
			console.log(key);
		}
	}
};
