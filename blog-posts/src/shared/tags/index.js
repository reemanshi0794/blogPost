
const  Tags = ({tags, selectedTag, onSelectTag, removeFilter}) => {
    return (
<><div>
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
        </>
    )
        }
        export default Tags
