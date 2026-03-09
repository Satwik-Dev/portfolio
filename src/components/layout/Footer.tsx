export default function Footer() {
  return (
    <footer className="relative z-[2] px-[6vw] py-8 border-t border-glass-border
                        flex flex-col md:flex-row justify-between items-center gap-4
                        text-xs text-text-muted font-mono tracking-wider">
      <span>&copy; {new Date().getFullYear()} Satwik Alla — All rights reserved</span>
      <div className="flex items-center gap-4">
        <span>Engineered with precision &amp; obsession</span>
        <a
          href="/admin"
          className="text-text-muted/30 hover:text-accent transition-colors duration-300 no-underline"
          title="Admin"
        >
          ⚙
        </a>
      </div>
    </footer>
  )
}