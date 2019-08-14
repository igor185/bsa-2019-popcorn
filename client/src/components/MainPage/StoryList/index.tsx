import StoryList from './story-list/story-list';
import {
	changeActivity,
	createStory,
	createVoting,
	fetchStories,
	saveImage,
	setCaption
} from './story.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GetAddStoryPopupContent from './story-modal/create-story';
import ChooseExtra from './story-modal/choose-extra';
import ChooseExtraOption from './story-modal/choose-extra-option';
import INewStory from './INewStory';
import CreateVote from './story-modal/create-vote';
import IVoting from './IVoting';

interface IStoryListItem {
	caption: string;
	image_url: string;
	user: {
		avatar: string;
		id: string;
		name: string;
		any;
	};
	type: string;
	voting?: {
		backColor: string;
		backImage: string;
		deltaPositionHeadX: number;
		deltaPositionHeadY: number;
		deltaPositionOptionBlockX: number;
		deltaPositionOptionBlockY: number;
		header: string;
		id: string;
		options: Array<{
			text: string;
			voted: number;
		}>;
	};
}

interface IProps {
	scrollStep: number;
	stories: null | Array<IStoryListItem>;
	fetchStories: () => any;
	avatar: null | string;
	newStory: INewStory;
	setCaption: (caption: string) => any;
	top: { id: string; name: string; any };
	survey: { id: string; name: string; any };
	saveImage: (url: string) => any;
	changeActivity: (
		type: string,
		activity: { id: string; name: string } | null
	) => any;
	createStory: (newStory: INewStory, userId: string) => any;
	userId: string;
	createVoting: (voting: IVoting) => any;
}

const mock = {
	tops: [
		{ id: '1', name: 'Top 1' },
		{ id: '2', name: 'Top 2' },
		{ id: '3', name: 'Top 3' }
	],
	surveys: [
		{ id: '1', name: 'Surveys 1' },
		{ id: '2', name: 'Surveys 2' },
		{ id: '3', name: 'Surveys 3' }
	]
};

const ListBlock = ({ ...props }: IProps) => {
	return (
		<div>
			<StoryList {...props} />
			<Switch>
				<Route
					exact
					path={`/create`}
					component={({ history }) => (
						<GetAddStoryPopupContent
							history={history}
							newStory={props.newStory}
							setCaption={props.setCaption}
							saveImage={props.saveImage}
							changeActivity={props.changeActivity}
							createStory={props.createStory}
							userId={props.userId}
						/>
					)}
				/>
				<Route exact path={`/create/extra`} component={ChooseExtra} />
				<Route
					path={`/create/extra/vote`}
					component={() => (
						<CreateVote
							createVoting={props.createVoting}
							userId={props.userId}
						/>
					)}
				/>
				<Route
					path={`/create/extra/:option`}
					component={anotherProps => (
						<ChooseExtraOption
							{...anotherProps}
							top={props.top}
							survey={props.survey}
							changeActivity={props.changeActivity}
							option={props.newStory.activity}
						/>
					)}
				/>
			</Switch>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	stories: rootState.story.stories,
	avatar: rootState.profile.profileInfo && rootState.profile.profileInfo.avatar,
	userId: rootState.profile.profileInfo && rootState.profile.profileInfo.id,
	newStory: rootState.story.newStory,
	top: mock.tops,
	survey: mock.surveys
});

const actions = {
	fetchStories,
	setCaption,
	saveImage,
	changeActivity,
	createStory,
	createVoting
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListBlock);
