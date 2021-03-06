import { all, call, put, takeEvery } from 'redux-saga/effects';
import webApi from '../../../services/webApi.service';
import {
	FETCH_MOVIE_REVIEWS,
	FETCH_MOVIE_REVIEWS_SUCCESS,
	SET_REACTION,
	SET_REACTION_SUCCESS,
	SET_REACTION_FAILURE
} from './actionTypes';
import {
	FETCH_USER_REVIEWS,
	FETCH_USER_REVIEWS_SUCCESS,
	DELETE_REVIEW_BY_ID
} from '../../UserPage/UserReviews/actionTypes';
import { SET_RECOMMENDED_REACTION } from '../../MainPage/RecommendList/RecommendList.redux/actionTypes';

export function* fetchMovieReviews(action) {
	try {
		const { movieId } = action.payload;

		const reviews = yield call(webApi, {
			endpoint: `/api/review/movie/${movieId}`,
			method: 'GET'
		});

		yield put({
			type: FETCH_MOVIE_REVIEWS_SUCCESS,
			payload: {
				reviews
			}
		});
	} catch (e) {
		console.log(e);
	}
}

export function* fetchUserReviews(action) {
	const { userId } = action.payload;
	try {
		const response = yield call(webApi, {
			endpoint: `/api/review/user/${userId}`,
			method: 'GET'
		});

		yield put({
			type: FETCH_USER_REVIEWS_SUCCESS,
			payload: {
				reviewUserList: response
			}
		});
	} catch (e) {
		console.log(e);
	}
}

export function* deleteRevievById(action) {
	const { reviewId } = action.payload;
	try {
		const response = yield call(webApi, {
			endpoint: `/api/review/${reviewId}`,
			method: 'DELETE'
		});
	} catch (e) {
		console.log(e);
	}
}

export function* setReaction(action) {
	const { reviewId, isLike } = action.payload;
	try {
		const response = yield call(webApi, {
			endpoint: `/api/review/reaction`,
			method: 'POST',
			body: { reviewId, isLike }
		});
		yield put({
			type: SET_REACTION_SUCCESS,
			payload: {
				updatedReaction: response,
				reviewId
			}
		});

		yield put({
			type: SET_RECOMMENDED_REACTION,
			payload: {
				updatedReaction: response,
				reviewId
			}
		});
	} catch (e) {
		yield put({
			type: SET_REACTION_FAILURE,
			payload: { errorWithReview: reviewId }
		});
		console.log(e);
	}
}

function* watchLoadMoreReviews() {
	yield takeEvery(FETCH_MOVIE_REVIEWS, fetchMovieReviews);
}

function* watchfetchUserReviews() {
	yield takeEvery(FETCH_USER_REVIEWS, fetchUserReviews);
}

function* watchDeleteRevievById() {
	yield takeEvery(DELETE_REVIEW_BY_ID, deleteRevievById);
}

function* watchSetReaction() {
	yield takeEvery(SET_REACTION, setReaction);
}

export default function* review() {
	yield all([
		watchLoadMoreReviews(),
		watchfetchUserReviews(),
		watchDeleteRevievById(),
		watchSetReaction()
	]);
}
