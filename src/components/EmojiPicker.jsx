import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiSelector = ({ selectedEmoji, setSelectedEmoji }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="p-2 border rounded bg-blue-100"
      >
        {selectedEmoji || "😀"} Pick Emoji
      </button>

      {showPicker && (
        <div className="mt-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiSelector;
