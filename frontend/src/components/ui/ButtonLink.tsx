import Link from "next/link";
import { Button } from "./button";

interface ButtonLinkProps {
  className?: string;
  children: React.ReactNode;
  href?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  className,
  children,
  href = '/',
}) => {

  return (
    <Link href={href} className={`z-50 ${className}`}>
      <Button 
        variant="secondary" 
        className="flex text-base items-center hover:bg-custom-silver hover:text-custom-black transition-all active:scale-95"
      >
        {children}
      </Button>
    </Link>
  );
};

export default ButtonLink;
