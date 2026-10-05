import "./Marquee.css";

function Marquee() {
  const words = [
    "FRESHLY MADE",
    "DELIVERED FAST",
    "GOOD FOOD",
    "100+ DISHES",
    "FOODRUSH",
    "GOOD MOOD",
  ];

  return (
    <section className="marquee-section">

      <div className="marquee-track">

        {[...words, ...words].map((word, index) => (
          <div className="marquee-item" key={index}>
            <span>{word}</span>
            <i>✦</i>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Marquee;