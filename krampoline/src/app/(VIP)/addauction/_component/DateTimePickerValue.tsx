"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";

export default function DateTimePickerValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const { Date, setDate } = useAddAuction();

  const minDate = dayjs().add(1, "month");

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue); // 컴포넌트 상태 업데이트
    setDate(newValue ? newValue.format("YYYY-MM-DDTHH:mm:ss") : null);
  };
  console.log(Date);

  // 비활성화할 날짜 로직
  const shouldDisableDate = (date: Dayjs) => {
    return date.isBefore(minDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          label="날짜와 시간을 선택해주세요"
          value={value}
          onChange={handleDateChange}
          shouldDisableDate={shouldDisableDate}
          sx={{
            zIndex: 0, // DateTimePicker의 z-index 조정
            "& .MuiInputBase-root": {
              zIndex: 0, // 입력 필드의 z-index 조정
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
