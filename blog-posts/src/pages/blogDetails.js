import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogDetails = () => {
  const blogDetails = useSelector((state) => state.blogsReducer.blogs);
  const { id } = useParams();
  const blogData = blogDetails.find((blogData) => blogData.id === id);
  const tags = Array.from(new Set(blogData.tags));
  return (
    <div>
      <div class="blog-single gray-bg">
        <div class="container">
          <div class="row align-items-start">
            <div class="col-lg-12 m-15px-tb">
              <article class="article">
                <div className="d-flex align-items-start justify-content-between mb-4">
                  <div class="article-img blog-info-img d-flex flex-column">
                    <img
                      className={"article-image"}
                      src={blogData.image}
                      title=""
                      alt=""
                    />
                  </div>
                  <div class="article-title blog-info-title">
                    <h2>{blogData.title}</h2>
                    <div class="media">
                      <div class="avatar">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          title=""
                          alt=""
                        />
                      </div>
                      <div class="media-body">
                        <label>{blogData.author}</label>
                        <span>{blogData.date}</span>
                      </div>
                    </div>
                  </div>

                  <div class="nav tag-cloud">
                    {tags?.length > 0 &&
                      tags.map((tag) => {
                        return <a href="#">{tag}</a>;
                      })}
                  </div>
                </div>

                <div class="article-content">
                  <p
                    class="text-muted mt-2"
                    dangerouslySetInnerHTML={{ __html: blogData.content }}
                  ></p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetails;
