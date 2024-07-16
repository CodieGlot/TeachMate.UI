import Joyride from "react-joyride";

const steps = [
    {
      target: ".header > h3",
      content: "Welcome!! Please spare a minute to learn about our page",
      // Add this
      disableBeacon: true,
    },
    {
      target: ".login",
      content: "You can log in here",
    },
    {
      target: ".signup",
      content: "Sign up here, if you're new",
    },
    {
      target: ".packages h3",
      content: "The packages we offer",
    },
    {
      target: ".explore",
      content: "Click here to find out more about other packages",
    },
    {
      target: ".footer .form",
      content: "Subscribe to our newsletter here",
    },
  ];

function Intro() {
  return (
    <>
      <Joyride
  steps={steps}
  continuous={true}
  styles={{
    options: {
      arrowColor: "#5caeab",
      backgroundColor: "#5caeab",
      overlayColor: "rgba(92, 174, 171, .3)",
      primaryColor: "#5caeab",
      textColor: "#fff",
    },
    spotlight: {
      backgroundColor: "transparent",
    },
  }}
  showProgress={true}
  // Add this
  showSkipButton={true}
/>
      <div className="App">
        <div className="explore">Hello</div>
        <div className="signup">Signup</div>
      </div>
    </>
  );
}
export default Intro;