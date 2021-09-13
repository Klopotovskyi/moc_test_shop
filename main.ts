interface itemType {
    item: string,
    type: string,
    quantity?: number,
    weight?: number,
    pricePerKilo?: string,
    pricePerItem?: string
}

interface normalizedItem {
    index: number,
    value: string,
    tolalCoast: number;
}

interface chipestItem {
    index: number,
    type: string,
    price: number
}

const items: itemType[] = [
    {"item": "apple", "type": "Fuji", "weight": 10, "pricePerKilo": "$3"},
    {"item": "orange", "type": "Clementine", "weight": 6, "pricePerKilo": "$7"},
    {"item": "watermelon", "type": "Nova", "quantity": 1, "pricePerItem": "$5"},
    {"item": "orange", "type": "Navel", "weight": 6, "pricePerKilo": "$7"},
    {"item": "pineapple", "type": "Queen", "quantity": 4, "pricePerItem": "$15"},
    {"item": "pineapple", "type": "Pernambuco", "quantity": 3, "pricePerItem": "$12"},
    {"item": "apple", "type": "Cameo", "weight": 6, "pricePerKilo": "$7"},
    {"item": "watermelon", "type": "Trio", "quantity": 2, "pricePerItem": "$9"},
    {"item": "pineapple", "type": "Red Spanish", "quantity": 3, "pricePerItem": "$9,99"},
    {"item": "watermelon", "type": "Millionaire", "quantity": 2, "pricePerItem": "$7"},
    {"item": "orange", "type": "Tangerine", "weight": 4, "pricePerKilo": "$4,99"},
    {"item": "apple", "type": "Jazz", "weight": 4, "pricePerKilo": "$5"},
]

const sorting = (arr: itemType [], NormArr: normalizedItem[] | chipestItem[], param: string) => {
    return NormArr.sort((a: any, b: any) => {
        if (a[param] > b[param]) {
            return 1;
        }
        if (a[param] < b[param]) {
            return -1;
        }
        return 0;
    }).map((el: normalizedItem | chipestItem) => {
        return arr[el.index];
    })
};
const getCutString = (str: string) => {
    return str.slice(1).replace(",", ".");
}

//main function
const analyzeData = (data: itemType[]): number => {
    let watermelonQuantity: number = 0;
    let appleWeight: number = 0;
    let oranges: {
        index: number,
        type: string,
        price: number
    } [] = [];
//Normalized input array
    const normalizeArr = data.map((el: itemType, i: number) => {
        if (el.item === 'orange' && el.pricePerKilo) {
            oranges = [...oranges, {
                index: i,
                type: el.type,
                price: parseFloat(getCutString(el.pricePerKilo))
            }]
        }
        if (el.item === 'watermelon' && el.quantity) {
            watermelonQuantity = watermelonQuantity + el.quantity
        }
        if (el.item === 'apple' && el.weight) {
            appleWeight = appleWeight + el.weight;
        }
        return {
            index: i,
            value: el.item,
            tolalCoast:
                el.weight && el.pricePerKilo ?
                    el.weight * parseFloat(getCutString(el.pricePerKilo))
                    : el.quantity && el.pricePerItem
                    ? el.quantity * parseFloat(getCutString(el.pricePerItem))
                    : 0
        };
    });
    const cheapestOrangeType = sorting(items, oranges, 'price')[0].type;
    const goodsCostByItemName = normalizeArr.reduce((prev, curr) => {
        return {
            apple: curr.value === 'apple' ? prev.apple + curr.tolalCoast : prev.apple,
            orange: curr.value === 'orange' ? prev.orange + curr.tolalCoast : prev.orange,
            watermelon: curr.value === 'watermelon' ? prev.watermelon + curr.tolalCoast : prev.watermelon,
            pineapple: curr.value === 'pineapple' ? prev.pineapple + curr.tolalCoast : prev.pineapple,
        }
    }, {
        apple: 0,
        orange: 0,
        watermelon: 0,
        pineapple: 0
    });
    console.log(`Watermelons - ${watermelonQuantity}`);
    console.log(`Apples - ${appleWeight}`);
    console.log('Sorted goods by item name');
    console.log(sorting(items, normalizeArr, 'value'));
    console.log('Sorted goods by total price');
    console.log(sorting(items, normalizeArr, 'tolalCoast'));
    console.log(`The cheapest orange type is: ${cheapestOrangeType}`);
    console.log('cost of the goods by item name:');
    console.log(`Apples - $${goodsCostByItemName.apple}, Pineapples - $${goodsCostByItemName.pineapple}, Watermelons - $${goodsCostByItemName.watermelon}, Oranges - $${goodsCostByItemName.orange}`);

    return normalizeArr.reduce((prev, curr) => {
        return prev + curr.tolalCoast
    }, 0);
};

console.log(`Total cost of all goods: $${analyzeData(items)}`)
