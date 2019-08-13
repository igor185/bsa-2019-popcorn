import React from 'react';
import Post from '../Post/Post';
import './PostList.scss';

type post = {
	user: {
		name: string;
		avatar: string;
		any;
	};
	created_At?: string;
	image_url: string;
	description?: string;
	content?: {
		image: string;
		link: string;
		description: string;
	};
	comments?: {
		id: string;
		author: string;
		commentDate: string;
		commentBody: string;
	}[];
	tags?: {
		id: string;
		tagName: string;
	}[];
};
interface IProps {
	posts: Array<post>;
}

const PostList = (props: IProps) => {
	return (
		<div className="feed-list">
			<div className="feed-heading">News feed</div>
			{props.posts.map(post => (
				<Post post={post} />
			))}
		</div>
	);
};

export default PostList;