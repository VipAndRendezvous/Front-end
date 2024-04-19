"use client";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import React, { useMemo, useRef, useState } from "react";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";
import AWS from "aws-sdk";

// // SSR을 비활성화하고 클라이언트 사이드에서만 로드하도록 설정
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const EditorComponentWaring = ({region, keyId, AccessKey}) => {
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const quillRef = useRef(null);
  const [contents, setContents] = useState("");
  const { WarningInfo, setWarningInfo } = useAddAuction();
  const REGION = region;
  const ACCESS_KEY = keyId;
  const SECRET_ACCESS_KEY = AccessKey;

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0];
      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now();
        //생성한 s3 관련 설정들
        AWS.config.update({
          region: REGION,
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_ACCESS_KEY,
        });
        //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "varwonimgbucket", //버킷 이름
            Key: `upload/${name}`,
            Body: file,
          },
        });
        const result = await upload.promise();
        const imageUrl = result.Location; // Direct URL from S3
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", imageUrl);
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
    <div style={{ height: "300px" }}>
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
