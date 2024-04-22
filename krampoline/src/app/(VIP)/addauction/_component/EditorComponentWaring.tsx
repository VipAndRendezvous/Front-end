"use client";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import React, { useMemo, useRef, useState } from "react";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";
import AWS from "aws-sdk";
import HttpAuthInstance from "@/app/utils/api/interceptor/axiosConfig";
import axios from "axios";

// // SSR을 비활성화하고 클라이언트 사이드에서만 로드하도록 설정
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const EditorComponentWaring = () => {
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const quillRef = useRef(null);
  const [contents, setContents] = useState("");
  const { WarningInfo, setWarningInfo } = useAddAuction();

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0];
      try {
        const token = localStorage.getItem("Authorization");
        const formData = new FormData();
        formData.append("boardImg", file);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/s3/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const imageUrl = response.data;
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", imageUrl);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, "link"],
          ["image"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
    }),
    []
  ); // 두 번째 인자로 빈 배열을 추가하여 의존성 배열을 지정합니다.

  const onChangeContents = (contents: any) => {
    setWarningInfo(contents);
  };

  return (
    <div style={{ height: "222px" }}>
      <ReactQuill
        style={{ height: "100%" }}
        ref={quillRef}
        modules={modules}
        onChange={onChangeContents}
      />
    </div>
  );
};

export default EditorComponentWaring;
//------------------------------------------------------------------------------
