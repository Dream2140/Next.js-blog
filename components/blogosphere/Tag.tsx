"use client";

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, active = false, onClick }: TagProps) {
  return (
    <button className={`tag ${active ? "is-active" : ""}`} onClick={onClick} type="button">
      <span className="tag-hash">#</span>
      {label}
    </button>
  );
}
