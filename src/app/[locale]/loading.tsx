export default function LocaleLoading() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden bg-primary/15"
    >
      <div className="h-full w-1/3 animate-[locale-loading_0.9s_ease-in-out_infinite] bg-primary" />
    </div>
  );
}
