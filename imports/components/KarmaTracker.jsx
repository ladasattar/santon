import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import VisibilitySensor from "react-visibility-sensor";
import "react-circular-progressbar/dist/styles.css";
import { authenticated } from "../store";
import { useRecoilValue } from "recoil";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { easeQuadInOut } from "d3-ease";

export const KarmaTracker = () => {
  const { user } = useRecoilValue(authenticated);
  const karma = user?.profile?.karma ? user?.profile?.karma : 0;

  return (
    <div className="karma-tracker d-flex flex-column align-items-center my-5">
      <h1 className="text-center mb-4">Karma Tracker</h1>
      <div style={{ width: 200, height: 200 }}>
        <VisibilitySensor>
          {({ isVisible }) => {
            const percentage = isVisible ? karma : 0;
            return (
              <AnimatedProgressProvider
                valueStart={0}
                valueEnd={percentage}
                duration={1.4}
                easingFunction={easeQuadInOut}
              >
                {(value) => {
                  const roundedValue = Math.round(value);
                  return (
                    <CircularProgressbar
                      value={value}
                      text={roundedValue + "%"}
                      maxValue={100}
                      styles={buildStyles({
                        // Rotation of path and trail, in number of turns (0-1)
                        rotation: 0,

                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",

                        // Text size
                        textSize: "20px",

                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.75,
                        pathTransition: "none",

                        // Can specify path transition in more detail, or remove it entirely
                        // pathTransition: 'none',

                        // Colors
                        pathColor: "#990101",
                        textColor: "#ffffffde",
                        trailColor: "rgba(255, 255, 255, 0.35)",
                      })}
                    />
                  );
                }}
              </AnimatedProgressProvider>
            );
          }}
        </VisibilitySensor>
      </div>
      <p className="mt-4 mb-1 text-center opacity-75">
        Karma akan bertambah jika melakukan praktik santet ataupun pelet
      </p>
    </div>
  );
};
