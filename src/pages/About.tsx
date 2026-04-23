import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-black mb-6">Our <span className="text-teal-500">Mission</span></h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          We built penniesusa to help people visualize the global marketplace. 
          Wealth is not an absolute number—it's relative to where you stand.
        </p>
      </motion.div>

      <div className="space-y-12">
        <section className="glass rounded-[2.5rem] p-10 border border-white/10">
          <h2 className="text-3xl font-black mb-6">Why PenniesUSA?</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              Information about the cost of living is often scattered, outdated, or buried in complex spreadsheets. 
              We believe financial freedom starts with clarity. 
            </p>
            <p>
              Whether you're a remote worker looking to stretch your dollar, a retiree seeking a more comfortable life, 
              or simply curious about the global economy, we provide the tools to see the world differently.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
           <div className="glass rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="text-teal-500" /> Headquartered
              </h3>
              <p className="text-slate-500">Virtual & Global. Our data nodes span every continent to bring you real local pricing.</p>
           </div>
           
           <div className="glass rounded-3xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail className="text-teal-500" /> Get in Touch
              </h3>
              <p className="text-slate-500">questions@penniesusa.com<br />support@penniesusa.com</p>
           </div>
        </section>

        <div className="flex justify-center gap-6">
           {[Twitter, Github].map((Icon, i) => (
             <a key={i} href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-teal-500 group transition-all">
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
             </a>
           ))}
        </div>
      </div>
    </div>
  );
};

export default About;
