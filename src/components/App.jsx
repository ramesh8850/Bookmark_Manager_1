import React, { useState } from "react";
import Dialog from "./DialogBox";
import Search from "./Search";
import SideBar from "./SideBar";
import Bookmark from "./Bookmark";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if it's editing mode
  const [editBookmark, setEditBookmark] = useState(null); // Store bookmark to edit
  const [bookmarks, setBookmarks] = useState([]);

  const handleAddBookmark = (bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const handleEditBookmark = (updatedBookmark) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark) =>
        bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
      )
    );
  };

  function deleteBookmark(id) {
    setBookmarks((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  //search bookmark

  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter bookmarks based on search query
  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchQuery) ||
      bookmark.description.toLowerCase().includes(searchQuery) ||
      bookmark.category.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="App">
      {/* Header */}
      <div className="header m-4 d-flex justify-content-between">
        <h1 className="fw-bolder">Bookmarks</h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setIsDialogOpen(true);
            setEditBookmark(null);
          }}
          className="d-flex justify-content-center align-items-center rounded-4 p-2 gap-2 bg-dark text-white"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          Add Bookmark
        </button>

        <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAddBookmark={handleAddBookmark}
          onEditBookmark={handleEditBookmark}
          isEditing={isEditing}
          bookmark={editBookmark} // Pass bookmark to edit if it's editing
        />
      </div>

      {/* grid */}
      <div className="grid d-flex gap-1 m-4">
        {/* Sidebar */}
        <SideBar />

        <div className="right border p-3">
          {/* Search Bar */}
          <Search handleSearch={handleSearch} />

          {/* Show filtered bookmarks only when there is a search query */}
          {searchQuery ? (
            <div className="bookmark-list">
              {filteredBookmarks.length > 0 ? (
                filteredBookmarks.map((bookmark, index) => (
                  <Bookmark
                    key={index}
                    id={index}
                    title={bookmark.title}
                    url={bookmark.url}
                    description={bookmark.description}
                    category={bookmark.category}
                    onEdit={() => {
                      setIsEditing(true);
                      setEditBookmark(bookmark);
                      setIsDialogOpen(true);
                    }}
                    onDelete={deleteBookmark}
                  />
                ))
              ) : (
                <p>No bookmarks found</p>
              )}
            </div>
          ) : (
            // Show all bookmarks when there is no search query
            <div className="cards-container ms-2">
              {bookmarks.map((bookmark, index) => (
                <Bookmark
                  key={index}
                  id={index}
                  title={bookmark.title}
                  url={bookmark.link}
                  description={bookmark.description}
                  category={bookmark.category}
                  onEdit={() => {
                    setIsEditing(true);
                    setEditBookmark(bookmark);
                    setIsDialogOpen(true);
                  }}
                  onDelete={deleteBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
