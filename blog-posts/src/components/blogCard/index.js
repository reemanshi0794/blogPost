const BlogCard = ({ blog, onEditBlog, onReadMore, onDeleteBlog }) => {
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
};

export default BlogCard;
