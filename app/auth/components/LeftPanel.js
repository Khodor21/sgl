export default function LeftPanel() {
  return (
    <div
      className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12"
      style={{ background: "var(--primary)" }}
    >
      {/* Decorative circles */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-80px",
          right: "-80px",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: "rgba(0,221,239,0.13)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-60px",
          left: "-60px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: "40%",
          left: "60%",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(0,221,239,0.07)",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 38, height: 38, background: "var(--teal)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2L17 6V14L10 18L3 14V6L10 2Z"
              fill="#222"
              opacity="0.9"
            />
          </svg>
        </div>
        <span className="text-lg font-extrabold text-white tracking-tight">
          ShopName
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10">
        <h1
          className="text-white font-extrabold leading-tight mb-4"
          style={{ fontSize: "40px", letterSpacing: "-1px" }}
        >
          Your store,
          <br />
          <span style={{ color: "var(--teal)" }}>delivered</span>
          <br />
          to your door.
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)", maxWidth: 320 }}
        >
          Join thousands of happy customers who shop smarter, faster and better
          with us.
        </p>
      </div>

      {/* Feature list */}
      <div className="relative z-10 flex flex-col gap-3">
        {[
          "Track your orders in real time",
          "Get notified on exclusive offers",
          "Fast & secure checkout",
          "24/7 customer support",
        ].map((f) => (
          <div key={f} className="flex items-center gap-3">
            <div
              className="flex-shrink-0 rounded-full flex items-center justify-center"
              style={{
                width: 22,
                height: 22,
                background: "rgba(0,221,239,0.15)",
                border: "1.5px solid var(--teal)",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="var(--teal)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
