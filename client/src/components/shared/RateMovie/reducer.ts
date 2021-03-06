import {
	FETCH_USER_RATES_SUCCESS,
	SAVE_USER_RATE,
	SAVE_USER_RATE_SUCCESS,
	DELETE_USER_RATE_SUCCESS,
	FETCH_USER_RATES
} from './actionTypes';

interface IReducerState {
	userRates?: IUserRate[];
	isLoading?: boolean;
}

interface IUserRate {
	id: string;
	movieId: string;
	userId: string;
	rate: string;
}

const initialState: IReducerState = {
	userRates: undefined,
	isLoading: undefined
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_RATES: {
			return {
				...state,
				isLoading: true
			};
		}

		case FETCH_USER_RATES_SUCCESS:
			return {
				...state,
				userRates: action.payload.userRates,
				isLoading: false
			};

		case SAVE_USER_RATE_SUCCESS:
			return {
				...state,
				userRates: onSaveUserRate(state.userRates, action.payload.userRate)
			};

		case DELETE_USER_RATE_SUCCESS:
			return {
				...state,
				userRates: [...state.userRates].filter(
					rate => rate.id !== action.payload.rateId
				)
			};

		default:
			return state;
	}
};

const onSaveUserRate = (prevUserRates, newUserRate) => {
	const index = prevUserRates.findIndex(
		userRate => userRate.id === newUserRate.id
	);
	if (index !== -1) {
		prevUserRates.splice(index, 1);
	}
	return [...prevUserRates, newUserRate];
};
