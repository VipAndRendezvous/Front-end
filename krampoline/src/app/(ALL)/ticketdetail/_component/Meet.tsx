import React from "react";

const Meet = ({ onMeetingStart }: { onMeetingStart: any }) => {
  return (
    <div>
      <div>유명인과 만나셨나요?</div>
      <button className="btn-basic" onClick={onMeetingStart}>
        예
      </button>
    </div>
  );
};

export default Meet;
