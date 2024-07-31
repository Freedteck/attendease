import Banner from "./Banner";
import MyCalendar from "./Calendar";
import NotificationSection from "./NotificationSection";

const MainContent = ({ BASE }) => {
  return (
    <div className="row">
      <div className="right layout">
        <Banner BASE={BASE} />
        <NotificationSection BASE={BASE} />
      </div>
      <div className="left layout">
        <MyCalendar />
      </div>
    </div>
  );
};

export default MainContent;
