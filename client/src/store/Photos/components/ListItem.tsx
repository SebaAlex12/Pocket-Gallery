import React from "react";

interface Iprops {
  imageUrl: string;
  photo: string;
  checkIfChecked(): void;
}

function ListItem({ imageUrl, checkIfChecked }: Iprops) {
  return (
    <div className="photo-card col-lg-3">
      <figure className="figure">
        <a
          href={imageUrl}
          data-lightbox="gallery-01"
          data-title="Image caption"
        >
          <img src={imageUrl} className="figure-img img-fluid rounded" alt="" />
        </a>
        <figcaption className="figure-caption text-right" />
      </figure>
      <input onChange={checkIfChecked} type="checkbox" name={imageUrl} />
    </div>
  );
}

export default ListItem;
