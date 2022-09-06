import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
// import blogsData from "../shared/blogsData";
import { useNavigate } from "react-router-dom";
import BlogModal from "../shared/modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, addBlog, editBlogData } from "../redux/blogs/action";
import Notification from "../shared/notificationContainer";

let timer = null;
const Home = (props) => {
  const dispatch = useDispatch();
  const searchTextRef = useRef("");
  const blogsData = useSelector((state) => state.blogsReducer.blogs);

  let navigate = useNavigate();
  const [isOpen, setModal] = useState(false);
  const [editBlog, setEditBlog] = useState({});
  const [filteredData, setFilteredData] = useState(blogsData);
  const [searchText, setSearchText] = useState("");
  const [allTags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (searchText !== "") {
      const data = blogsData.filter((item) =>
        item.title.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setFilteredData(data);
    } else {
      setFilteredData(blogsData);
    }
  }, [blogsData]);

  const onDeleteBlog = (id) => {
    dispatch(deleteBlog(id));
    Notification(200, "Blog deleted successfully");
  };

  const onEditBlog = (id) => {
    setModal(true);
    const blog = blogsData.find((blog) => blog.id === id);
    setEditBlog(blog);
  };

  const onReadMore = (id) => {
    navigate(`./blog/${id}`);
  };
  const openModal = () => {
    setModal(true);
  };
  const addBlogData = (details) => {
    if (Object.keys(editBlog).length > 0) {
      dispatch(editBlogData(details));
      setModal(false);
      Notification(200, "Blog details updated successfully");
    } else {
      details.id = blogsData.length;
      dispatch(addBlog(details));
      setModal(false);
      Notification(200, "Blog added successfully");
    }
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(e.target.value);
    searchTextRef.current = e.target.value;
    if (e.target.value === "") {
      setFilteredData(blogsData);
      clearTimeout(timer);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const data = blogsData.filter((item) =>
          item.title
            .toLowerCase()
            .startsWith(searchTextRef.current.toLowerCase())
        );
        setFilteredData(data);
      }, 2000);
    }
  };

  const onSelectTag = (tag) => {
    setSelectedTag(tag);
    const data = blogsData.filter((item) =>
      item.content.toLowerCase().includes(tag.toLowerCase())
    );
    setFilteredData(data);
  };

  const removeHighlight = () => {};

  const tags = useMemo(() => {
    let finalArray = [];
    blogsData.forEach(({ tags }) => {
      finalArray.push(...tags);
    });
    // blogsData.map(({ tags })=> ...tags )
    const unique = Array.from(new Set(finalArray));
    return unique;
  }, [blogsData]);

  const removeFilter = () => {
    setSelectedTag(null);
    setFilteredData(blogsData);
  };
  return (
    <div class="container mt-100 mt-60">
      <div class="row">
        <div class="col-12 text-center">
          <div class="section-title pb-2 d-flex justify-content-between align-items-center">
            <h4 class="title mb-4">Latest Blogs</h4>

            <div className="search-bar">
              <input
                placeholder="Enter Blog Title"
                value={searchText}
                onChange={(e) => handleSearch(e)}
              />
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setSearchText("");
                  setFilteredData(blogsData);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <button
              onClick={() => openModal()}
              type="button"
              class="btn btn-info add-new"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i class="fa fa-plus"></i> Add New
            </button>
          </div>
          <div>
            {tags.map((tag) => {
              return (
                <span
                  className={tag === selectedTag ? "selected-chip" : "chip"}
                  onClick={() => onSelectTag(tag)}
                >
                  {tag}
                  {/* <span
                      onClick={() => removeHighlight()}
                      className="cross-icon"
                    >
                      X
                    </span> */}
                </span>
              );
            })}
          </div>
        </div>
        {!!tags.length && (
          <button
            onClick={removeFilter}
            type="button"
            class="btn btn-info add-new remove-filter"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <i class="material-icons">&#xE872;</i> Remove All Filters
          </button>
        )}
      </div>
      {isOpen && (
        <BlogModal
          onClose={() => {
            setEditBlog({});
            setModal(false);
          }}
          addBlogData={addBlogData}
          editBlog={editBlog}
          setEditBlog={setEditBlog}
        />
      )}

      <div class="row">
        {filteredData.length <= 0 && (
          <div className="no-blogs">No blogs found</div>
        )}
        {filteredData.length > 0 &&
          filteredData.map((blog, index) => {
            return (
              <div class="col-lg-4 col-md-6 mt-4 pt-2">
                <div class="blog-post rounded border">
                  <div class="blog-img d-block overflow-hidden position-relative">
                    <img
                      src={
                        blog.image ||
                        "https://drivestats.io/blog/wp-content/uploads/2021/10/default-blog-thumb.png"
                      }
                      class="img-fluid rounded-top blog-img"
                      alt=""
                    />
                    <div class="overlay rounded-top bg-dark"></div>
                    <div className="position-absolute blog-edit-icons d-flex justify-content-between align-items-center">
                      <a
                        onClick={() => onEditBlog(blog.id)}
                        class="edit"
                        title="Edit"
                        data-toggle="tooltip"
                      >
                        <i class="material-icons">&#xE254;</i>
                      </a>
                      <a
                        onClick={() => onDeleteBlog(blog.id)}
                        class="delete"
                        title="Delete"
                        data-toggle="tooltip"
                      >
                        <i class="material-icons">&#xE872;</i>
                      </a>
                    </div>
                    <div onClick={() => onReadMore(blog.id)} class="post-meta">
                      <a class="text-light read-more">
                        Read More <i class="mdi mdi-chevron-right"></i>
                      </a>
                    </div>
                  </div>
                  <div class="content p-3">
                    <small class="text-muted p float-right">{blog.date}</small>
                    <small>
                      <a class="text-primary">Marketing</a>
                    </small>
                    <h4 class="mt-2">
                      <a class="text-dark title">{blog.title}</a>
                    </h4>
                    <p
                      class="text-muted mt-2"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></p>
                    <div class="pt-3 mt-3 border-top d-flex">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        class="img-fluid avatar avatar-ex-sm rounded-pill mr-3 shadow"
                        alt=""
                      />
                      <div class="author mt-2">
                        <h6 class="mb-0">
                          <a class="text-dark name">{blog.author}</a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Home;
