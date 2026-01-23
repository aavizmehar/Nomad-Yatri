"use client";

import { useState, useEffect, useContext } from 'react'; // Added useContext
import { useParams, useRouter, usePathname } from 'next/navigation'; // Added usePathname
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, Users, ArrowLeft, Star,
  CheckCircle2, Calendar, ShieldCheck, Sparkles, Lock,Mail
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { dashboardApi } from '@/lib/api/dashboard.api';
import { volunteerApi } from '@/lib/api/volunteer.api';
import { AuthContext } from '@/context/AuthContext'; // Import your AuthContext
import { useDialog } from '@/hooks/useDialog';

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname(); // Get current path for redirect
  
  // 1. Access Auth State
  const { isLoggedIn, role } = useContext(AuthContext);

  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  // Dialog State
  const { showDialog, DialogComponent } = useDialog();

  useEffect(() => {
    const fetchProgramAndCheckStatus = async () => {
      try {
        setLoading(true);
        const programId = Number(params.programId);
        if (Number.isNaN(programId)) throw new Error("Invalid program ID");

        // Fetch program details
        const programResponse = await dashboardApi.getProgram(programId);
        setProgram(programResponse.data.program);

        // If user is a volunteer, check their application status
        if (isLoggedIn && role === 'volunteer') {
          const applicationsResponse = await volunteerApi.getMyApplications();
          const applications = applicationsResponse.data.applications || [];
          const alreadyApplied = applications.some((app: any) => app.programId === programId);
          setHasApplied(alreadyApplied);
        }
      } catch (error) {
        console.error('Error fetching program or application status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramAndCheckStatus();
  }, [params.programId, isLoggedIn, role]);

  // --- Logic for Application ---
  const handleApply = async () => {
    if (!isLoggedIn) {
      // Redirect to login and save current path to return later
      router.push(`/user/login?redirect=${pathname}`);
      return;
    }

    if (role === 'host') {
      showDialog("Account Type Error", "Host accounts cannot apply for programs. Please use a volunteer account.", "error");
      return;
    }

    try {
      setApplying(true);
      await volunteerApi.applyToProgram(program.programId);
      showDialog("Success", "Application sent successfully!", "success", () => {
        router.push('/volunteer/dashboard');
      });
    } catch (error: any) {
      console.error("Booking error:", error);
      showDialog("Error", error.message || "Failed to book program", "error");
    } finally {
      setApplying(false);
    }
  };


  const getSafeImages = () => {
    const fallback = "/featuredImgs/weekendtrips.webp";
    if (!program?.programImages) return [fallback];
    const images: string[] = (() => {
      if (Array.isArray(program.programImages)) {
        return program.programImages.filter((img: any): img is string => typeof img === "string" && img.trim() !== "");
      }
      if (typeof program.programImages === "string" && program.programImages.trim() !== "") return [program.programImages];
      return [];
    })();
    return images.length > 0 ? images : [fallback];
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
        <Link href="/programs" className="text-sm font-bold uppercase tracking-widest underline decoration-yellow-400">Go Back</Link>
      </div>
    </div>
  );

  const images = getSafeImages();

  return (
    <div className="min-h-screen bg-white pb-20">
      <DialogComponent />
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => router.back()} className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-all">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </button>
          <div className="px-4 py-1.5 bg-yellow-400 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {program.category || "Not specified"}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <header className="mb-12">
              <div className="flex items-center gap-2 text-yellow-600 mb-4 font-bold text-[10px] uppercase tracking-[0.3em]">
                <MapPin size={14} /> {program.location || "Not specified"}
              </div>
              <h1 className="text-4xl md:text-6xl font-medium text-gray-900 leading-[1.1] mb-8 tracking-tight">
                {program.title || "Untitled Program"}
              </h1>
            </header>

            {/* Image Gallery */}
            <div className="space-y-6 mb-16">
              <div className="relative aspect-[16/9] w-full rounded-[1.5rem] overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                    <Image src={images[selectedImage]} alt={program.title} fill className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {images.map((img, idx) => (
                  <button key={idx} onClick={() => setSelectedImage(idx)} className={`relative min-w-[140px] h-24 rounded-xl overflow-hidden transition-all duration-500 ${selectedImage === idx ? 'ring-2 ring-yellow-400 ring-offset-4 scale-95' : 'opacity-40 hover:opacity-100'}`}>
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Perks */}
            <section className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-yellow-500" size={20} />
                <h2 className="text-2xl font-bold tracking-tight m-0 uppercase text-[12px] tracking-[0.2em]">The Experience</h2>
              </div>
              <p className="text-xl font-light text-gray-500 leading-relaxed mb-12 whitespace-pre-line">{program.description || "No description available."}</p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-20">
                <div className="flex gap-5 p-8 border border-gray-100 rounded-[2rem] hover:border-yellow-200 transition-colors">
                  <ShieldCheck className="text-yellow-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Curated Safety</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Hand-picked and verified hosts</p>
                  </div>
                </div>
                <div className="flex gap-5 p-8 border border-gray-100 rounded-[2rem] hover:border-yellow-200 transition-colors">
                  <CheckCircle2 className="text-yellow-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">All Inclusive</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Stay, meals, and local guidance</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Action Area */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <div className="bg-white border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10">
                <div className="space-y-4 mb-10">
                  {[
                    { icon: Clock, label: "Duration", val: program.duration || 'N/A' },
                    { icon: Users, label: "Group Size", val: `Max ${program.maxVolunteers || 'N/A'} People` },
                    { icon: Calendar, label: "Next Date", val: new Date(program.createdAt).toLocaleDateString() || 'N/A' }
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

                {program.Host?.contact && (
                  <div className="mt-8 mb-8 pt-8 border-t border-gray-100">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Contact Host</h3>
                    <a href={`mailto:${program.Host.contact}`} className="flex items-center gap-2 text-gray-900 hover:text-yellow-600 transition-colors">
                      <Mail size={20} />
                      <span className="text-base font-medium">{program.Host.contact}</span>
                    </a>
                  </div>
                )}
                
                {/* --- Dynamic Button --- */}
                <button 
                  onClick={handleApply}
                  disabled={role === 'host' || applying || hasApplied}
                  className={`w-full py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all duration-500 shadow-lg active:scale-95 flex items-center justify-center gap-2
                    ${role === 'host' || hasApplied 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                      : "bg-yellow-400 hover:bg-black text-black hover:text-white shadow-yellow-400/20"}
                  `}
                >
                  {role === 'host' && <Lock size={14} />}
                  {isLoggedIn ? 
                    (role === 'host' ? "Hosts Cannot Apply" : 
                      (hasApplied ? "Already Applied" : 
                        (applying ? "Sending Request..." : "Request to Book"))) 
                    : "Login to Book"}
                </button>

                {role === 'host' && (
                  <p className="text-[10px] text-red-500 mt-4 text-center font-bold uppercase tracking-tighter">
                    Switch to a volunteer account to apply
                  </p>
                )}

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