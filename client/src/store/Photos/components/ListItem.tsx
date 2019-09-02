import React from "react";

interface Iprops {
  key: string | number;
  imageUrl: string;
  photo: string;
  checkIfChecked(): void;
}

function ListItem({ imageUrl, key, checkIfChecked }: Iprops) {
  return (
    <div className="photo-card col-lg-3" key={key}>
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
      <input onChange={checkIfChecked} type="checkbox" />
    </div>
  );
}

export default ListItem;
