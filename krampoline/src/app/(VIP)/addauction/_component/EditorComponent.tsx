"use client";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import React, { useMemo, useRef, useState } from "react";
import { useAddAuction } from "@/app/utils/AddAuctionsProvider";
import AWS from "aws-sdk";

const EditorComponent = ({region, keyId, AccessKey}) => {
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const quillRef = useRef(null);
  const [contents, setContents] = useState("");
  const { setAuctionInfo } = useAddAuction();
  const REGION = region;
  const ACCESS_KEY = keyId;
  const SECRET_ACCESS_KEY = AccessKey;

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const name = Date.now();
        AWS.config.update({
          region: REGION,
          accessKeyId: ACCESS_KEY,
          secretAccessKey: SECRET_ACCESS_KEY,
        });

        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "varwonimgbucket",
            Key: `upload/${name}`,
            Body: file,
          },
        });

        const result = await upload.promise();
        const imageUrl = result.Location;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
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
    setAuctionInfo(contents);
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

export default EditorComponent;

//----------------------------------------------------------------
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import AWS from "aws-sdk";
// import { useAddAuction } from "@/app/utils/AddAuctionsProvider";
// const REGION = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_REGION;
// const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_ACCESS_KEY_ID;
// const SECRET_ACCESS_KEY =
//   process.env.NEXT_PUBLIC_AWS_S3_BUCKET_SECRET_ACCESS_KEY;
// const EditorComponent = () => {
//   const quillRef = useRef(null);
//   const [contents, setContents] = useState("");
//   const { AuctionInfo, setAuctionInfo } = useAddAuction();
//   useEffect(() => {
//     const imageHandler = () => {
//       const input = document.createElement("input");
//       input.setAttribute("type", "file");
//       input.setAttribute("accept", "image/*");
//       input.click();
//       input.onchange = async () => {
//         const file = input.files[0];
//         AWS.config.update({
//           region: REGION,
//           accessKeyId: ACCESS_KEY,
//           secretAccessKey: SECRET_ACCESS_KEY,
//         });
//         const upload = new AWS.S3.ManagedUpload({
//           params: {
//             ACL: "public-read",
//             Bucket: "varwonimgbucket",
//             Key: `upload/${Date.now()}`,
//             Body: file,
//           },
//         });
//         try {
//           const result = await upload.promise();
//           const imageUrl = result.Location;
//           const editor = quillRef.current.getEditor();
//           const range = editor.getSelection(true);
//           editor.insertEmbed(range.index, "image", imageUrl, "user");
//         } catch (error) {
//           console.error("Error uploading:", error);
//         }
//       };
//     };
//     if (quillRef.current) {
//       const quill = quillRef.current.getEditor();
//       quill.getModule("toolbar").addHandler("image", imageHandler);
//     }
//   }, [REGION, ACCESS_KEY, SECRET_ACCESS_KEY]); // 의존성 배열에 환경 변수를 포함
//   const modules = useMemo(
//     () => ({
//       toolbar: {
//         container: [
//           [{ header: [1, 2, 3, 4, 5, 6, false] }],
//           [{ font: [] }],
//           [{ align: [] }],
//           ["bold", "italic", "underline", "strike", "blockquote"],
//           [{ list: "ordered" }, { list: "bullet" }, "link"],
//           ["image"],
//           ["clean"],
//         ],
//         handlers: {
//           image: () => {},
//         },
//       },
//     }),
//     []
//   );
//   const onChangeContents = (contents) => {
//     setContents(contents);
//     setAuctionInfo(contents);
//   };
//   return (
//     <div style={{ height: "300px" }}>
//       <ReactQuill
//         style={{ height: "100%" }}
//         ref={quillRef}
//         modules={modules}
//         onChange={onChangeContents}
//       />
//     </div>
//   );
// };
// export default EditorComponent;
