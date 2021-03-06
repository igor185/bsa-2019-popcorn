import React from 'react';
import { NavLink } from 'react-router-dom';
import ChatListItem from './ChatListItem';
import SocketService from '../../../services/socket.service';
import {
	addMessage,
	deleteMessageStore,
	updateMessageStore,
	addUnreadMessage,
	readMessagesStore
} from '../ChatPage.redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { orderBy } from 'lodash';

interface IProps {
	chats: any;
	addMessage: (any) => void;
	deleteMessageStore: (chatId, messageId) => void;
	updateMessageStore: (chatId, message) => void;
	addUnreadMessage: (chatId) => void;
	readMessagesStore: (chatId: string, userId: string) => void;
	userId: string;
}
class ChatList extends React.Component<IProps> {
	componentDidMount() {
		const { chats } = this.props;
		if (Object.keys(chats).length > 0) {
			Object.keys(chats).forEach(SocketService.join);

			SocketService.on('new-message', message => {
				if (!message.chat) {
					return;
				}
				const chatId = message.chat.id;
				this.props.addMessage(message);
				if (message.user.id !== this.props.userId) {
					this.props.addUnreadMessage(chatId);
				}
			});
			SocketService.on('delete-message', ({ chatId, messageId }) =>
				this.props.deleteMessageStore(chatId, messageId)
			);
			SocketService.on('update-message', ({ chatId, message }) =>
				this.props.updateMessageStore(chatId, message)
			);
			SocketService.on('read-chat', ({ chatId, userId }) => {
				this.props.readMessagesStore(chatId, userId);
			});
		}
	}

	sortChats = chats => orderBy(chats, ['lastMessage.created_at'], ['desc']);

	render() {
		const chats = this.sortChats(this.props.chats);
		return (
			<div>
				{Object.keys(chats).map(key => (
					<NavLink to={`/chat/${chats[key].id}`} key={chats[key].id}>
						<ChatListItem
							chat={chats[key]}
							unreadMessagesCount={chats[key].unreadMessagesCount}
						/>
					</NavLink>
				))}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	addMessage,
	deleteMessageStore,
	updateMessageStore,
	addUnreadMessage,
	readMessagesStore
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatList);
