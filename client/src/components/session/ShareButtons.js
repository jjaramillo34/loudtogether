import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { FaCopy, FaSms } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareButtons = ({ shortUrl, sessionName }) => {
  const [copied, setCopied] = useState(false);

  const handleShareByText = () => {
    const textMessage = `Join my session: ${sessionName} ${shortUrl}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Join my session",
          text: textMessage,
          url: shortUrl,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <FacebookShareButton
        url={shortUrl}
        quote={`Join my session: ${sessionName}`}
      >
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={shortUrl}
        title={`Join my session: ${sessionName}`}
      >
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={shortUrl}
        title={`Join my session: ${sessionName}`}
      >
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
      <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
        <button className="flex items-center">
          <FaCopy size={30} />
        </button>
      </CopyToClipboard>
      <button onClick={handleShareByText} className="flex items-center">
        <FaSms size={30} />
      </button>
    </div>
  );
};

export default ShareButtons;
