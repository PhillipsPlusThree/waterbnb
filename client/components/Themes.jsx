import React from "react";
import ReactSwitch from "react-switch";

const Themes = ({ theme, toggleTheme }) => {
  return (
    <div className="themes">
      <ReactSwitch
        className="rs"
        onChange={toggleTheme}
        checked={theme === "dark"}
        onColor="#333333"

      />
    </div>
  );
};

export default Themes;
