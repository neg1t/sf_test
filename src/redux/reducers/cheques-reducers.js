const FETCH_CHEQUES = 'FETCH_CHEQUES'
const DELETE_CHEQUE = 'DELETE_CHEQUE'
const DELETING_STATUS = 'DELETING_STATUS'
const ADD_CHECK = 'ADD_CHECK'

const initialState = {
  cheques: [],
  deletingActivate: false,
  firstFetching: true
}

const chequesReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHEQUES: {
      return {
        ...state,
        cheques: [...state.cheques, ...action.data],
        firstFetching: false
      }
    }
    case DELETE_CHEQUE: {
      const id = action.id
      return {
        ...state,
        cheques: state.cheques.filter(i => i.uid !== id)
      }
    }
    case DELETING_STATUS: {
      return {
        ...state,
        deletingActivate: !state.deletingActivate
      }
    }
    case ADD_CHECK: {
      return {
        ...state,
        cheques: [...state.cheques, ...action.cheque]
      }
    }
    default: return state
  }
}

//actions
export const fetchCheques = (data) => ({ type: FETCH_CHEQUES, data })
export const deleteCheques = (id) => ({ type: DELETE_CHEQUE, id })
export const deletingStatus = () => ({ type: DELETING_STATUS })
export const addCheck = (cheque) => ({ type: ADD_CHECK, cheque })


export const getCheques = () => async (dispatch) => {
  await fetch('api/data.json').then(res => res.json()).then(data => {
    dispatch(fetchCheques(data.data.cheques))
  })
}

export const deleteOneCheque = (id) => dispatch => {
  dispatch(deleteCheques(id))
}

export const changeDeletingStatus = () => dispatch => {
  dispatch(deletingStatus())
}

export const addNewCheck = (cheque) => dispatch => {
  dispatch(addCheck(cheque))
}

export default chequesReducers