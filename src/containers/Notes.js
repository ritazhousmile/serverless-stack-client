import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { s3Upload, enhanceNote } from "../libs/awsLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import ChangeColor from '../components/ChangeColor'
import config from "../config";
import "./Notes.css";
import "./EnhancedContent.css";
import { marked } from "marked";

export default function Notes(props) {
  const file = useRef(null);
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [noteColor, setNoteColor] = useState("#FFFFFF");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState("");

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment, noteColor } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
        setNoteColor(noteColor);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function handleColorChangeComplete (color) {
    setNoteColor(color.hex)
  }

  function saveNote(note) {
    return API.put("notes", `/notes/${props.match.params.id}`, {
      body: note
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveNote({
        content,
        attachment: attachment || note.attachment,
        noteColor: noteColor || note.noteColor
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  async function handleEnhance() {
    setIsEnhancing(true);
    try {
      await enhanceNote(props.match.params.id);
      alert("笔记已被AI成功增强！");
      // 重新加载笔记以获取增强内容
      const note = await API.get("notes", `/notes/${props.match.params.id}`);
      setContent(note.content);
      if (note.enhancedContent) {
        setEnhancedContent(note.enhancedContent);
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsEnhancing(false);
    }
  }

  function deleteNote() {
    return API.del("notes", `/notes/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Notes">
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentClass="textarea"
              onChange={e => setContent(e.target.value)}
            />
          </FormGroup>
          {note.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <ChangeColor
            noteColor={noteColor}
            handler={handleColorChangeComplete}
          />
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
          <hr />
          <LoaderButton
            block
            bsSize="large"
            bsStyle="info"
            onClick={handleEnhance}
            isLoading={isEnhancing}
          >
            {isEnhancing ? "增强中..." : "使用AI增强笔记"}
          </LoaderButton>
          
          {enhancedContent && (
            <div className="enhanced-content">
              <h3>AI增强版本</h3>
              <div dangerouslySetInnerHTML={{ __html: marked(enhancedContent) }}></div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
