import Request from 'superagent';
import {
  RECOMENDATIONS_FAILURE,
  RECOMENDATIONS_REQUEST,
  RECOMENDATIONS_SUCCESS,
  LIKE_RECOMENDATION,
  UNLIKE_RECOMENDATION,
  CHANGE_TAB,
  HISTORY_SUCCESS,
} from './types';

import url from '../constants/url';

export const getHistory = (token) => {
  console.log('Bamos a pedir el historial', token);
  return {
    type: HISTORY_SUCCESS,
    payload: [],
  };
};


export function getRecomendations(token, predictionScore, predictionArea, selectedArea) {
  const request = Request.post(`${url}/recommendation`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send({
      essays: predictionScore === 'essays',
      area: predictionArea === 'goals' ? 'compute' : selectedArea,
    })
    .accept('application/tuniversidad.v1')
    .withCredentials();

  return async (dispatch) => {
    dispatch({
      type: RECOMENDATIONS_REQUEST,
    });
    try {
      const response = await request;
      console.log(response);
      dispatch({
        type: RECOMENDATIONS_SUCCESS,
        payload: response.body,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: RECOMENDATIONS_FAILURE,
        payload: err,
      });
    }
  };
}

export function likeRecomendation(token, id, liked) {
  if (!liked) {
    return {
      type: UNLIKE_RECOMENDATION,
      payload: id,
    };
  }
  const request = Request.patch(`${url}/recommendation/${id}`)
  .set('Content-Type', 'application/json')
  .set('Authorization', token)
  .send({
    recommendation: {
      liked,
    },
  })
  .accept('application/tuniversidad.v1')
  .withCredentials();

  return async (dispatch) => {
    dispatch({
      type: RECOMENDATIONS_REQUEST,
    });
    try {
      await request;
      dispatch({
        type: LIKE_RECOMENDATION,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: RECOMENDATIONS_FAILURE,
        payload: err,
      });
    }
  };
}

export const changeTab = tab => ({
  type: CHANGE_TAB,
  payload: tab,
});
