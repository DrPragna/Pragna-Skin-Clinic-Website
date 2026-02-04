'use client';

import { SignatureProgram } from '@/lib/content/signature-programs';
import SignatureProgramClientContent from './SignatureProgramClientContent';
import MobileSignatureProgram from './MobileSignatureProgram';

interface SignatureProgramClientProps {
  program: SignatureProgram;
}

export default function SignatureProgramClient({ program }: SignatureProgramClientProps) {
  return (
    <>
      <div className="md:hidden">
        <MobileSignatureProgram program={program} />
      </div>
      <div className="hidden md:block">
        <SignatureProgramClientContent program={program} />
      </div>
    </>
  );
}
