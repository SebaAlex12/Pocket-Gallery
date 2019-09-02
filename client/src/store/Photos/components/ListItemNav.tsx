import React from "react";

interface Iprops {
  removePhotosHandler(): void;
}

export default function ListItemNav({ removePhotosHandler }: Iprops) {
  return (
    <nav>
      <button
        className="btn btn-danger btn-secondary mr-1 mb-2"
        onClick={removePhotosHandler}
      >
        Remove Selected Images
      </button>
    </nav>
  );
}
