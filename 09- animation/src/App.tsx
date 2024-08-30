import CountUp from "react-countup";
import "./App.css";
import AnimatedCard from "./components/animatedCard";
import CustomCard from "./components/customCard";
import CustomFadeCard from "./components/customFadeCard";

function App() {
  return (
    <>
      <AnimatedCard />
      <div className="h-screen mb-96 p-4 border">
        <CustomCard title="Card1" description="Card1 description" />
        <CustomCard title="Card2" description="Card1 description" />
        <CustomCard title="Card3" description="Card1 description" />
      </div>
      <div className="h-screen">
        <CustomFadeCard title="Card1" description="Card1 description" />
        <CustomFadeCard title="Card2" description="Card1 description" />
        <CustomFadeCard title="Card3" description="Card1 description" />
      </div>
      <div className="h-screen">
        <CountUp
          className="text-5xl"
          separator="."
          decimal=","
          decimals={3}
          start={0}
          end={25000.5}
          duration={5}
        />
      </div>
    </>
  );
}

export default App;
