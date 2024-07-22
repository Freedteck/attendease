import Banner from "./Banner";
import MyCalendar from "./Calendar";
import NotificationSection from "./NotificationSection";

const MainContent = () => {
  return (
    <div className="row">
      <div className="right layout">
        <Banner />
        <NotificationSection />
      </div>
      <div className="left layout">
        <MyCalendar />
      </div>
    </div>
  );
};

export default MainContent;
