interface CodeBlockProps {
  lang?: string;
  text: string;
}

export default function CodeBlock({ lang = "tsx", text }: CodeBlockProps) {
  const lines = text.split("\n");

  return (
    <div className="codeblock">
      <div className="cb-head">
        <span className="cb-lang">{lang}</span>
        <span className="cb-file">~/src/example.{lang}</span>
        <span className="cb-actions">
          <button className="cb-btn" type="button">
            :w
          </button>
          <button className="cb-btn" type="button">
            yy
          </button>
        </span>
      </div>
      <div className="cb-body">
        {lines.map((line, index) => (
          <div className="cb-line" key={`${index}-${line}`}>
            <span className="cb-gutter">{String(index + 1).padStart(2, " ")}</span>
            <span className="cb-code">{line || " "}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
