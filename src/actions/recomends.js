import Request from 'superagent';
import {
  RECOMENDATIONS_FAILURE,
  RECOMENDATIONS_REQUEST,
  RECOMENDATIONS_SUCCESS,
  LIKE_RECOMENDATION,
  UNLIKE_RECOMENDATION,
} from './types';

import url from '../constants/url';

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
      dispatch({
        type: RECOMENDATIONS_SUCCESS,
        payload: response.body,
      });
    } catch (err) {
      dispatch({
        type: RECOMENDATIONS_FAILURE,
        error: true,
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
        error: true,
      });
    }
  };
}

