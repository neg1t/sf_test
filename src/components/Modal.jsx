import { useForm } from 'react-hook-form'
import products from '../data/product'
import { connect } from 'react-redux'
import { createNewCheckArray, toLocaleCurrency } from '../helpers/functions'
import { addNewCheck } from '../redux/reducers/cheques-reducers'
import './Modal.css'

let Modal = ({
  active,
  update,
  addNewCheck
}) => {

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    const newData = createNewCheckArray(data, products)
    addNewCheck(newData)
    e.target.reset()
    closeHandler()
  }
  const closeHandler = () => {
    update(false)
  }

  return (
    <section className={`fixed-overlay fixed-overlay_modal ${active ? 'modal_active' : ''}`}>
      <div className='modal'>
        <div className='modal-container'>
          <div className='modal__header'>
            <span onClick={closeHandler} className="close">X</span>
          </div>
          <div className="modal__main">
            <form action="" method='POST' onSubmit={handleSubmit(onSubmit)} className='modal-form'>
              <label htmlFor="cardsum">Денег на карте (в копейках)</label>
              {errors.cardsum && <p className='modal-form__errors'>Это поле обязательно</p>}
              <input className="form-styling" type="number" name="cardsum" ref={register({ required: true })} />

              <label htmlFor="product">Выберите продукт</label>
              {errors.product && <p className='modal-form__errors'>Это поле обязательно</p>}
              <select name='product' className='selector' ref={register({ required: true })}>
                <option hidden value='' >Продукты...</option>
                {products.map(i => (
                  <option key={i.id} value={i.id}>{i.name} ({toLocaleCurrency(i.price)})</option>
                ))}
              </select>

              <label htmlFor="count">Количество продуктов</label>
              {errors.count && <p className='modal-form__errors'>Это поле обязательно</p>}
              <input className="form-styling" type="number" name="count" ref={register({ required: true })} />

              <div className='modal-form__buttons'>
                <button className='cancel-button' type='button' onClick={closeHandler}>Отменить</button>
                <button className='buy-button' type='submit'>Купить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, { addNewCheck })(Modal)