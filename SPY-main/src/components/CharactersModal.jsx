"use client";
import React, { useState, useEffect } from "react";
import charactersData from "../data/characters.json";

const characters = charactersData.map(char => ({
  id: char.id,
  name: char.name,
  role: char.role.split('•')[0].trim(), // Get just the first part before bullet
  icon: char.icon,
  face: char.face
}));

export default function CharactersModal({ open: controlledOpen, onClose } = {}) {
  const [open, setOpen] = useState(() => (controlledOpen !== undefined ? controlledOpen : false));

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    function handleClose() {
      setOpen(false);
    }

    try {
      window.openCharactersModal = () => setOpen(true);
      window.closeCharactersModal = () => setOpen(false);
      window.addEventListener("open-characters-modal", handleOpen);
      window.addEventListener("close-characters-modal", handleClose);

      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        delete window.openCharactersModal;
        delete window.closeCharactersModal;
        window.removeEventListener("open-characters-modal", handleOpen);
        window.removeEventListener("close-characters-modal", handleClose);
        document.removeEventListener('keydown', handleEscape);
      };
    } catch (e) {
      // Handle SSR safely
    }
  }, []);

  if (!open) return null;

  const handleCharacterClick = (character) => {
    // Navigate to dynamic character detail page
    const targetPage = `${import.meta.env.BASE_URL}character/${character.id}`;

    // Close modal first
    setOpen(false);
    if (typeof onClose === "function") onClose();

    // Navigate with transition
    setTimeout(() => {
      window.location.href = targetPage;
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={() => {
        setOpen(false);
        if (typeof onClose === "function") onClose();
      }}
    >
      <div
        className="bg-gray-900/95 p-8 rounded-lg max-w-4xl w-full mx-4 border border-yellow-400/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400 tracking-wider">CHARACTERS</h2>
          <button
            className="text-gray-400 hover:text-white text-2xl leading-none"
            onClick={() => {
              setOpen(false);
              if (typeof onClose === "function") onClose();
            }}
            aria-label="Close characters modal"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="character-card bg-black/50 border border-yellow-400/20 p-6 text-center hover:border-yellow-400/60 hover:bg-yellow-400/5 transition-all duration-300 cursor-pointer group"
              onClick={() => handleCharacterClick(character)}
            >
              {/* ASCII Art Face */}
              <div className="font-mono text-sm text-yellow-400 mb-4 whitespace-pre-line leading-tight">
                <div className="text-center">
                  {character.face.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {character.name}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {character.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Click a character to view their detailed profile
          </p>
          <p className="text-gray-600 text-xs mt-1">
            → swup transition to the right with back button
          </p>
        </div>
      </div>
    </div>
  );
}
