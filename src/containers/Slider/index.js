import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateAsc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  const [radioIndex, setRadioIndex] = useState(0);

  const nextCard = () => {
    setTimeout(() => {
      setIndex((index + 1) % byDateAsc.length);
      setRadioIndex((radioIndex + 1) % byDateAsc.length);
    }, 5000);
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateAsc?.map((event, idx) => (
        <>
          <div key={event.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateAsc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIndex === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
