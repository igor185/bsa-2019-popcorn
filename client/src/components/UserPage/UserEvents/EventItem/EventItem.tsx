import React from 'react';
import { IEventFormatClient } from '../UserEvents.service';
import './EventItem.scss';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';

interface IProps {
	event: IEventFormatClient;
	deleteEvent?: null | ((id: string, currentUserId: string) => any);
	editEvent?: null | ((event: IEventFormatClient) => any);
	isOwnEvent: boolean;
}

const EventItem: React.FC<IProps> = ({
	event,
	deleteEvent,
	editEvent,
	isOwnEvent
}) => {
	const {
		id,
		userId: currentUserId,
		title,
		description,
		image,
		dateRange,
		eventVisitors
	} = event;

	return (
		<NavLink
			to={`/events/${event.id}`}
			style={{ textDecoration: 'none', color: 'inherit' }}
		>
			<div className="event-item hover">
				<div className="event-wrapper">
					<div className="event-left">
						<div className="event-image-wrapper">
							<Image
								src={image}
								defaultSrc={config.DEFAULT_EVENT_IMAGE}
								alt="events-image"
							/>
						</div>
					</div>
					<div className="event-right">
						<div className="event-main-information">
							<div className="event-title">{title}</div>
							<div className="event-description">{description}</div>
							{/* <div className="event-location">
							<FontAwesomeIcon
								className="icon-location"
								icon={faMapMarkerAlt}
							/>
							<span>Kyiv. Ukraine (mock)</span>
						</div> */}
							{/* <div className="event-movie">
							<FontAwesomeIcon className="icon-movie" icon={faVideo} />
							The Mountain (2019) (mock)
						</div> */}
							<div className="event-users">
								<FontAwesomeIcon className="icon-users" icon={faUsers} />
								{eventVisitors.length} users subscribe
							</div>
						</div>
						<div className="event-date-buttons">
							<div className="event-date-range">
								<Moment format=" D MMM HH:mm " local>
									{String(dateRange.startDate)}
								</Moment>
								{dateRange.endDate && (
									<span>
										{' '}
										-
										<Moment format=" D MMM HH:mm " local>
											{String(dateRange.endDate)}
										</Moment>
									</span>
								)}
							</div>
							{isOwnEvent &&
								(deleteEvent && editEvent && (
									<div className="event-buttons">
										<button
											className="edit-button"
											onClick={e => {
												e.preventDefault();
												editEvent(event);
											}}
										>
											Edit
										</button>
										<button
											className="delete-button"
											onClick={e => {
												e.preventDefault();
												deleteEvent(id, currentUserId);
											}}
										>
											Delete
										</button>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default EventItem;
