import { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import {
  signaturePrograms,
  getSignatureProgram,
} from "@/lib/content/signature-programs";
import SignatureProgramClientContent from "./_components/SignatureProgramClientContent";

export function generateStaticParams() {
  return signaturePrograms.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getSignatureProgram(slug);

  if (!program) {
    return { title: "Program Not Found" };
  }

  return {
    title: `${program.title} | Signature Programs | Pragna Skin Clinic`,
    description: program.description,
  };
}

export default async function SignatureProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getSignatureProgram(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="overflow-x-hidden bg-white">
      <SignatureProgramClientContent program={program} />
      <Footer />
    </main>
  );
}
