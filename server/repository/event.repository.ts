import { EntityRepository, Repository, getRepository } from "typeorm";
import { Event, EventVisitor } from "../entities/Events";

@EntityRepository(Event)
class EventRepository extends Repository<Event> {
  async getAllEvents(): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventComments", "comments")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .leftJoin("comments.user", "cuser")
      .addSelect(["cuser.name", "cuser.avatar", "cuser.id"])
      .leftJoin("visitors.user", "user")
      .addSelect(["user.name", "user.avatar", "user.id"])
      .orderBy("start_date", "DESC")
      .getMany();
  }

  async getRandomEvent(): Promise<Event> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventComments", "comments")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .leftJoin("comments.user", "cuser")
      .addSelect(["cuser.name", "cuser.avatar", "cuser.id"])
      .leftJoin("visitors.user", "user")
      .addSelect(["user.name", "user.avatar", "user.id"])
      .orderBy("RANDOM()")
      .getOne();
  }

  async getEvent(eventId: string): Promise<Event> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventComments", "comments")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .leftJoin("comments.user", "cuser")
      .addSelect(["cuser.name", "cuser.avatar", "cuser.id"])
      .leftJoin("visitors.user", "user")
      .addSelect(["user.name", "user.avatar", "user.id"])
      .where("event.id = :id", { id: eventId })
      .getOne();
  }
  async getEventByTitle(title: string): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")
      .leftJoinAndSelect("event.eventComments", "comments")
      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .leftJoin("comments.user", "cuser")
      .addSelect(["cuser.name", "cuser.avatar", "cuser.id"])
      .leftJoin("visitors.user", "user")
      .addSelect(["user.name", "user.avatar", "user.id"])
      .where("LOWER(event.title) LIKE :title", {
        title: "%" + title.toLowerCase() + "%"
      })
      .getMany();
  }

  async getEventsByVisitorId(userId: string): Promise<EventVisitor[]> {
    return await getRepository(EventVisitor)
      .createQueryBuilder("event_visitor")
      .leftJoinAndSelect("event_visitor.event", "event")
      .leftJoinAndSelect("event.eventVisitors", "eventVisitors")
      .where("event_visitor.userId = :id", { id: userId })
      .getMany();
  }

  async getEvents(userId: string): Promise<Event[]> {
    return await getRepository(Event)
      .createQueryBuilder("event")

      .leftJoinAndSelect("event.eventVisitors", "visitors")
      .where("event.userId = :id", { id: userId })
      .getMany();
  }
}

export default EventRepository;
