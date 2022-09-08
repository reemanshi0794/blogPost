import React, { useRef } from "react";
import { Editor, getVisibleSelectionRect, RichUtils } from "draft-js";

import { useToggleLayer } from "react-laag";

const styleMap = {
  HIGHLIGHT: {
    backgroundColor: "#FFFF00",
    textDecoration: "underline",
  },
};

function HighlightComponent({ Icon, selected, onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: 6,
        backgroundColor: selected ? "rgba(255,255,255, 0.15)" : "transparent",
        borderRadius: 3,
        ...style,
      }}
    >
      <p>{Icon}</p>
    </div>
  );
}

function ContentEditor({ editorState, setEditorState }) {
  const editorRef = useRef(null);

  const getSelectedText = () => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    return selectedText;
  };

  const [element, toggleLayerProps] = useToggleLayer(
    ({ isOpen, layerProps }) =>
      isOpen && (
        <div
          ref={layerProps.ref}
          style={{
            ...layerProps.style,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            borderRadius: 4,
            color: "white",
            display: "flex",
            padding: 4,
            zIndex: 99999,
          }}
          onMouseDown={(evt) => evt.preventDefault()}
        >
          <HighlightComponent
            Icon={"Highlight"}
            onClick={() => {
              setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
            }}
            selected={editorState.getCurrentInlineStyle().has("BOLD")}
          />
        </div>
      ),
    { placement: { triggerOffset: 4 } }
  );

  function focusEditor() {
    editorRef?.current?.focus();
  }

  React.useEffect(() => {
    editorRef?.current && focusEditor();
  }, []);

  React.useEffect(() => {
    const isCollapsed = editorState.getSelection().isCollapsed();
    if (!editorState.getSelection().getHasFocus()) {
      toggleLayerProps.close();
      return;
    }
    if (isCollapsed) {
      toggleLayerProps.close();
    } else {
      const selectedText = getSelectedText();
      const isAlphanumeric = new RegExp("^[a-zA-Z0-9]*$");
      if (isAlphanumeric.test(selectedText)) {
        toggleLayerProps.open({
          clientRect: () => getVisibleSelectionRect(window),
          target: document.body,
        });
      }
    }
  }, [
    editorState.getSelection().isCollapsed(),
    editorState.getSelection().getHasFocus(),
  ]);

  const onEditorStateChange = (editState) => {
    setEditorState(editState);
  };

  return (
    <div onClick={focusEditor} className="editor-box">
      {element}
      <Editor
        ref={editorRef}
        editorState={editorState}
        customStyleMap={styleMap}
        onChange={onEditorStateChange}
        handleKeyCommand={(command, editorState) => {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            setEditorState(newState);
            return "handled";
          }
          return "not-handled";
        }}
      />
    </div>
  );
}

export default ContentEditor;
