const Container = ({ children, border = false, className = "", parentClass = "" }: {children: React.ReactNode, border?: boolean, className?: string, parentClass?: string}) => {
  // Check if parentClass already has padding
  const paddingClass = parentClass.includes("py-") ? "" : "py-8";
  
  return (
    <div
      className={`relative px-[min(5vw,32px)] flex w-full justify-center bg-custom-black ${border && 'border-b-2 border-custom-gray-dark'} ${paddingClass} ${parentClass}`}
    >
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  );
};

export default Container;