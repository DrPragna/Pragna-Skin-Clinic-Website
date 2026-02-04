'use client';

import { SignatureProgram } from '@/lib/content/signature-programs';
import SignatureProgramsDirectory from './SignatureProgramsDirectory';
import MobileSignaturePrograms from './MobileSignaturePrograms';

interface SignatureProgramsClientProps {
  programs: SignatureProgram[];
}

export default function SignatureProgramsClient({ programs }: SignatureProgramsClientProps) {
  return (
    <>
      <div className="md:hidden">
        <MobileSignaturePrograms programs={programs} />
      </div>
      <div className="hidden md:block">
        <SignatureProgramsDirectory programs={programs} />
      </div>
    </>
  );
}
