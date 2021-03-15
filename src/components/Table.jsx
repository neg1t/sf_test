import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { getCheques, deleteOneCheque, changeDeletingStatus } from '../redux/reducers/cheques-reducers'
import { chequeType, chequeStatus, paysSum, productCount, productsName, dateFormat } from '../helpers/functions'
import Modal from './Modal'

let Table = ({
  cheques,
  getCheques,
  deleteOneCheque,
  changeDeletingStatus,
  deletingStatus
}) => {

  const [deleteButton, setDeleteButton] = useState({ active: false, text: 'Удалить' })
  const [createActive, setCreateActive] = useState(false)

  useEffect(() => {
    if (cheques.length === 0) {
      getCheques()
    }
  }, [cheques, getCheques])

  const deleteHandler = () => {
    changeDeletingStatus()
    if (deleteButton.active) {
      setDeleteButton({ active: false, text: 'Удалить' })
    } else {
      setDeleteButton({ active: true, text: 'Отменить' })
    }
  }
  const createHandler = () => {
    if (!createActive) {
      setCreateActive(true)
    }
  }
  const updateModalStatus = (value) => {
    setCreateActive(value)
  }
  const deleteRow = (id) => {
    if (deletingStatus) {
      deleteOneCheque(id)
    }
  }

  return (
    <div className='main-table'>
      <table>
        <thead>
          <tr>
            <th>Дата покупки</th>
            <th>Киоск</th>
            <th>Тип</th>
            <th>Статус оплаты</th>
            <th>Оплата</th>
            <th>Сумма</th>
            <th>Количество товаров</th>
            <th>Товары</th>
          </tr>
        </thead>
        <tbody>
          {cheques.map(i => (
            <tr
              key={i.uid}
              onClick={() => deleteRow(i.uid)}
              className={deletingStatus ? 'table-row_active' : ''}
            >
              <td>{dateFormat(i.dateReg)}</td>
              <td>{i.kioskName}</td>
              <td>{chequeType(i.chequeType)}</td>
              <td>{chequeStatus(i.pays, i.sum)}</td>
              <td>{paysSum(i.pays)}</td>
              <td>{i.sum}</td>
              <td>{productCount(i.positions)}</td>
              <td>{productsName(i.positions)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='main-table__buttons'>
        <button onClick={deleteHandler}>{deleteButton.text}</button>
        <button onClick={createHandler}>Create</button>
      </div>
      {createActive && <Modal active={createActive} update={updateModalStatus} />}
    </div>
  )
}



const mapStateToProps = state => {
  return {
    cheques: state.chequesReducers.cheques,
    deletingStatus: state.chequesReducers.deletingActivate
  }
}
const mapDispatchToProps = { getCheques, deleteOneCheque, changeDeletingStatus }

export default connect(mapStateToProps, mapDispatchToProps)(Table)