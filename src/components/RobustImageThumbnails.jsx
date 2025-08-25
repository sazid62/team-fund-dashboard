import React, { useEffect, useRef, useState } from "react";

const getFileId = (url) => {
  if (!url) return null;
  const m1 = url.match(/\/d\/([a-zA-Z0-9_-]+)/); // /d/<id>
  if (m1) return m1[1];
  const m2 = url.match(/(?:\?|&)id=([a-zA-Z0-9_-]+)/); // ?id=<id>
  if (m2) return m2[1];
  return null;
};

export default function Thumbnail({ url, size = 96 }) {
 const [modal, setModal] = useState(false);
    const imgLink = (`https://lh3.googleusercontent.com/u/0/d/${getFileId(url)}`);



  return (
    <>
      <img
      referrerPolicy="no-referrer"
        src={imgLink}
        alt=""
        width={size}
        height={size}
        style={{
          objectFit: "cover",
          width: size,
          height: size,
          borderRadius: 8,
          cursor: "pointer",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "#111",
        }}
        onClick={() => setModal(true)}
    
      />

      {modal && (
        <div
          onClick={() => setModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <img
            referrerPolicy="no-referrer"
            src={imgLink}
            alt=""
            style={{ maxWidth: "95%", maxHeight: "95%", borderRadius: 8 }}
            
          />
          <button
            onClick={() => setModal(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: 22,
              color: "#fff",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

 