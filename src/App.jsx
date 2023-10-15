import { useState } from "react";
import reviews from "./components/data";
import reviewImg from "./assets/images/review.png";
import arrowImg from "./assets/images/arrow.png";
import { useEffect } from "react";

const App = () => {
  const [data, setData] = useState(reviews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex > data.length - 1) setCurrentIndex(0);
    if (currentIndex < 0) setCurrentIndex(data.length - 1);
  }, [currentIndex, data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div>
      <header className="w-max m-auto text-3xl mt-8">Our Reviews</header>
      <div className="w-24 border-2 border-green-400 m-auto mt-1"></div>

      <section className="max-w-3xl h-[500px] m-auto mt-8 flex relative overflow-hidden">
        {data.map((review, index) => {
          const { id, image, name, title, quote } = review;
          const position =
            index == currentIndex
              ? "currentReview"
              : index == currentIndex - 1 ||
                (currentIndex == 0 && index == data.length - 1)
              ? "prevReview"
              : "nextReview";

          return (
            <div
              className={`w-full h-full absolute flex flex-col items-center justify-center transition duration-500 ${position}`}
              key={id}
            >
              <img
                className="w-44 h-44 object-cover rounded-full border-4 border-green-400 mb-4"
                src={image}
                alt={name}
              />
              <p className="text-3xl capitalize text-green-500">{name}</p>
              <p className="text-xl capitalize text-blue-400">{title}</p>
              <p className="text-center my-6 opacity-60">{quote}</p>
              <img className="w-16" src={reviewImg} />
            </div>
          );
        })}
        <button onClick={() => setCurrentIndex(currentIndex + 1)}>
          <img
            className="w-10 absolute top-[50%] translate-y-[-50%] right-2"
            src={arrowImg}
          />
        </button>
        <button onClick={() => setCurrentIndex(currentIndex - 1)}>
          <img
            className="w-10 absolute top-[50%] translate-y-[-50%] left-2 rotate-180"
            src={arrowImg}
          />
        </button>
      </section>
    </div>
  );
};

export default App;
