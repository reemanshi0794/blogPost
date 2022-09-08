import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BlogModal from "../shared/modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, addBlog, editBlogData } from "../redux/blogs/action";
import Notification from "../shared/notificationContainer";
import Tags from "../shared/tags";
import Header from "../shared/header";
import BlogCard from "../components/blogCard";

let timer = null;
const Home = () => {
  const dispatch = useDispatch();
  const searchTextRef = useRef("");
  const blogsData = useSelector((state) => state.blogsReducer.blogs);

  let navigate = useNavigate();
  const [isOpen, setModal] = useState(false);
  const [editBlog, setEditBlog] = useState({});
  const [filteredData, setFilteredData] = useState(blogsData);
  const [searchText, setSearchText] = useState("");
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
    setSearchText(e.target.value);
    setSelectedTag(null);
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
    setSearchText("");
    const data = blogsData.filter((item) =>
      item.content.toLowerCase().includes(tag.toLowerCase())
    );
    const filteredData = data.map((d) => {
      const blogIndex = d.content.indexOf(tag);
      return {
        ...d,
        content: d.content.slice(
          blogIndex - 50 > 0 ? blogIndex - 50 : 0,
          blogIndex + 50
        ),
      };
    });
    setFilteredData(filteredData);
  };

  const tags = useMemo(() => {
    let finalArray = [];
    blogsData.forEach(({ tags }) => {
      finalArray.push(...tags);
    });
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
          <Header
            timer={timer}
            searchText={searchText}
            handleSearch={handleSearch}
            setSearchText={setSearchText}
            setFilteredData={setFilteredData}
            openModal={openModal}
          />
        </div>
        <Tags
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={onSelectTag}
          removeFilter={removeFilter}
        />
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
              <BlogCard
                blog={blog}
                onEditBlog={onEditBlog}
                onReadMore={onReadMore}
                onDeleteBlog={onDeleteBlog}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Home;
