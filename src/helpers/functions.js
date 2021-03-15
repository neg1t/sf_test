import { v4 as uuidv4 } from 'uuid'

export const chequeType = (value) => {
  let message = ''
  if (value === 1) {
    message = 'Возврат'
  } else {
    message = 'Продажа'
  }
  return message
}

export const chequeStatus = (pays, sum) => {
  const paidSum = paysSum(pays)
  let message = ''

  if (paidSum === sum) {
    message = 'Оплачено'
  } else if (paidSum < sum) {
    message = 'Недоплата'
  } else {
    message = 'Нет оплаты'
  }
  return message
}

export const paysSum = (pays) => {
  let sum1 = 0
  for (let i = 0; i < pays.length; i++) {
    sum1 += pays[i].sum
  }
  return sum1
}

export const productCount = (positions) => {
  let count = 0;
  for (let i = 0; i < positions.length; i++) {
    count += positions[i].quantity
  }
  return count
}

export const productsName = (positions) => {
  const productsArray = []
  for (let i = 0; i < positions.length; i++) {
    productsArray.push(positions[i].name)
  }
  return productsArray.join(', ')
}

export const dateFormat = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  const d = new Date(date)
  return d.toLocaleDateString('ru-RU', options)
}

export const toLocaleCurrency = value => {
  const rubs = (value / 100).toFixed(2)
  return Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(rubs)
}

export const createNewCheckArray = (data, products) => {
  const cardBalance = Number(data.cardsum)
  const productId = Number(data.product)
  const productsCount = Number(data.count)
  const date = new Date()
  const product = products.find(i => i.id === productId)
  const sumToPay = product.price * productsCount
  const cardBalanceAfterPay = cardBalance - sumToPay
  let pays = 0
  
  if (cardBalanceAfterPay < 0) {
    pays = cardBalance
  } else if (cardBalanceAfterPay >= 0) {
    pays = sumToPay
  }

  const newData = [{
    "pays": [{
      "sum": pays
    }],
    "positions": [{
      "name": product.name,
      "price": product.price,
      "quantity": productsCount,
      "sum": sumToPay
    }],
    "uid": uuidv4(),
    "sum": sumToPay,
    "chequeType": 0,
    "dateReg": date,
    "kioskName": "Киоск № 11"
  }]

  return newData
}