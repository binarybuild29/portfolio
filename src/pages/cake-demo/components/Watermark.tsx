/** Large low-opacity outlined text behind a section for editorial texture. */
export default function Watermark({
  text,
  top = "10%",
}: {
  text: string;
  top?: string;
}) {
  return (
    <div className="cd-watermark" aria-hidden="true">
      <span style={{ top, left: "-2%" }}>{text}</span>
    </div>
  );
}
