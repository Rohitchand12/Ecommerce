import React from "react";

function PriceSlider() {
  return (
    <div className="w-full center flex-col gap-3">
        {/* min and max input */}
      <div className="center w-full">
        <div className="center gap-2">
          <label>Min</label>
          <input className = "w-1/2 p-2" type="number" />
        </div>
        <p>-</p>
        <div className="center gap-2">
          <label>Max</label>
          <input className = "w-1/2 p-2" type="number" />
        </div>
      </div>

      {/* range input  */}
      <div>
        <input type = "range"/>
      </div>
    </div>
  );
}

export default PriceSlider;
