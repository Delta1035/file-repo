import React from "react";
import "./index.css";

export const TitleContent = props => {

  let { leadLabel, memberLabel, leadInfo, memberInfo } = props.data;

  return (
    <div className="TitleContent1">
      <div className="block">
        <div className="item" style={{ display: "flex" }}>
          <div className="left">
            {leadLabel + " - "}
          </div>
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            {leadInfo?.map((i, n) =>
              <div className="right1" key={n}>
                {i}
              </div>
            )}
          </div>
        </div>
        <div className="item" style={{ display: "flex" }}>
          <div className="left">
            {memberLabel + " - "}
          </div>
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            {memberInfo?.map((i, n) =>
              <div className="right" key={n}>
                {i}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
