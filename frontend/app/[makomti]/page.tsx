import Makomti from "@/modules/beranda/makomti/Makomti";

interface PageProps {
  params: {
    makomti: string;
  };
}

export async function generateStaticParams() {
  return [
    { makomti: "himakom" },
    { makomti: "omahti" },
  ];
}

export default function Page({ params }: PageProps) {
  const { makomti } = params;

  return <Makomti makomti={makomti} />;
}