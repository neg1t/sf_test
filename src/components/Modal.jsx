import { useForm } from 'react-hook-form'
import products from '../data/product'
import { connect } from 'react-redux'
import { createNewCheckArray } from '../helpers/functions'
import { addNewCheck } from '../redux/reducers/cheques-reducers'
import './Modal.css'

let Modal = ({
  active,
  update,
  addNewCheck
}) => {

  const { register, handleSubmit } = useForm();

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
              <label htmlFor="cardsum">Money on card</label>
              <input className="form-styling" type="number" name="cardsum" ref={register({ required: true })} />

              <label htmlFor="product">Chose product</label>
              <select name='product' className='selector' ref={register({ required: true })}>
                <option hidden value='default'>Products...</option>
                {products.map(i => (
                  <option key={i.id} value={i.id}>{i.name} ({i.price})</option>
                ))}
              </select>

              <label htmlFor="count">Count</label>
              <input className="form-styling" type="number" name="count" ref={register({ required: true })} />

              <div className='modal-form__buttons'>
                <button className='cancel-button' type='button' onClick={closeHandler}>Cancel</button>
                <button className='buy-button' type='submit'>Buy</button>
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