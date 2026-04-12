import "./code-view.css";

export interface CodeAnnotation {
  file: string;
  sections: {
    title: string;
    code: string;
    explanation: string;
  }[];
}

interface CodeViewProps {
  annotations: CodeAnnotation;
  onBack: () => void;
  backLabel: string;
}

export function CodeView({ annotations, onBack, backLabel }: CodeViewProps) {
  return (
    <div className="code-view">
      <div className="code-header">
        <a className="code-back" onClick={onBack}>
          &larr; {backLabel}
        </a>
        <h1>Code: {annotations.file}</h1>
      </div>

      {annotations.sections.map((section, i) => (
        <div key={i} className="code-section">
          <div className="code-section-title">{section.title}</div>
          <div className="code-columns">
            <div className="code-left">
              <pre><code>{section.code}</code></pre>
            </div>
            <div className="code-right">
              <p>{section.explanation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
