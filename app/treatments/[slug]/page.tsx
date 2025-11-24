import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { navigationData } from '@/lib/navigationData';

export function generateStaticParams() {
  const params: { slug: string | undefined }[] = [];
  for (const pillar of navigationData.treatments) {
    for (const category of pillar.categories) {
      for (const item of category.items) {
        params.push({ slug: item.href.split('/').pop() });
      }
    }
  }
  return params;
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let treatment;
  
  for (const pillar of navigationData.treatments) {
    for (const category of pillar.categories) {
      const found = category.items.find(t => t.href.endsWith(slug));
      if (found) {
        treatment = found;
        break;
      }
    }
    if (treatment) break;
  }

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <section className="pt-32 pb-20 bg-beige min-h-screen">
        <div className="section-container">
           <div className="w-full h-64 bg-terracotta/20 rounded-2xl mb-8 flex items-center justify-center">
            <p className="text-maroon/50 italic">Add photo/Add image: Hero for {treatment?.name}</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-maroon mb-6">
            {treatment?.name || 'Treatment'}
          </h1>
          <p className="text-lg text-charcoal/70">
            Detailed information about {treatment?.name} will be available soon.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
