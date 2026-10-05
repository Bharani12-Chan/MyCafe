import "./MovingGallery.css";

const row1 = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
];

const row2 = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=700&q=85",
];

function GalleryRow({ images, reverse = false }) {
  return (
    <div className="gallery-window">

      <div
        className={
          reverse
            ? "gallery-track reverse"
            : "gallery-track"
        }
      >
        {[...images, ...images].map((image, index) => (

          <div
            className="gallery-image"
            key={index}
          >
            <img src={image} alt="Food" />
          </div>

        ))}
      </div>

    </div>
  );
}

function MovingGallery() {
  return (
    <section className="moving-gallery">

      <div className="gallery-heading reveal">

        <span>
          THE FOODRUSH FEELING
        </span>

        <h2>
          See it.
          <em> Crave it.</em>
          <br />
          Order it.
        </h2>

      </div>

      <GalleryRow images={row1} />

      <GalleryRow
        images={row2}
        reverse
      />

    </section>
  );
}

export default MovingGallery;