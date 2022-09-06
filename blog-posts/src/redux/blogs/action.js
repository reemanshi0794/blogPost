export const deleteBlog = (id) => {
  return {
    type: "DELETE_BLOG",
    payload: id,
  };
};
export const addBlog = (details) => {
  return {
    type: "ADD_BLOG",
    payload: details,
  };
};
export const editBlogData = (details) => {
  return {
    type: "EDIT_BLOG_DATA",
    payload: details,
  };
};
