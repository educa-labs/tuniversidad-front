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
  const request = Request.get(`${url}/recommendation/liked`)
  .set('Content-Type', 'application/json')
  .set('Authorization', token)
  .accept('application/tuniversidad.v1')
  .withCredentials();
  return async (dispatch) => {
    dispatch({
      type: RECOMENDATIONS_REQUEST,
    });
    try {
      const response = await request;
      dispatch({
        type: HISTORY_SUCCESS,
        payload: response.body.slice(0, 10),
      });
    } catch (err) {
      dispatch({
        type: RECOMENDATIONS_FAILURE,
        payload: err,
      });
    }
  };
};

export const getMoreRecomends = (token, predictionScore, predictionArea, selectedArea) => {
  const essays = predictionScore === 'essays';
  const area = predictionArea === 'goals' ? 'compute' : selectedArea;
  const request = Request.get(`${url}/recommendation?essays=${essays}&area=${area}`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
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
        essays: predictionScore === 'essays',
        area: predictionArea === 'goals' ? 'compute' : selectedArea,
      });
    } catch (err) {
      dispatch({
        type: RECOMENDATIONS_FAILURE,
        payload: err,
      });
    }
  };
};


export function getRecomendations(token, predictionScore, predictionArea, selectedArea) {
  const essays = predictionScore === 'essays';
  const area = predictionArea === 'goals' ? 'compute' : selectedArea;
  const request = Request.post(`${url}/recommendation`)
    .set('Content-Type', 'application/json')
    .set('Authorization', token)
    .send({
      essays: predictionScore === 'essays',
      area: predictionArea === 'goals' ? 'compute' : selectedArea,
    })
    .accept('application/tuniversidad.v1')
    .withCredentials();

  return async (dispatch, getState) => {
    const state = getState();
    const lastEssays = state.recomends.essays;
    const lastArea = state.recomends.area;
    if (lastEssays === essays || lastArea === area) {
      // Hacer get
      dispatch(getMoreRecomends(token, predictionScore, predictionArea, selectedArea));
    } else {
      dispatch({
        type: RECOMENDATIONS_REQUEST,
      });
      try {
        const response = await request;
        console.log(response);
        dispatch({
          type: RECOMENDATIONS_SUCCESS,
          payload: response.body,
          essays: predictionScore === 'essays',
          area: predictionArea === 'goals' ? 'compute' : selectedArea,
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: RECOMENDATIONS_FAILURE,
          payload: err,
        });
      }
    }
  }
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

  return async (dispatch, getState) => {
    const { recomends } = getState().recomends;
    dispatch({
      type: RECOMENDATIONS_REQUEST,
    });
    try {
      await request;
      dispatch({
        type: LIKE_RECOMENDATION,
        payload: id,
      });
      if (recomends.length === 1) {
        dispatch(getHistory(token));
      }
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
