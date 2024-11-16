"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';

const Header = () =>{
  const isLoggedIn = useIsLoggedIn();

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
            Events
          </Link>
          <Link
            href="/public-goods"
            className="transition-colors hover:text-foreground"
          >
            Public goods funding
          </Link>
        </nav>
        <div className="flex items-center justify-end">
          {
            isLoggedIn && (
              <Link href="/create-event">
                <Button className="mr-2" size="lg" variant="secondary">
                  Create event
                </Button>
              </Link>
            )
          }
          <DynamicWidget />
        </div>
      </header>
    </div>
  );
}

export default Header;