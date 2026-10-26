"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiFacebookFill, RiInstagramFill } from "react-icons/ri";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AUTH_ROUTES = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
]);

const SITEMAP = [
  { href: "/about", label: "About" },
  { href: "/listings", label: "View Truck Listings" },
  { href: "/sell", label: "Sell My Truck" },
  { href: "/contact", label: "Contact" },
] as const;

const CONTACT = [
  { href: "tel:+13109629113", label: "+1 310-962-9113" },
  { href: "mailto:info@norcaltrucktrade.com", label: "info@norcaltrucktrade.com" },
  { href: "https://www.norcaltrucktrade.com", label: "www.norcaltrucktrade.com" },
] as const;

const SOCIALS = [
  {
    href: "https://www.instagram.com/so.caltrucktrade/",
    label: "Instagram",
    icon: RiInstagramFill,
    className: "bg-brand text-white",
  },
  {
    href: "https://www.facebook.com/profile.php?id=61595326367446",
    label: "Facebook",
    icon: RiFacebookFill,
    className: "bg-white/20 text-white",
  },
] as const;

export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const isAuthPage =
    AUTH_ROUTES.has(pathname) || pathname.startsWith("/dashboard");

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const cols = footer.querySelectorAll("[data-footer-col]");
      const bottom = footer.querySelector("[data-footer-bottom]");

      if (reduced) {
        gsap.set([cols, bottom], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(cols, { autoAlpha: 0, y: 28 });
      gsap.set(bottom, { autoAlpha: 0, y: 16 });

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: footer,
          start: "top 88%",
          once: true,
        },
      });

      intro.to(cols, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
      });
      intro.to(bottom, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.25);
    },
    { scope: footerRef }
  );

  if (isAuthPage) return null;

  return (
    <footer ref={footerRef} className="bg-black text-white">
      <div className="container-site py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <div data-footer-col className="max-w-sm">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.webp"
                alt="NorCal Truck Trade"
                width={120}
                height={140}
                className="h-auto w-[80px] object-contain sm:w-[88px]"
              />
            </Link>
            <p className="mt-3 text-sm leading-snug text-white/70">
              NorCalTruckTrade is a truck-only marketplace based in Anaheim,
              California. Buy or sell semis, box trucks and pickups, and connect
              directly with buyers and sellers across California and nearby
              states.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              {SOCIALS.map(({ href, label, icon: Icon, className }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex size-9 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 ${className}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-semibold text-white sm:text-base">
              Sitemap
            </h3>
            <ul className="mt-2.5 flex flex-col gap-2">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-semibold text-white sm:text-base">
              Contact
            </h3>
            <ul className="mt-2.5 flex flex-col gap-2">
              {CONTACT.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-footer-bottom
          className="mt-5 flex flex-col items-center gap-x-3 gap-y-2 border-t border-white/15 pt-2.5 text-center text-[10px] sm:mt-6 sm:flex-row sm:flex-nowrap sm:gap-x-4 sm:text-left sm:text-xs"
        >
          <p className="shrink-0 text-white/45">
            ©Copyright 2026 Norcal All rights reserved.
          </p>
          <p className="min-w-0 text-center text-white/55 sm:flex-1">
            Design and develop by{" "}
            <a
              href="https://www.techcole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-red transition-colors hover:text-brand-red/85 hover:underline"
            >
              Techcole
            </a>
          </p>
          <p className="flex shrink-0 items-center gap-x-2.5 text-white/75 sm:gap-x-3">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="text-white/25" aria-hidden>
              |
            </span>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
