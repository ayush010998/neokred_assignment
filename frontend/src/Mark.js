import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import "./App.css";

const Mark = () => {
  const [markdown, setMarkdown] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");

  const handleMarkdownChange = (e) => {
    const input = e.target.value;
    setMarkdown(input);
    const html = marked(input);
    setPreviewHtml(html);
  };

  const handleServerConversion = async () => {
    try {
      const response = await axios.post("http://localhost:3000/convert", {
        markdown,
      });
      setPreviewHtml(response.data.html);
    } catch (error) {
      console.error("Error converting markdown via server:", error);
    }
  };

  return (

    <div className="markdown-editor">
      <h1>Neokred Test</h1>
      <textarea
        className="editor"
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Please Enter Your Markdown"
      />
      <div className="preview" dangerouslySetInnerHTML={{ __html: previewHtml }} />
      <button onClick={handleServerConversion} className="server-button">
        Convert on Server
      </button>
    </div>
  );
};

export default Mark;
