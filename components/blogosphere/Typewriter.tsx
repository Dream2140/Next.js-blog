"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
}

export default function Typewriter({ text, speed = 22 }: TypewriterProps) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput("");
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setOutput(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(id);
      }
    }, speed);

    return () => window.clearInterval(id);
  }, [text, speed]);

  return (
    <span>
      {output}
      {output.length < text.length ? <span className="tw-cur">▊</span> : null}
    </span>
  );
}
