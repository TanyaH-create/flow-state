import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CDBContainer } from "cdbreact";

interface ProgressTrackerProps {
  progress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <CDBContainer className="d-flex flex-column align-items-center">
      <h4>Progress</h4>
      <div style={{ width: 400, height: 400 }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            pathColor: `rgba(62, 152, 199, ${progress / 100})`,
            textColor: "#3e98c7",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </CDBContainer>
  );
};

export default ProgressTracker;
