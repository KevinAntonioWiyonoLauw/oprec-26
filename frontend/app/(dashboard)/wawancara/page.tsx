import Wawancara from "@/modules/wawancara/wawancara";
import Container from "@/components/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wawancara",
  description: "ISINYA WAWANCARA DEH",
};

export default function Page(): JSX.Element {
  return <Wawancara />;
}
