"use client";
interface AutLayoutProps{
  title: string;
  subtitle?:string;
  children: React.ReactNode;
}
export default function AuthLayout({ title, subtitle, children }:AutLayoutProps) {
  return (
    <section className=" pt-18 min-h-screen flex bg-neutral-100">

      {/* LEFT SIDE CONTENT */}
      <div className="hidden md:flex w-1/2 bg-primary text-white flex-col justify-center items-center p-10 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg opacity-90">{subtitle}</p>
      </div>

      {/* RIGHT SIDE FORM SECTION */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          {children}
        </div>
      </div>

    </section>
  );
}
