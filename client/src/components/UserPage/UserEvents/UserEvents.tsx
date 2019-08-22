import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner/index';
import { getUserEvents, saveEvent, deleteEvent, updateEvent } from './actions';

import {
	IEventFormatDataBase,
	IEventFormatClient,
	formatToClient
} from './UserEvents.service';
import EventItem from './EventItem/EventItem';
import './UserEvents.scss';
import UserEventsEditor from './UserEventsEditor/UserEventsEditor';
import { NavLink } from 'react-router-dom';

interface IProps {
	userEvents: IEventFormatDataBase[];
	getUserEvents: (id: string) => any;
	deleteEvent: (id: string, currentUserId: string) => any;
	currentUserId: string;
	currentUserRole: string;
	saveEvent: (event: any) => void;
	updateEvent: (event: any) => void;
	currentProfileUserId: string;
}

interface IState {
	openEventEditor: boolean;
	mainButtonMessage: string;
	editableEvent: null | IEventFormatClient;
}

const CREATE_EVENT_TEXT = 'Create Event';
const BACK_TO_EVENTS_TEXT = 'Back to event';

class UserEvents extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			openEventEditor: false,
			mainButtonMessage: 'Create Event',
			editableEvent: null
		};
	}

	componentDidMount() {
		const { currentUserId } = this.props;
		this.props.getUserEvents(currentUserId);
	}

	editEvent = (editableEvent: null | IEventFormatClient = null) => {
		const openEventEditor = !this.state.openEventEditor;
		this.setState({ ...this.state, editableEvent, openEventEditor });
	};

	saveOrEditEvent = (event: IEventFormatClient) => {
		const editableEvent = this.state.editableEvent;
		if (editableEvent) {
			this.props.updateEvent(event);
		} else {
			this.props.saveEvent(event);
		}
	};

	isOwnEvent = event => {
		const { userId } = event;
		return (
			this.props.currentUserId === userId ||
			this.props.currentUserRole === 'admin'
		);
	};

	renderEventList = (eventList: IEventFormatClient[], deleteEventAction: any) =>
		eventList.map(event => (
			<NavLink
				to={`/event-page/${event.id}`}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<EventItem
					event={event}
					key={event.id}
					deleteEvent={deleteEventAction}
					editEvent={this.editEvent}
					isOwnEvent={this.isOwnEvent(event)}
				/>
			</NavLink>
		));

	render() {
		const {
			userEvents,
			currentUserId,
			deleteEvent,
			currentProfileUserId
		} = this.props;
		const { openEventEditor, editableEvent } = this.state;
		if (!userEvents) {
			return <Spinner />;
		}

		const ownEvents: IEventFormatClient[] = [];
		const subscribeEvents: IEventFormatClient[] = [];

		userEvents.forEach(event => {
			event.userId === currentUserId
				? ownEvents.push(formatToClient(event))
				: subscribeEvents.push(formatToClient(event));
		});
		return (
			<div className="user-events">
				{/* {currentProfileUserId === currentUserId ? ( */}
				<div
					className="create-event-button hover"
					onClick={() => this.editEvent()}
				>
					{openEventEditor ? BACK_TO_EVENTS_TEXT : CREATE_EVENT_TEXT}{' '}
				</div>
				{/* // ) : null} */}
				{openEventEditor ? (
					<UserEventsEditor
						closeEditor={this.editEvent}
						event={editableEvent}
						saveEvent={this.saveOrEditEvent}
						id={currentUserId}
					/>
				) : (
					<div>
						<div className="events-title">
							<span>Your Events</span>
						</div>
						<div className="event-list-container">
							{ownEvents.length === 0 ? (
								<div className="event-show-warning">
									No events yet. You can create
								</div>
							) : (
								this.renderEventList(ownEvents, deleteEvent)
							)}
						</div>
						<div className="events-title">
							<span>Events interested you</span>
						</div>
						<div className="event-list-container">
							{subscribeEvents.length === 0 ? (
								<div className="event-show-warning">No events yet</div>
							) : (
								this.renderEventList(subscribeEvents, null)
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		...props,
		currentUserId: state.profile.profileInfo.id,
		currentProfileUserId:
			state.profile.selectedProfileInfo && state.profile.selectedProfileInfo.id,
		currentUserRole: state.profile.profileInfo.role,
		userEvents: state.events.userEvents
	};
};

const mapDispatchToProps = dispatch => {
	const actions = {
		getUserEvents,
		saveEvent,
		deleteEvent,
		updateEvent
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserEvents);
