"use client";

import { useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";

const themeScript = `(function(){try{var t=localStorage.getItem("msi-theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export function DocumentScripts() {
  const inserted = useRef(false);

  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script id="msi-theme" dangerouslySetInnerHTML={{ __html: themeScript }} />;
  });

  return null;
}
