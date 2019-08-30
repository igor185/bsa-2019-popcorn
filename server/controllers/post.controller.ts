import { Request, Router } from "express";
import * as postService from "../services/post.service";
import { Post } from "../models/PostModel";

const router = Router();

router
  .get("/", (req, res, next) =>
    postService
      .getPosts()
      .then((posts: any[]) => res.send(posts))
      .catch(next)
  )
  .get("/:id", (req, res, next) =>
    postService
      .getPostById(req.params.id)
      .then((post: Post) => res.send(post))
      .catch(next)
  )
  .get("/user/:id", (req, res, next) =>
    postService
      .getPostsByUserId(req.params.id)
      .then((posts: Post[]) => res.send(posts))
      .catch(next)
  )
  .post("/", (req, res, next) =>
    postService
      .createPost(req.body)
      .then(response => res.send(response))
      .catch(next)
  )
  .delete("/:id", (req, res, next) =>
    postService
      .deletePostById(req.params.id)
      .then((response: Post) => res.send(response))
      .catch(next)
  )
  .post("/comment", (req: Request & { io: any }, res, next) => {
    postService
      .createComment(req.body)
      .then(comment => {
        req.io.emit("new-comment", { comment });
        res.send();
      })
      .catch(next);
  })
  .post("/reaction", (req: Request & { io: any }, res, next) => {
    postService
      .createReaction(req.body)
      .then(reaction => {
        req.io.emit("new-reaction", reaction);
        res.send();
      })
      .catch(next);
  });

export default router;
