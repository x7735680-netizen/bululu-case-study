import { brainstormColumns } from "./brainstormData.js";

export default function HMBrainstormSlide() {
  return (
    <div className="hmw-brainstorm-slide">
      <div className="hmw-brainstorm-board">
        <div className="brainstorm-grid">
          {brainstormColumns.map((column) => (
            <section className={`board-col board-col--${column.type}`} key={column.title}>
              <h3 className="board-col-title">{column.title}</h3>
              <div className="board-note-list">
                {column.items.map((item) => (
                  <article
                    className={`sticky-note sticky-note--${column.type}${item.evidence ? " sticky-note--has-evidence" : ""}`}
                    data-note={item.index}
                    key={item.index}
                    tabIndex={item.evidence ? 0 : undefined}
                  >
                    <div className="sticky-note-index">{item.index}</div>
                    <h4 className="sticky-note-title">{item.title}</h4>
                    <p className="sticky-note-body">{item.body}</p>
                    {item.evidence && (
                      <aside className="sticky-note-popover" role="tooltip">
                        <span className="evidence-heading">Evidence</span>
                        <p>{item.evidence}</p>
                      </aside>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
