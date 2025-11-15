import Image from "next/image";
import Link from "next/link";
import github from "@/assets/icons/github.svg";
import x from "@/assets/icons/x.svg";

const FOOTER_LINKS = [
  {
    href: "/",
    tag: "Home",
    newTab: false,
  },
  {
    href: "https://omahti.web.id",
    tag: "OmahTI",
    newTab: true,
  },
  {
    href: "https://himakom.ugm.ac.id",
    tag: "Himakom",
    newTab: true,
  },
];

const MiniFooter = () => {
  return (
    <footer className="flex w-full flex-col gap-6 border-t border-custom-gray-dark bg-custom-black p-6 px-[10%] text-sm text-custom-gray-light">
      <p>2024 © MAKOMTI</p>

      <div className="flex gap-8">
        <div className="flex gap-1">
          {/* social media */}
          <Link
            href={`https://github.com/OmahTI-UGM`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={github}
              className="h-4 text-custom-gray-light"
              alt="Github Logo"
            />
          </Link>

          <Link
            href={`https://x.com/omahti_ugm`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={x}
              className="h-4 text-custom-gray-light"
              alt="Github Logo"
            />
          </Link>
        </div>

        {/* other links */}
        {FOOTER_LINKS.map((link, index) => (
          <Link
            href={link.href}
            className="text-custom-gray-light transition-colors hover:text-white"
            target={link.newTab ? "_blank" : undefined}
            rel={link.newTab ? "noopener noreferrer" : undefined}
            key={index}
          >
            {link.tag}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default MiniFooter;
