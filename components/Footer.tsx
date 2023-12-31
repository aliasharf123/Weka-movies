"use client";

import Image from "next/image";
import logo from "../public/static/large-WOMJa9L29-transformed.png";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  return (
    <div
      className={`bg-HeaderColor text-white mt-16 ${
        pathname.endsWith("signin") && "hidden"
      }`}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-1 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              width={80}
              height={80}
              className="h-12  w-12"
              alt="weka"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Weka Movie
            </span>
          </a>
          <ul className="flex flex-wrap gap-6 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Weka Movie™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  );
}

export default Footer;
