import { cvDownloadName, cvDownloadPath, cvPreviewPath } from "./experience-data";
import "./styles.css";

export function CvPreview() {
  return (
    <a
      href={cvDownloadPath}
      download={cvDownloadName}
      className="cv-file"
      aria-label="Download CV"
    >
      <div className="cv-file-header">
        <span className="cv-file-dot cv-file-dot-red" />
        <span className="cv-file-dot cv-file-dot-yellow" />
        <span className="cv-file-dot cv-file-dot-green" />
        <span className="cv-file-title">{cvDownloadName}</span>
      </div>
      <div className="cv-file-body">
        <iframe
          src={`${cvPreviewPath}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0&pagemode=none`}
          title="CV preview"
          className="cv-file-frame"
        />
        <div className="cv-file-hint">
          <svg
            className="cv-file-hint-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 4v10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8.5 10.5 12 14l3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 18h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Download CV</span>
        </div>
      </div>
    </a>
  );
}
