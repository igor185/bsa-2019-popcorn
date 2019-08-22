import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './TopItem.scss';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';
import TopConstructor from './TopConstructor/TopConstructor';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITopItem } from '../UserTops.service';

interface ITopItemProps {
	topItem: ITopItem;
	isOwnTop: boolean;
	deleteTop: (topItem: ITopItem) => void;
	saveUserTop: (topItem: ITopItem) => void;
	uploadImage: (data: any, titleId: string) => void;
	uploadUrl: string;
	urlForTop: string;
	history?: {
		push: (path: string) => any;
	};
}

const TopItem: React.FC<ITopItemProps> = ({
	saveUserTop,
	topItem,
	isOwnTop,
	deleteTop,
	uploadImage,
	uploadUrl,
	urlForTop,
	history
}) => {
	const [editTop, canEditTop] = useState(topItem.isNewTop || false);
	const [title, setTitle] = useState(topItem.title);
	// const [isOwnTop] = useState(topItem.isOwnTop);
	// const [topImageUrl, setTopImageUrl] = useState(topItem.topImageUrl);
	// const [isOwnTop] = useState(topItem.isOwnTop);
	const [topImageUrl, setTopImageUrl] = useState(topItem.topImageUrl);
	useEffect(() => {
		if (urlForTop == topItem.id) {
			setTopImageUrl(uploadUrl);
			saveUserTop({ ...topItem, title, topImageUrl });
		}
	}, [uploadUrl]);

	function toogleEdit() {
		canEditTop(!editTop);
	}

	function saveTop(movies: Array<any>) {
		const moviesList = movies.filter(movie => movie.title.trim() !== '');
		if (title.trim() === '') setTitle('New top');
		saveUserTop({ ...topItem, moviesList, title, topImageUrl });
		canEditTop(false);
	}

	function handleUploadFile(e, topId: string) {
		const data = new FormData();
		data.append('file', e.target.files[0]);
		if (uploadImage) uploadImage(data, topId);
		else console.log('no uploadImage method');
	}

	function goToTop(e) {
		if (editTop || (
			e.target.classList.contains('edit-top') ||
			e.target.classList.contains('delete-top') ||
			e.target.classList.contains('close-icon')
		)) {
			e.preventDefault();
		}
	}

	return (
		<NavLink
			to={`/top-page/${topItem.id}`}
			onClick={goToTop}
			className="link-reset"
		>
			<div className="top-item">
				{editTop || topItem.moviesList.length === 0 ? (
					<input
						maxLength={140}
						placeholder="Top name"
						className="top-title-input"
						onChange={e => setTitle(e.target.value)}
						value={title}
					/>
				) : (
						<div className="top-item-title">{title}</div>
					)}
				<input
					name="image"
					type="file"
					onChange={e => handleUploadFile(e, topItem.id)}
					id={`${topItem.id}image`}
					accept=".jpg, .jpeg, .png"
					hidden
				/>
				{editTop && (
					<label
						htmlFor={`${topItem.id}image`}
						className="top-upload-image hover"
					>
						<FontAwesomeIcon icon={faImage} className="fontAwesomeIcon" />
					</label>
				)}
				{isOwnTop && (
					<div className="edit-top hover" onClick={toogleEdit}>
						Edit
					</div>
				)}
				{isOwnTop && (
					<div className="delete-top hover" onClick={() => deleteTop(topItem)}>
						<CloseIcon className="close-icon" />
					</div>
				)}
				<img className="image-top" src={topImageUrl} alt="" />
			</div>
			{(editTop || topItem.moviesList.length === 0) && (
				<TopConstructor moviesList={topItem.moviesList} saveTop={saveTop} />
			)}
		</NavLink>
	);
};

export default TopItem;
