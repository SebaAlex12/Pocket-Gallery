import React from "react";

interface Iprops {
  imageUrl: string;
  photo: string;
  checkIfChecked(): void;
}

function ListItem({ imageUrl, checkIfChecked }: Iprops) {
  const arr = imageUrl.split("/");
  const miniLink = [arr[1], arr[2], arr[3], "mini", arr[4]].join("/");
  return (
    <div className="photo-card col-lg-3">
      <input onChange={checkIfChecked} type="checkbox" />
      <figure className="figure">
        <a
          href={imageUrl}
          data-lightbox="gallery-01"
          data-title="Image caption"
        >
          <img src={miniLink} className="figure-img img-fluid rounded" alt="" />
        </a>
        <figcaption className="figure-caption text-right" />
      </figure>
    </div>
  );
}

export default ListItem;
