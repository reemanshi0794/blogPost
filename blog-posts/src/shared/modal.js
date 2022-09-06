import React, { useEffect, useState } from "react";
import { BlogDetails } from "../pages";
// import { Modal } from "reactstrap";
import { Editor, EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import ContentEditor from "../pages/contentEditor";
export const Modal = (props) => {
  const { editBlog, setEditBlog } = props;

  const [blogDetails, setModalDetails] = useState(editBlog || {});

  useEffect(() => {
    if (Object.keys(editBlog).length > 0) {
      const blocksFromHtml = htmlToDraft(editBlog.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(contentBlocks, entityMap)
        )
      );
    }
  }, [Object.keys(editBlog).length > 0]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const styles = {
    editor: {
      border: "1px solid gray",
      minHeight: "6em",
    },
  };
  const getBlogContent = () => {
    const blogContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    const highlighted = blogContent.split("<strong>");
    const selectedWords = highlighted.map((item) => {
      if (item.includes("</strong>")) {
        return item.split("</strong>")[0].trim();
      } else {
        return null;
      }
    });
    const words = selectedWords.filter((word) => word !== null);
    return {
      highlightedWords: words,
      blogContent,
    };
  };
  const handleChange = (value, type) => {
    if (type === "content") {
      setEditorState(value);
    } else {
      setModalDetails({ ...blogDetails, [type]: value });
    }
  };

  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0, 10);

  const onAddBlog = () => {
    if (!blogDetails.date) {
      blogDetails.date = date;
    }
    const { highlightedWords, blogContent } = getBlogContent();
    blogDetails.content = blogContent;
    blogDetails.tags = highlightedWords;

    props.addBlogData(blogDetails);
  };
  let buttonName = "Add";
  if (Object.keys(editBlog).length > 0) {
    buttonName = "Save";
  }
  return (
    <div
      class="modal"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              New message
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.onClose()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title" class="col-form-label">
                  Enter image url if any:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  defaultValue={editBlog.image}
                  onChange={(e) => handleChange(e.target.value, "image")}
                />
              </div>
              <div class="form-group">
                <label for="title" class="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  defaultValue={editBlog.title}
                  onChange={(e) => handleChange(e.target.value, "title")}
                />
              </div>
              <div class="form-group">
                <label for="author-name" class="col-form-label">
                  Author:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="author-name"
                  defaultValue={editBlog.author}
                  onChange={(e) => handleChange(e.target.value, "author")}
                />
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Content:
                </label>
                <div style={styles.editor} onClick={() => {}}>
                  <ContentEditor
                    setEditorState={setEditorState}
                    editorState={editorState}
                    // onChange={(e) => handleChange(e, "content")}
                  />
                </div>

                {/* <textarea class="form-control" id="message-text"></textarea> */}
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">
                  Pushlished on:
                </label>
                <input
                  class="form-control"
                  onChange={(e) => {
                    handleChange(e.target.value, "date");
                  }}
                  type="date"
                  id="start"
                  name="published-date"
                  defaultValue={editBlog.date || date}
                ></input>{" "}
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              onClick={() => {
                setEditBlog({});
                props.onClose();
              }}
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => onAddBlog()}
              type="button"
              class="btn btn-primary"
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const BlogModal = (props) => {
  return <Modal {...props} />;

  return <div />;
};

export default BlogModal;
