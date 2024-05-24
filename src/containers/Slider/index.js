import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus ? data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) : [];
  const nextCard = () => {
    setIndex(index < byDateDesc.length-1 ? index + 1 : 0)
  };
  useEffect(() => {
    const CardTimer = setInterval(() => {
      nextCard();
    }, 5000);

    return () => clearInterval(CardTimer)
  }, [index, byDateDesc]);
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div key={`event-${event.id || idx}`} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div key={`slide-${event.id || idx}`} className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event2, radioIdx) => (
            <input
              id="radioButton"
              key={`radio-${event2.id || radioIdx}`}
              type="radio"
              name={`radio-button-${event2.id || radioIdx}`}
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
