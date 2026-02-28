'use client';

import React, { useState } from 'react';
import { Search, Compass, Loader2, Sparkles, Ship, Info } from 'lucide-react';
import VesselCard from '@/components/VesselCard';

export default function Home() {
  const [mission, setMission] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mission_statement: mission }),
      });

      if (!response.ok) throw new Error('Failed to fetch results');

      const data = await response.json();
      setResults(data.results);
      setHasSearched(true);
    } catch (error) {
      console.error('Error:', error);
      // Fallback or error handling
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[100px]" />
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-slate-200/50 backdrop-blur-sm sticky top-0 bg-white/50 z-50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-900 rounded-lg text-white">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Research Vessel Discovery & Matching</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
          <a href="#" className="hover:text-blue-600 transition-colors">Vessel Fleet</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Missions</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Foundation</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Greenwater Foundation Researchers
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Find the Perfect Vessel for Your <span className="text-blue-600">Oceanographic Mission.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Our CrewAI-powered multi-agent system analyzes your mission requirements, scouts global maritime registries, and matches you with the ideal research vessel in seconds.
          </p>
        </div>

        {/* Search Interface */}
        <div className="p-1 px-1 bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-500 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <form onSubmit={handleSearch} className="relative bg-white/95 backdrop-blur-sm rounded-[22px] overflow-hidden">
            <div className="p-4 md:p-8 space-y-4">
              <label htmlFor="mission" className="block text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" /> Enter Your Mission Statement
              </label>
              <textarea
                id="mission"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                placeholder='e.g., "I need a vessel for deep-sea ROV operations in the Pacific for June 2026. Required equipment: A-Frame, ROV Crane, and 4,000m depth capability."'
                className="w-full h-40 md:h-48 bg-transparent text-xl md:text-2xl font-medium text-slate-800 placeholder-slate-300 border-none focus:ring-0 resize-none transition-all duration-300"
              />
            </div>
            <div className="flex md:items-center justify-between p-4 md:p-8 bg-slate-50 border-t border-slate-100 gap-4 flex-col md:row">
              <p className="text-xs font-medium text-slate-400 max-w-md">
                Agents will cross-reference Mission Requirements, Vessel Scouts, and Operating Regions to find your match.
              </p>
              <button
                type="submit"
                disabled={isLoading || !mission.trim()}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Mission...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Search Vessels
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results Dashboard */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-6 py-20 text-center animate-pulse">
          <div className="inline-flex p-4 bg-blue-50 rounded-2xl mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-slate-500 font-medium">Agents are scouting maritime registries...</p>
        </div>
      ) : hasSearched && results.length === 0 ? (
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200">
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="inline-flex p-4 bg-amber-50 rounded-2xl">
              <Ship className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">No Match Found</h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              Our agents couldn't find a vessel matching your exact specifications.
              Try broadening your mission requirements or checking a different operating region.
            </p>
          </div>
        </section>
      ) : results.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <Ship className="w-5 h-5 text-blue-600 fill-blue-600/20" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Top Vessel Matches</h2>
              </div>
              <p className="text-slate-500 font-medium">Found {results.length} vessels matching your mission requirements.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm">Region: Search Results</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {results.map((vessel, index) => (
              <VesselCard key={index} {...vessel} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-20 mt-20 border-t border-slate-200 text-center space-y-6">
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <span className="text-sm font-bold uppercase tracking-widest pointer-events-none opacity-50">Powered By</span>
          <div className="h-4 w-px bg-slate-200" />
          <p className="text-sm border-b-2 border-slate-400 pb-0.5 font-bold tracking-tight text-slate-800">CrewAI Multi-Agent System</p>
        </div>
        <p className="text-sm text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
          &copy; 2026 Research Vessel Discovery & Matching. <br />
          Built for the Greenwater Foundation Oceanographic Research Initiative.
        </p>
      </footer>
    </main>
  );
}
