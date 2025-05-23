import React, { useRef, useState } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import ChangeColor from '../components/ChangeColor'
import "./NewNote.css";

export default function NewNote(props) {
  const file = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteColor, setNoteColor] = useState("#FFFFFF");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0 && title.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function handleColorChangeComplete (color) {
    setNoteColor(color.hex)
  }

  async function handleSubmit(event) {
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
    const attachment = file.current
      ? await s3Upload(file.current)
      : null;

    await createNote({ title, content, attachment, noteColor });
    props.history.push("/");
  } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }
  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="title">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            value={title}
            type="text"
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter note title"
          />
        </FormGroup>
        <FormGroup controlId="content">
          <ControlLabel>Content</ControlLabel>
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
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
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
