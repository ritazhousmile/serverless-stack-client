import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./EnhancedNotes.css";
import "./Home.css";

export default function EnhancedNotes(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAppContext();

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadNotes();
        // 只保留有增强内容的笔记
        const enhancedNotes = notes.filter(note => note.enhancedContent);
        setNotes(enhancedNotes);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem header={note.title || note.content.trim().split("\n")[0]}>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
            <div className="enhanced-badge">AI Enhanced</div>
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app with AI enhancement</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h1>Your Enhanced Notes</h1>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="EnhancedNotes">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
} 