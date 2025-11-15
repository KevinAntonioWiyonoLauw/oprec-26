import Container from "@/components/Container";
import MiniFooter from "@/components/MiniFooter";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container
        className="flex flex-col items-center justify-center bg-custom-black"
        parentClass="min-h-screen"
      >
        {/* background gradients */}
        {/* ------------------------------------------ */}
        <div className="absolute inset-0 overflow-hidden">
          {/* DESIGN 1: mirip sidebar landing page */}
          {/* <div className="absolute inset-y-0 left-0 right-1/2 bg-custom-orange" />
          <div className="absolute inset-y-0 left-1/2 right-0 bg-custom-blue" />
          <div className="absolute inset-0 bg-gradient-to-t from-custom-black/95 to-custom-black/80" /> */}

          {/* DESIGN 2: default */}
          <div className="absolute right-[-5%] top-[-10%] h-[800px] w-[800px] rounded-full bg-custom-blue/10 blur-[120px]" />
          <div className="absolute bottom-[19%] left-[-10%] h-[600px] w-[600px] rounded-full bg-custom-orange/10 blur-[100px]" />
        </div>
        {/* ------------------------------------------ */}
        {children}
      </Container>
      <MiniFooter />
    </>
  );
};


export default Layout;
