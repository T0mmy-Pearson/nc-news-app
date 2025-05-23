import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-api-g9yq.onrender.com/api",
});

export const fetchArticles = (topic, sort_by, order) => {
  const params = {};
  if (topic) params.topic = topic;
  if (sort_by) params.sort_by = sort_by;
  if (order) params.order = order;

  return api.get("/articles", { params });
};
export const fetchArticleById = (article_id) =>
  api.get(`/articles/${article_id}`);

export const fetchTopics = () => api.get("/topics");

export const fetchComments = (article_id) =>
  api.get(`/articles/${article_id}/comments`);

export const postComment = (article_id, comment) =>
  api.post(`/articles/${article_id}/comments`, comment);

export const patchArticleVotes = (article_id, inc_votes) =>
  api.patch(`/articles/${article_id}`, { inc_votes });

export const deleteComment = (comment_id) =>
  api.delete(`/comments/${comment_id}`);

export default api;