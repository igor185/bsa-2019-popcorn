import React, { useState, useEffect } from 'react';
import './UserLists.scss';
import MovieListCreator from './MovieListCreator/MovieListCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	saveMovieList,
	fetchMovieListsPreview,
	deleteMovieList
} from './actions';
import Spinner from '../../shared/Spinner';
import CreateExtraBtn from '../../shared/CreateExtraBtn';
import MovieListPreviewItem from './MovieListPreviewItem/MovieListPreviewItem';

export interface INewMovieList {
	title: string;
	isPrivate: boolean;
	despription?: string;
	imageUrl?: string;
	moviesId: string[];
}

interface IProps {
	saveMovieList: (movieList: INewMovieList) => object;
	fetchMovieListsPreview: (userId: string) => object;
	deleteMovieList: (movieListId: string) => object;
	movieListsPreview?: IMovieListPreview[];
	isLoading: boolean;
	selectedUserId: string;
	isOwnData: boolean;
	selectedPreviewUserId?: string;
}

export interface IMovieListPreview {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	isPrivate: boolean;
	moviesId: string[];
	createdAt: Date;
}

const UserLists: React.FC<IProps> = ({
	saveMovieList,
	fetchMovieListsPreview,
	movieListsPreview,
	deleteMovieList,
	isLoading,
	selectedUserId,
	isOwnData,
	selectedPreviewUserId
}) => {
	const [showCreator, setShowCreator] = useState(false);

	if (!movieListsPreview || selectedPreviewUserId !== selectedUserId) {
		fetchMovieListsPreview(selectedUserId);
		return <Spinner />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	if (showCreator) {
		return (
			<MovieListCreator
				setShowCreator={setShowCreator}
				saveMovieList={saveMovieList}
			/>
		);
	}
	return (
		<div className="UserLists">
			{isOwnData && (
				<CreateExtraBtn
					handleClick={() => setShowCreator(true)}
					body={'Create movie list'}
				/>
			)}
			{movieListsPreview.length ? (
				<div className="movie-list-preview-container">
					{movieListsPreview.map(preview => (
						<MovieListPreviewItem
							key={preview.id}
							deleteMovieList={deleteMovieList}
							moviePreview={preview}
							isOwnData={isOwnData}
						/>
					))}
				</div>
			) : (
				<div className="movie-list-empty">No movie lists yet</div>
			)}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	movieListsPreview: rootState.movieList.movieListsPreview,
	isLoading: rootState.movieList.isLoading,
	selectedPreviewUserId: rootState.movieList.selectedPreviewUserId
});

const mapDispatchToProps = dispatch => {
	const actions = {
		saveMovieList,
		fetchMovieListsPreview,
		deleteMovieList
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserLists);
