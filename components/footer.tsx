export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-[var(--color-text-muted)]">© Inside The Stream</div>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
