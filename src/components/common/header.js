import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () =>{
  return (
    <div className="flex w-full flex-col">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 bg-background py-8 px-4 md:px-6">
        <Link href="/">
          <img className="w-[130px]" src="/logo.svg" alt="Commit logo" />
        </Link>
        <nav className="hidden text-[var(--text-color)] font-light flex-col gap-10 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-10">
          <Link
            href="/"
            className="text-[var(--text-color)] transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/recycle"
            className="transition-colors hover:text-foreground"
          >
            Events
          </Link>
          <Link
            href="/public-goods"
            className="transition-colors hover:text-foreground"
          >
            Communities
          </Link>
        </nav>
        <div className="w-[200px] flex items-center justify-end">
          <Button size="lg" variant="secondary">
            Login
          </Button>
        </div>
      </header>
    </div>
  );
}

export default Header;