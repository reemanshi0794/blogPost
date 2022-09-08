import { useSelector } from "react-redux";

const Header = ({
  timer,
  searchText,
  handleSearch,
  setSearchText,
  setFilteredData,
  openModal,
}) => {
  const blogsData = useSelector((state) => state.blogsReducer.blogs);

  return (
    <>
      <div class="section-title pb-2 d-flex justify-content-between align-items-center">
        <h4 class="title mb-4">Latest Blogs</h4>

        <div className="search-bar">
          <input
            placeholder="Search by Blog Title"
            value={searchText}
            onChange={handleSearch}
          />
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setSearchText("");
              setFilteredData(blogsData);
              clearTimeout(timer);
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
    </>
  );
};

export default Header;
