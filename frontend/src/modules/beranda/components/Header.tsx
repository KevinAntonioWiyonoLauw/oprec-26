const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="mx-auto mb-4 lg:mb-6 text-center font-semibold text-custom-silver sm:text-xl lg:text-3xl">
      {children}
    </h1>
  );
};

export default Header;
