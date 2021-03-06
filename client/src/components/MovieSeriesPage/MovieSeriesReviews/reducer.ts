import {
	FETCH_MOVIE_REVIEWS_SUCCESS,
	FETCH_MOVIE_REVIEWS,
	SET_REACTION_SUCCESS,
	SET_REACTION_FAILURE
} from './actionTypes';
import {
	FETCH_USER_REVIEWS,
	FETCH_USER_REVIEWS_SUCCESS,
	DELETE_REVIEW_BY_ID
} from '../../UserPage/UserReviews/actionTypes';
import movieAdapter from '../../MovieSeriesPage/movieAdapter';
const initialState: {
	reviewList?: any;
	isLoaded?: boolean;
	reviewUserList?: any;
	loading?: boolean;
	errorWithReview?: string;
} = {
	isLoaded: undefined,
	loading: true,
	reviewList: null,
	reviewUserList: null,
	errorWithReview: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MOVIE_REVIEWS:
			return { ...state, reviewList: null, isLoaded: false };

		case FETCH_MOVIE_REVIEWS_SUCCESS:
			return {
				...state,
				reviewList: action.payload.reviews,
				isLoaded: true,
				errorWithReview: undefined
			};

		case SET_REACTION_SUCCESS:
			const { updatedReaction, reviewId: newReviewId } = action.payload;
			const newReviewList = [...state.reviewList];
			state.reviewList.forEach((element, index) => {
				if (element.id === newReviewId) {
					const review = { ...element };
					review.reaction = { ...updatedReaction };
					newReviewList.splice(index, 1, review);
				}
			});
			return {
				...state,
				reviewList: [...newReviewList],
				errorWithReview: undefined
			};

		case SET_REACTION_FAILURE:
			return {
				...state,
				errorWithReview: action.payload.errorWithReview
			};

		case FETCH_USER_REVIEWS:
			return { ...state, reviewUserList: null, loading: true };

		case FETCH_USER_REVIEWS_SUCCESS:
			const resultReviewUserList = action.payload.reviewUserList.map(review => {
				review.movie = movieAdapter(review.movie);
				return review;
			});
			return {
				...state,
				reviewUserList: resultReviewUserList,
				loading: false
			};

		case DELETE_REVIEW_BY_ID:
			const { reviewId } = action.payload;
			const reviewUserList = state.reviewUserList.filter(
				review => review.id !== reviewId
			);
			return { ...state, reviewUserList };

		default:
			return state;
	}
};
