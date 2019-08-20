import React, { useEffect, useState } from 'react';
import './TopConstructor.scss';
import DragDrop from './DragDrop';
import { IMovie } from '../TopItem';
import { uniqueId } from 'lodash';
const emptyInput = () => {
	return { title: '', id: uniqueId('movie'), comment: '' };
};

const reorder = (list, startIndex, endIndex): any => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

interface ITopConstructorProps {
	moviesList: IMovie[];
	saveTop: (movies: IMovie[]) => void;
}

const TopConstructor: React.FC<ITopConstructorProps> = ({
	saveTop,
	moviesList
}) => {
	const [movies, setMovies] = useState([...moviesList, emptyInput()]);

	function onDragEnd(result) {
		if (!result.destination) {
			return;
		}
		const updatedItems = reorder(
			movies,
			result.source.index,
			result.destination.index
		);
		setMovies(updatedItems);
	}

	function deleteFilmInput(movieId: string) {
		const updatedMovies = movies.filter(movie => movie.id !== movieId);
		setMovies(updatedMovies);
	}

	function saveMovie(updatedMovie: IMovie, newId: string = updatedMovie.id) {
		let updatedMovies = movies.map(movie =>
			movie.id === updatedMovie.id ? { ...updatedMovie, id: newId } : movie
		);
		if (updatedMovie.id === movies[movies.length - 1].id) {
			updatedMovies.push(emptyInput());
		}
		setMovies(updatedMovies);
	}
	function save() {
		saveTop(movies);
	}
	return (
		<div className="top-constructor">
			<DragDrop
				deleteFilmInput={deleteFilmInput}
				moviesList={movies}
				onDragEnd={onDragEnd}
				saveMovie={saveMovie}
			/>
			<div className="top-buttons-container">
				<div className="top-buttons save-top-button hover" onClick={save}>
					Save
				</div>
			</div>
		</div>
	);
};

export default TopConstructor;
