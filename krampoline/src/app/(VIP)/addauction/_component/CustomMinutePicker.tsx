import React from "react";
import styles from "./customMinutePicker.module.css";

interface CustomMinutePickerProps {
  selectedMinute: number | null;
  onChange: (minute: number) => void;
}

const CustomMinutePicker: React.FC<CustomMinutePickerProps> = ({
  selectedMinute,
  onChange,
}) => {
  const handleMinuteChange = (minute: number) => {
    onChange(minute);
  };

  return (
    <div className={styles.minutePicker}>
      <div className={styles.minutePickerHeader}>분</div>
      <div className={styles.minutePickerBody}>
        {[...Array(60).keys()].map((minute) => (
          <div
            key={minute}
            className={`${styles.minute} ${
              selectedMinute === minute ? styles.selected : ""
            }`}
            onClick={() => handleMinuteChange(minute)}
          >
            {minute.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomMinutePicker;
