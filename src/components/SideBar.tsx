"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { editCommandTitle, deleteCommand } from "../../redux/slices/commandsSlice";
import { API, graphqlOperation } from 'aws-amplify';
import { updateCommand, deleteCommand as deleteCommandMutation } from '@/graphql/mutations';


const SideBarContainer = styled.div`
  width: 250px;
  color: ${({ theme }) => theme.text};
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
`;

const CommandContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EditInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 4px;
`;

const EditButton = styled.button`
  margin-right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const ConfirmIcon = styled.span`
  margin-left: 5px;
`;

const Command = ({ title, commandID }: { title: string; commandID: string }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [showConfirm, setShowConfirm] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleCommandTitlesEditSubmit = async () => {
    // Optimistic UI update
    dispatch(editCommandTitle({ commandId: commandID, newTitle: editedTitle }));

    // Update the database
    const commandDetails = { id: commandID, title: editedTitle };
    await API.graphql(graphqlOperation(updateCommand, { input: commandDetails }));

    setIsEditing(false);
  };

  const handleCommandDelete = async () => {
    // Delete the command from the database
    await API.graphql(graphqlOperation(deleteCommandMutation, { input: { id: commandID } }));

    // Optimistic UI update
    dispatch(deleteCommand(commandID));
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        editInputRef.current &&
        !editInputRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false);
        setEditedTitle(title);
      }
    };

    if (isEditing) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isEditing, title]);

  return (
    <CommandContainer>
      {isEditing ? (
        <EditInput
          ref={editInputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleCommandTitlesEditSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleCommandTitlesEditSubmit()}
        />
      ) : (
        <Title>{title}</Title>
      )}
      <EditButton onClick={() => setIsEditing(!isEditing)}>✏️</EditButton>
      <DeleteButton onClick={() => showConfirm ? handleCommandDelete() : setShowConfirm(true)}>
        🗑️
      </DeleteButton>
      {showConfirm && <ConfirmIcon>✅</ConfirmIcon>}
    </CommandContainer>
  );
};

const SideBar = () => {
  const commands = useSelector((state: RootState) => state.commands.commands);

  return (
    <SideBarContainer>
      {commands?.map((command, index) => (
        <Command key={index} title={command.title} commandID={command.id} />
      ))}
    </SideBarContainer>
  );
};

export default SideBar;