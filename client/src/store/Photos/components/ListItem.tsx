import React from "react";

interface Iprops {
  imageUrl: string;
  photo: string;
  checkIfChecked(): void;
  lightboxPhotosHandler(photoIndex: any): void;
}

function ListItem({ imageUrl, checkIfChecked, lightboxPhotosHandler }: Iprops) {
  const arr = imageUrl.split("/");
  const miniLink = [arr[1], arr[2], arr[3], "mini", arr[4]].join("/");
  return (
    <div className="photo-card col-lg-3">
      <input onChange={checkIfChecked} type="checkbox" />
      <figure className="figure">
        <button data-title="Image caption" onClick={lightboxPhotosHandler}>
          <img src={miniLink} className="figure-img img-fluid rounded" alt="" />
        </button>
        <figcaption className="figure-caption text-right" />
      </figure>
    </div>
  );
}

export default ListItem;
