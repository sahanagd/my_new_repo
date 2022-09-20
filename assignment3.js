// Create class Sale with properties => name, amount
class Sale {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

// Create class Purchase with properties => name, amount
class Purchase {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
}

// Create a Class Company with properties => name, sales(array of Sale), purchases(array of Purchase)
// Add a function addSale => will create new objects of Sale and push it to the sales arrays 
// Add a function addPurchase => will create new objects of Purchase and push it to the purchaese arrays 
// sales & purchases will be private members

class Company {
    #sales = [];
    #purchases = [];
    constructor(name) {
        this.name = name;
    }

    addSale(name, amount) {
        this.#sales.push(new Sale(name, amount));
    }

    addPurchase(name, amount) {
        this.#purchases.push(new Purchase(name, amount));
    }

    /**
     *  Add a function getProfitLossReport
     * 1. Calculate Profit using sales
     * 2. Calculate spends using purchases
     * 3. Calculate difference between profit and spends
     * 4. return an object in following format
     * {
     *      income: sum of sales,
     *      expense: sum of purchases,
     *      profit: income - expense, (if income > expense)
     *      loss: expense - income, (if income < expense)
     * }
     * 
     */

    getProfitLossReport() {
        const totalSales = this.#sales.reduce((p, n)=> p += n.amount, 0);
        const totalPurchases = this.#purchases.reduce((p, n)=> p += n.amount, 0);
        return {
            income: totalSales,
            expense: totalPurchases,
            profit: totalSales > totalPurchases ? totalSales - totalPurchases : undefined,
            loss: totalSales < totalPurchases ?  totalPurchases - totalSales : undefined,
       };
    }
}


// Create a Class MNC by inheriting Company with extra properties => taxRate, country
// Add a function calculateTax
// If profit is more than 5,00,000 tax will be applied to amount (profit - 500000)
// ex. if profit = 600000 & taxRate = 10
// taxable amount will be 600000 - 500000 = 100000
// tax = 100000 * 10/100 = 10000

class MNC extends Company {
    constructor(name, taxRate, country) {
        super(name);
        this.taxRate = taxRate;
        this.country = country;
    }
    calculateTax() {
        const PL = this.getProfitLossReport();
        const tax = PL.profit ? (PL.profit > 500000 ? (PL.profit - 500000) * this.taxRate / 100 : 0 ) : 0;
        return tax;
    }
}

// Create an object of MNC and calculate tax with differnet input combination
// add Sales & purchases to make it realtime

const samsung = new MNC("SAMSUNG", 10, "South Korea");
console.log(
    `Company Name - ${samsung.name}      Country - ${samsung.country}`
);
console.log("-----| Purchases |-----");
samsung.addPurchase("LED", 15000);
// samsung.addPurchase("Lenses", 250000);
samsung.addPurchase("Camera", 350000);
samsung.purchases;

console.log("");
console.log("");
console.log("");

console.log("-----| Sales |-----");
samsung.addSale("Samsung Galaxy Watch", 100000);
samsung.addSale("Samsung HD TV", 200000);
samsung.addSale("Samsung Mobiles", 300000);
samsung.addSale("Samsung Mobiles", 300000);
samsung.sales;
console.log("");
console.log("");


console.log("-----| Profit & Loss Report |-----");

console.log(samsung.getProfitLossReport());

console.log("");

console.log("-----| Tax |-----");
console.log(samsung.calculateTax());
