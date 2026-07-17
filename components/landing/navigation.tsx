"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingBag, User, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getCategories } from "@/lib/products";

const navLinks = [
  { name: "Posters", href: "/collections/posters" },
  { name: "Stickers", href: "/collections/stickers" },
  { name: "Custom", href: "/custom" },
  { name: "About", href: "/about" },
];

const mobileLinks = [
  { name: "Collections", href: "/collections" },
  { name: "Posters", href: "/collections/posters" },
  { name: "Stickers", href: "/collections/stickers" },
  { name: "Custom Design", href: "/custom" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const { count, open: openCart } = useCart();

  const posterCategories = getCategories("poster");
  const stickerCategories = getCategories("sticker");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? "top-4 left-4 right-4" 
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
        onMouseLeave={() => setIsShopMenuOpen(false)}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className={`font-display tracking-tight transition-all duration-500 ${isScrolled ? "text-xl text-foreground" : "text-2xl text-white"}`}>STIKKY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {/* Shop mega-menu trigger */}
            <div
              className="relative"
              onMouseEnter={() => setIsShopMenuOpen(true)}
            >
              <Link
                href="/collections"
                className={`text-sm transition-colors duration-300 relative group flex items-center gap-1 ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"}`}
              >
                Collections
                <ChevronDown className="w-3.5 h-3.5" />
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-foreground" : "bg-white"}`} />
              </Link>

              {/* Mega menu panel */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${
                  isShopMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                <div className="w-[520px] bg-background border border-foreground/10 rounded-2xl shadow-xl p-8 grid grid-cols-2 gap-8">
                  <div>
                    <Link
                      href="/collections/posters"
                      onClick={() => setIsShopMenuOpen(false)}
                      className="text-sm font-medium text-foreground hover:text-stikky-orange transition-colors"
                    >
                      Posters
                    </Link>
                    <ul className="mt-4 space-y-3">
                      {posterCategories.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/collections/posters?category=${c.slug}`}
                            onClick={() => setIsShopMenuOpen(false)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Link
                      href="/collections/stickers"
                      onClick={() => setIsShopMenuOpen(false)}
                      className="text-sm font-medium text-foreground hover:text-stikky-orange transition-colors"
                    >
                      Stickers
                    </Link>
                    <ul className="mt-4 space-y-3">
                      {stickerCategories.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/collections/stickers?category=${c.slug}`}
                            onClick={() => setIsShopMenuOpen(false)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/custom"
                    onClick={() => setIsShopMenuOpen(false)}
                    className="col-span-2 flex items-center justify-between border-t border-foreground/10 pt-6 text-sm group"
                  >
                    <span>Design something fully custom</span>
                    <span className="text-stikky-orange group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 relative group ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-foreground" : "bg-white"}`} />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/account"
              aria-label="Account"
              className={`transition-colors duration-500 ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"}`}
            >
              <User className="w-[18px] h-[18px]" />
            </Link>
            <button
              onClick={openCart}
              aria-label="Open cart"
              className={`relative transition-colors duration-500 ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"}`}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-stikky-orange text-white text-[9px] font-mono flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <Button
              asChild
              size="sm"
              className={`rounded-full transition-all duration-500 ${isScrolled ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs" : "bg-white hover:bg-white/90 text-black px-6"}`}
            >
              <Link href="/collections">Shop Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={openCart}
              aria-label="Open cart"
              className={`relative transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-stikky-orange text-white text-[9px] font-mono flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8 overflow-y-auto">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            {mobileLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Bottom CTAs */}
          <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/account">Account</Link>
            </Button>
            <Button
              asChild
              className="flex-1 bg-stikky-orange hover:brightness-110 text-white rounded-full h-14 text-base"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/collections">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
