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

export const chequeStatus = (pays, sum, chequeType) => {
  const paidSum = paysSum(pays)
  let message = ''

  if(chequeType === 1) {
    message = 'Нет оплаты'
  } else if (paidSum === sum) {
    message = 'Оплачено'
  } else if (paidSum < sum) {
    message = 'Недоплата'
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
  const chequeType = Number(data.type)
  const date = data.date
  const kiosk = `Киоск № ${data.kiosk}`
  const product = products.find(i => i.id === productId)
  const sumToPay = product.price * productsCount
  const cardBalanceAfterPay = cardBalance - sumToPay
  let pays = 0
  
  if (chequeType === 1) {
    pays = 0
  } else if (cardBalanceAfterPay < 0) {
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
    "chequeType": chequeType,
    "dateReg": date,
    "kioskName": kiosk
  }]

  return newData
}