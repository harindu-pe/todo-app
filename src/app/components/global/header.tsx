"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdArrowOutward, MdClose, MdMenu } from "react-icons/md";
import { RiBlazeFill } from "react-icons/ri";
import { Button } from "../ui/button";
import Logo from "@/components/global/logo";
import ThemeToggle from "@/components/global/theme-toggle";

const NavItems = [
  { link: "/", label: "Home" },
  { link: "/templates", label: "Templates" },
  { link: "/blog", label: "Blog" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="top-0 z-50 mx-auto max-w-6xl md:sticky lg:top-4 lg:opacity-90">
      <nav aria-label="Main Navigation">
        <ul className="bg-secondary flex flex-col justify-between rounded-b-sm px-4 py-2 md:flex-row lg:items-center lg:rounded-xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <RiBlazeFill size={30} className="text-primary" />
              <Logo name="Harindu | Web Dev" />
            </div>
            <div className="flex items-center md:hidden">
              <div className="mr-2">
                <ThemeToggle />
              </div>
              <button
                aria-expanded={open}
                aria-label="Open Menu"
                className="block rounded-lg border p-2 text-2xl text-slate-800"
                onClick={() => setOpen(true)}
              >
                <MdMenu />
              </button>
            </div>
          </div>
          <div
            className={cn(
              "bg-card fixed inset-0 z-50 flex flex-col items-center gap-6 pt-60 transition-transform duration-300 ease-in-out md:hidden",
              open ? "translate-x-0" : "translate-x-[100%]",
            )}
          >
            <button
              aria-label="Close Menu"
              aria-expanded={open}
              className="fixed right-4 top-3 block rounded-lg border p-2 text-2xl md:hidden dark:border-white"
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>
            {NavItems.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <Link
                    className="group relative block overflow-hidden rounded px-2 text-3xl font-bold"
                    href={link}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className={cn(
                        "bg-primary absolute inset-0 z-0 h-full rounded transition-transform duration-300 ease-in-out",
                        pathname === link ? "translate-y-8" : "translate-y-9",
                      )}
                    />
                    <span>{label}</span>
                  </Link>
                </li>
                {index < NavItems.length - 1 && (
                  <span
                    className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
            <li>
              <Button
                variant="special"
                className="group hover:scale-105"
                size="lg"
                asChild
              >
                <Link href="/contact" onClick={() => setOpen(false)}>
                  <div className="z-10 flex items-center">
                    Contact <MdArrowOutward className="inline-block" />
                  </div>
                  {/* Span only works with special variant */}
                  <span className="bg-primary group-active:bg-primary/80 absolute inset-0 z-0 translate-y-9 transition-transform duration-300 ease-in-out group-hover:translate-y-0 dark:translate-y-10" />
                </Link>
              </Button>
            </li>
          </div>
          <DesktopMenu pathname={pathname} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

function DesktopMenu({ pathname }: { pathname: string }) {
  return (
    <div className="">
      <ul className="relative z-50 hidden flex-row items-center gap-2 bg-transparent py-0 md:flex">
        {NavItems.map(({ link, label }, index) => (
          <React.Fragment key={label}>
            <li className="flex items-center gap-3">
              <Link
                className={cn(
                  "focus:ring-primary group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900 focus:outline-none focus:ring focus:ring-offset-1",
                )}
                href={link}
              >
                <span
                  className={cn(
                    "bg-primary group-active:bg-primary/80 absolute inset-0 z-0 h-full rounded  transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                    pathname === link ? "translate-y-6" : "translate-y-8",
                  )}
                />
                <span className="relative">{label}</span>
              </Link>
              {index < NavItems.length - 1 && (
                <span
                  className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </li>
          </React.Fragment>
        ))}

        <li>
          <Button
            variant="special"
            className="group z-10 mx-4 hover:scale-105"
            asChild
          >
            <Link href="/contact">
              <div className="z-10 flex items-center">
                Contact <MdArrowOutward className="inline-block" />
              </div>
              {/* Span only works with special variant */}
              <span className="bg-primary group-active:bg-primary/80 absolute inset-0 z-0 translate-y-9 transition-transform duration-300 ease-in-out group-hover:translate-y-0 dark:translate-y-10" />
            </Link>
          </Button>
        </li>

        <li>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
}
