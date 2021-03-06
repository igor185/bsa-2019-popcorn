import { getSurveysByTitle } from "./surveys.service";
import { getEventByTitle } from "./event.service";
import { getTopByTitle } from "./top.service";
import { getByTitle } from "./movie.service";
import { getUserByName } from "./user.service";

export const contentSearch = async ({
  title,
  type
}: {
  title: string;
  type: string;
}) => {
  switch (type) {
    case "all":
      return await contentAll(title);
    case "movie":
      return await contentMovie(title);
    case "top":
      return await contentTop(title);
    case "event":
      return await contentEvent(title);
    case "survey":
      return await contentSurvey(title);
    case "user":
      return await contentUser(title);
    default:
      throw new Error("Bad request");
  }
};

const contentAll = async (title: string) => {
  return [
    await contentMovie(title, false),
    await contentTop(title, false),
    await contentEvent(title, false),
    await contentSurvey(title, false),
    await contentUser(title, false)
  ];
};
const contentMovie = async (title: string, wrap = true) => {
  const movie = await getByTitle(title);

  return wrap
    ? [{ data: movie, type: "movie" }]
    : {
        data: movie,
        type: "movie"
      };
};
const contentTop = async (title: string, wrap = true) => {
  const top = await getTopByTitle(title);

  return wrap
    ? [{ data: top, type: "top" }]
    : {
        data: top,
        type: "top"
      };
};
const contentEvent = async (title: string, wrap = true) => {
  const event = await getEventByTitle(title);

  return wrap
    ? [{ data: event, type: "event" }]
    : {
        data: event,
        type: "event"
      };
};
const contentSurvey = async (title: string, wrap = true) => {
  const survey = await getSurveysByTitle(title);

  return wrap
    ? [{ data: survey, type: "survey" }]
    : {
        data: survey,
        type: "survey"
      };
};
const contentUser = async (title: string, wrap = true) => {
  const users = await getUserByName(title);

  return wrap
    ? [{ data: users, type: "user" }]
    : {
        data: users,
        type: "user"
      };
};
