import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type Props = {
  value: string;
  onChange: (data: string) => void;
};

const Editor: React.FC<Props> = ({ value, onChange }) => {
  //   const [editorData, setEditorData] = useState<string>("");

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          // Bạn có thể tùy chỉnh cấu hình ở đây
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
            "imageUpload", // Thêm tính năng upload ảnh
          ],
          ckfinder: {
            uploadUrl: "/path/to/your/image/upload", // URL API xử lý upload ảnh
          },
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
            ],
          },
        }}
      />
    </div>
  );
};

export default Editor;
