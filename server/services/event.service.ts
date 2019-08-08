import { Event, EventComment, EventVisitor } from '../models/Events';
import {
  Event as EventEntity,
  EventComment as CommentEntity,
  EventVisitor as VisitorEntity
} from '../entities/Events';

import EventRepository from '../repository/event.repository';
import { getRepository, getCustomRepository } from "typeorm";

export const getEvents = async (): Promise<Event[]> =>
  await getCustomRepository(EventRepository).find();

export const getEventById = async (eventId: number): Promise<Event> =>
  await getCustomRepository(EventRepository).getEvent(eventId);

export const createEvent = async (event: Event): Promise<Event[]> =>
  await getCustomRepository(EventRepository).save([event])

export const updateEvent = async (updatedEvent: Event): Promise<Event[]> => {
  let event = await getCustomRepository(EventRepository).findOne(updatedEvent.id);
  event = { ...event, ...updatedEvent, };
  return await getCustomRepository(EventRepository).save([event])
}

export const deleteEventById = async (eventId: number): Promise<Event> => {
  const event = await getCustomRepository(EventRepository).findOne(eventId);
  return await getCustomRepository(EventRepository).remove(event);
}

//comments

export const getCommentsByEventId = async (eventId: string): Promise<EventComment[]> =>
  await getRepository(CommentEntity).find({ eventId });

export const createComment = async (comment: EventComment): Promise<EventComment[]> =>
  await getRepository(CommentEntity).save([comment]);

export const updateComment = async (updatedComment: Event): Promise<EventComment[]> => {
  let comment = await getRepository(CommentEntity).findOne(updatedComment.id);
  comment = { ...comment, ...updatedComment, };
  return await getRepository(CommentEntity).save([comment])
}

export const deleteCommentById = async (commentId: number): Promise<EventComment> => {
  const comment = await getRepository(CommentEntity).findOne(commentId);
  return await getRepository(CommentEntity).remove(comment);
}

//visitors

export const getVisitorsByEventId = async (eventId: string): Promise<EventVisitor[]> =>
  await getRepository(VisitorEntity).find({ eventId });

export const createVisitor = async (visitor: EventVisitor): Promise<EventVisitor[]> =>
  await getRepository(VisitorEntity).save([visitor]);

export const updateVisitor = async (updatedVisitor: EventVisitor): Promise<EventVisitor[]> => {
  let visitor = await getRepository(VisitorEntity).findOne(updatedVisitor.id);
  visitor = { ...visitor, status: updatedVisitor.status };
  return await getRepository(VisitorEntity).save([visitor])
}
export const deleteVisitorById = async (visitorId: number): Promise<EventVisitor> => {
  const visitor = await getRepository(VisitorEntity).findOne(visitorId);
  return await getRepository(VisitorEntity).remove(visitor);
}