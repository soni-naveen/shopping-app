"use client";

import React, { useState, Suspense, useEffect } from "react";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/app/lib/store";
import { useRouter, useSearchParams } from "next/navigation";

function NavbarContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore((state) => state.getTotalItems());
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", searchQuery.trim());
      router.push(`/?${params.toString()}`);
    }
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="sticky top-0 z-50 max-w-[1800px] mx-auto bg-blue-800 text-white p-4">
        <div className="mx-auto flex items-center justify-between">
          <div className="text-base xs:text-xl sm:text-2xl font-montserrat-medium">
            EzyKart
          </div>
          <div className="flex-1 max-w-md mx-4 sm:mx-8">
            <div className="relative">
              <div className="w-full border border-white/50 pl-7 xs:pl-10 pr-4 py-2 rounded-lg bg-transparent h-10"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-blue-900 px-3 sm:px-4 py-2 rounded-lg">
            <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="text-xs xs:text-sm sm:text-base">Cart</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 max-w-[1800px] mx-auto bg-blue-800 text-white p-4">
        <div className="mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-base xs:text-xl sm:text-2xl font-montserrat-medium"
          >
            <span className="hidden md:inline">EzyKart</span>
            <span className="md:hidden">EK</span>
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md mx-4 sm:mx-8"
          >
            <div className="relative">
              <Search className="absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 w-3 xs:w-4 h-3 xs:h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 xs:pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder:text-white/50 text-white outline-white/50 focus:outline-gray-200 outline-1 text-xs xs:text-sm sm:text-base"
              />
            </div>
          </form>

          <Link href="/cart" className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-900 px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute top-2 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-montserrat-medium">
                  {totalItems}
                </span>
              )}
              <span className="text-xs xs:text-sm sm:text-base">Cart</span>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-50 max-w-[1800px] mx-auto bg-blue-800 text-white p-4">
      <div className="mx-auto flex items-center justify-between">
        <div className="text-base xs:text-xl sm:text-2xl font-montserrat-medium">
          EzyKart
        </div>
        <div className="flex-1 max-w-md mx-4 sm:mx-8">
          <div className="relative">
            <div className="w-full border border-white/50 pl-7 xs:pl-10 pr-4 py-2 rounded-lg bg-transparent h-10"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-blue-900 px-3 sm:px-4 py-2 rounded-lg">
          <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-xs xs:text-sm sm:text-base">Cart</span>
        </div>
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <NavbarContent />
    </Suspense>
  );
}
