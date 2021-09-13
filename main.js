"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var items = [
    { "item": "apple", "type": "Fuji", "weight": 10, "pricePerKilo": "$3" },
    { "item": "orange", "type": "Clementine", "weight": 6, "pricePerKilo": "$7" },
    { "item": "watermelon", "type": "Nova", "quantity": 1, "pricePerItem": "$5" },
    { "item": "orange", "type": "Navel", "weight": 6, "pricePerKilo": "$7" },
    { "item": "pineapple", "type": "Queen", "quantity": 4, "pricePerItem": "$15" },
    { "item": "pineapple", "type": "Pernambuco", "quantity": 3, "pricePerItem": "$12" },
    { "item": "apple", "type": "Cameo", "weight": 6, "pricePerKilo": "$7" },
    { "item": "watermelon", "type": "Trio", "quantity": 2, "pricePerItem": "$9" },
    { "item": "pineapple", "type": "Red Spanish", "quantity": 3, "pricePerItem": "$9,99" },
    { "item": "watermelon", "type": "Millionaire", "quantity": 2, "pricePerItem": "$7" },
    { "item": "orange", "type": "Tangerine", "weight": 4, "pricePerKilo": "$4,99" },
    { "item": "apple", "type": "Jazz", "weight": 4, "pricePerKilo": "$5" },
];
var sorting = function (arr, NormArr, param) {
    return NormArr.sort(function (a, b) {
        if (a[param] > b[param]) {
            return 1;
        }
        if (a[param] < b[param]) {
            return -1;
        }
        return 0;
    }).map(function (el) {
        return arr[el.index];
    });
};
var getCutString = function (str) {
    return str.slice(1).replace(",", ".");
};
//main function
var analyzeData = function (data) {
    var watermelonQuantity = 0;
    var appleWeight = 0;
    var oranges = [];
    //Normalized input array
    var normalizeArr = data.map(function (el, i) {
        if (el.item === 'orange' && el.pricePerKilo) {
            oranges = __spreadArray(__spreadArray([], oranges, true), [{
                    index: i,
                    type: el.type,
                    price: parseFloat(getCutString(el.pricePerKilo))
                }], false);
        }
        if (el.item === 'watermelon' && el.quantity) {
            watermelonQuantity = watermelonQuantity + el.quantity;
        }
        if (el.item === 'apple' && el.weight) {
            appleWeight = appleWeight + el.weight;
        }
        return {
            index: i,
            value: el.item,
            tolalCoast: el.weight && el.pricePerKilo ?
                el.weight * parseFloat(getCutString(el.pricePerKilo))
                : el.quantity && el.pricePerItem
                    ? el.quantity * parseFloat(getCutString(el.pricePerItem))
                    : 0
        };
    });
    var cheapestOrangeType = sorting(items, oranges, 'price')[0].type;
    var goodsCostByItemName = normalizeArr.reduce(function (prev, curr) {
        return {
            apple: curr.value === 'apple' ? prev.apple + curr.tolalCoast : prev.apple,
            orange: curr.value === 'orange' ? prev.orange + curr.tolalCoast : prev.orange,
            watermelon: curr.value === 'watermelon' ? prev.watermelon + curr.tolalCoast : prev.watermelon,
            pineapple: curr.value === 'pineapple' ? prev.pineapple + curr.tolalCoast : prev.pineapple,
        };
    }, {
        apple: 0,
        orange: 0,
        watermelon: 0,
        pineapple: 0
    });
    console.log("Watermelons - " + watermelonQuantity);
    console.log("Apples - " + appleWeight);
    console.log('Sorted goods by item name');
    console.log(sorting(items, normalizeArr, 'value'));
    console.log('Sorted goods by total price');
    console.log(sorting(items, normalizeArr, 'tolalCoast'));
    console.log("The cheapest orange type is: " + cheapestOrangeType);
    console.log('cost of the goods by item name:');
    console.log("Apples - $" + goodsCostByItemName.apple + ", Pineapples - $" + goodsCostByItemName.pineapple + ", Watermelons - $" + goodsCostByItemName.watermelon + ", Oranges - $" + goodsCostByItemName.orange);
    return normalizeArr.reduce(function (prev, curr) {
        return prev + curr.tolalCoast;
    }, 0);
};
console.log("Total cost of all goods: $" + analyzeData(items));
