export default function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1" style={{ height: 1, background: "#ebebeb" }} />
      <span className="text-xs whitespace-nowrap" style={{ color: "var(--secondary)" }}>
        or continue with
      </span>
      <div className="flex-1" style={{ height: 1, background: "#ebebeb" }} />
    </div>
  );
}
