"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Users, ArrowLeft, Star, 
  CheckCircle2, Calendar, ShieldCheck, Sparkles 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { dashboardApi } from '@/lib/api/dashboard.api';

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProgram();
  }, [params.programId]);

  const fetchProgram = async () => {
    try {
      const response = await dashboardApi.getProgram(params.programId as string);
      setProgram(response.data.program);
    } catch (error) {
      console.error('Error fetching program:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🛡️ Bulletproof image check for gallery
  const getSafeImages = () => {
    const fallback = "/featuredimgs/weekendtrips.webp";
    if (!program?.programImages || (Array.isArray(program.programImages) && program.programImages.length === 0)) {
      return [fallback];
    }
    const images = Array.isArray(program.programImages) ? program.programImages : [program.programImages];
    const filtered = images.filter((img: string) => typeof img === "string" && img.trim() !== "");
    return filtered.length > 0 ? filtered : [fallback];
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-10 h-10 border-2 border-gray-100 border-t-yellow-400 rounded-full animate-spin" />
    </div>
  );

  if (!program) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-light mb-4">Experience not found.</h1>
        <Link href="/programs" className="text-sm font-bold uppercase tracking-widest underline decoration-yellow-400">
          Go Back
        </Link>
      </div>
    </div>
  );

  const images = getSafeImages();

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 🧭 Minimal Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </button>
          <div className="px-4 py-1.5 bg-yellow-400 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {program.category || "Expedition"}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 🖼️ Left Column: Narrative & Gallery */}
          <div className="lg:col-span-8">
            <header className="mb-12">
              <div className="flex items-center gap-2 text-yellow-600 mb-4 font-bold text-[10px] uppercase tracking-[0.3em]">
                <MapPin size={14} />
                {program.location}
              </div>
              <h1 className="text-4xl md:text-6xl font-medium text-gray-900 leading-[1.1] mb-8 tracking-tight">
                {program.title}
              </h1>
            </header>

            {/* Premium Gallery */}
            <div className="space-y-6 mb-16">
              <div className="relative aspect-[16/9] w-full rounded-[1.5rem] overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[selectedImage]}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative min-w-[140px] h-24 rounded-xl overflow-hidden transition-all duration-500 ${
                      selectedImage === idx ? 'ring-2 ring-yellow-400 ring-offset-4 scale-95' : 'opacity-40 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Content */}
            <section className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-yellow-500" size={20} />
                <h2 className="text-2xl font-bold tracking-tight m-0 uppercase text-[12px] tracking-[0.2em]">The Experience</h2>
              </div>
              <p className="text-xl font-light text-gray-500 leading-relaxed mb-12 whitespace-pre-line">
                {program.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-20">
                {[
                  { icon: ShieldCheck, title: "Curated Safety", desc: "Hand-picked and verified hosts" },
                  { icon: CheckCircle2, title: "All Inclusive", desc: "Stay, meals, and local guidance" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-8 border border-gray-100 rounded-[2rem] hover:border-yellow-200 transition-colors">
                    <item.icon className="text-yellow-500 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Host Section */}
            {program.Host && (
              <section className="pt-16 border-t border-gray-50">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-gray-400">Your Guide</h3>
                <div className="flex items-center gap-8 p-10 bg-gray-50 rounded-[2.5rem]">
                  <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-black text-black shadow-inner">
                    {program.Host.name?.[0]}
                  </div>
                  <div>
                    <h4 className="text-2xl font-medium text-gray-900">{program.Host.name}</h4>
                    <p className="text-gray-500 mt-1">{program.Host.propertyName}</p>
                    {program.Host.hostRating && (
                      <div className="flex items-center gap-2 mt-4">
                        <Star size={14} fill="currentColor" className="text-yellow-500" />
                        <span className="text-xs font-bold tracking-tighter">{program.Host.hostRating.toFixed(1)} Rating</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* 💳 Right Column: Sticky Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="bg-white border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10">
         

                <div className="space-y-4 mb-10">
                  {[
                    { icon: Clock, label: "Duration", val: program.duration || '12 Days' },
                    { icon: Users, label: "Group Size", val: 'Max 12 People' },
                    { icon: Calendar, label: "Next Date", val: 'Dec 28, 2025' }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50">
                      <div className="flex items-center gap-3">
                        <stat.icon className="text-yellow-600" size={18} />
                        <span className="font-bold text-[11px] uppercase tracking-wider text-gray-400">{stat.label}</span>
                      </div>
                      <span className="text-gray-900 text-sm font-medium">{stat.val}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-yellow-400 hover:bg-black text-black hover:text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all duration-500 shadow-lg shadow-yellow-400/20 active:scale-95">
                  Request to Book
                </button>
                
                <p className="text-center text-[9px] text-gray-400 mt-6 font-bold uppercase tracking-widest">
                  Secure checkout • Instant Confirmation
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}