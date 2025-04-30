import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS: // Cargar del servidor
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMENTARIO: //Añadir nuevo
      const comentario = {
        ...action.payload,
        id: state.comentarios.length
      };
      return { ...state, comentarios: state.comentarios.concat(comentario) };
      
    default:
      return state;
  }
};