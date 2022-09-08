import blogsData from "../../shared/blogsData";
const defaultState = {
  blogs: [...blogsData],
};
const blogsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_BLOG": {
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    }

    case "DELETE_BLOG": {
      const allBlogs = [...state.blogs];
      const index = allBlogs.findIndex((blog) => blog.id === action.payload);
      allBlogs.splice(index, 1);
      return {
        ...state,
        blogs: allBlogs,
      };
    }

    case "EDIT_BLOG_DATA": {
      const allBlogs = [...state.blogs];
      const index = allBlogs.findIndex((blog) => blog.id === action.payload.id);
      allBlogs.splice(index, 1, action.payload);
      return {
        ...state,
        blogs: allBlogs,
      };
    }

    default:
      return state;
  }
};
export default blogsReducer;
