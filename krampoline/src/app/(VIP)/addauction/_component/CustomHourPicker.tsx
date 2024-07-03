import React from "react";
import styles from "./customHourPicker.module.css";

interface CustomHourPickerProps {
  selectedHour: number | null;
  onChange: (hour: number) => void;
}

const CustomHourPicker: React.FC<CustomHourPickerProps> = ({
  selectedHour,
  onChange,
}) => {
  const handleHourChange = (hour: number) => {
    onChange(hour);
  };

  return (
    <div className={styles.hourPicker}>
      <div className={styles.minutePickerHeader}>시</div>
      <div className={styles.hourPickerBody}>
        {[...Array(24).keys()].map((hour) => (
          <div
            key={hour}
            className={`${styles.hour} ${
              selectedHour === hour ? styles.selected : ""
            }`}
            onClick={() => handleHourChange(hour)}
          >
            {hour.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomHourPicker;
