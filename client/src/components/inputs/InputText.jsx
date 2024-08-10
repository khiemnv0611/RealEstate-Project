import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const InputText = ({
  containerClassname,
  label,
  height = 500,
  register,
  errors,
  validate,
  id,
  setValue,
}) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full", containerClassname)
      )}
    >
      {label && (
        <label className="font-medium text-main-800" htmlFor={id}>
          {label}
        </label>
      )}
      <Editor
        // onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>This is the initial content of the editor.</p>"
        apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
        {...register(id, validate)}
        onChange={(e) => setValue(id, e.target.getContent())}
        init={{
          height,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputText;
