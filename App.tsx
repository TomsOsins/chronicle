
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Marker } from './components/Marker';
import { DynamicBackground } from './components/DynamicBackground';
import { LeylineMap } from './components/LeylineMap';
import { DivineSynchron } from './components/DivineSynchron';
import { MercantileFlux } from './components/MercantileFlux';
import { SocialDynamics } from './components/SocialDynamics';
import { SteelGrid } from './components/SteelGrid';
import { generateCity } from './services/geminiService';
import { CityData, ViewMode, Ledger } from './types';
import { 
  RANDOM_PROMPTS, 
  LEDGER_PROCESSES, 
  STORAGE_KEYS, 
  DEFAULT_CITY 
} from './constants';

import { LedgerSelector } from './components/Sidebar/LedgerSelector';
import { CityList } from './components/Sidebar/CityList';
import { LoadingOverlay } from './components/MainDisplay/LoadingOverlay';
import { GeopoliticalView } from './components/MainDisplay/GeopoliticalView';
import { IdleDisplay } from './components/MainDisplay/IdleDisplay';

const CustomScrollbar: React.FC<{ scrollRef: React.RefObject<HTMLElement | null>, visible: boolean }> = ({ scrollRef, visible }) => {
  const thumbRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl || !thumbRef.current || !labelRef.current || !visible) return;

    let frameId: number;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const progress = scrollTop / (scrollHeight - clientHeight || 1);
      const thumbHeightRatio = clientHeight / scrollHeight;
      const thumbHeightPct = Math.max(thumbHeightRatio * 100, 10);
      
      if (thumbRef.current) {
        thumbRef.current.style.height = `${thumbHeightPct}%`;
        thumbRef.current.style.top = `${progress * (100 - thumbHeightPct)}%`;
      }
      if (labelRef.current) {
        labelRef.current.style.top = `${progress * (100 - thumbHeightPct)}%`;
        labelRef.current.textContent = `POS_${Math.floor(progress * 100).toString().padStart(3, '0')}`;
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [scrollRef, visible]);

  if (!visible) return null;

  return (
    <div className="absolute left-[calc(100%+15px)] top-16 bottom-16 w-[2px] z-[60] bg-[#FF2C2C]/10 pointer-events-none">
       <div 
         ref={thumbRef}
         className="absolute left-[-1px] right-[-1px] bg-[#FF2C2C] shadow-[0_0_15px_rgba(255,44,44,0.3)] transition-all duration-75"
         style={{ minHeight: '40px' }}
       />
       <div 
         ref={labelRef}
         className="absolute -left-14 mono text-[10px] text-[#FF2C2C]/60 font-black tracking-widest uppercase origin-right rotate-[-90deg] transition-all duration-75"
       >
          POS_000
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GEOPOLITICAL);
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isInscriptionExpanded, setIsInscriptionExpanded] = useState(true);
  const [inputPrompt, setInputPrompt] = useState(() => 
    RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)]
  );
  
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'city' | 'ledger', id: string, name: string } | null>(null);

  const [ledgers, setLedgers] = useState<Ledger[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEDGERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [{ id: 'genesis-001', name: 'GENESIS CHRONICLE', era: '1ST ERA', cycle: '01' }];
  });

  const [activeLedgerId, setActiveLedgerId] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_LEDGER);
    if (saved && ledgers.some(l => l.id === saved)) return saved;
    return (ledgers.length > 0 ? ledgers[0].id : null);
  });
  
  const [savedCities, setSavedCities] = useState<CityData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CITIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [DEFAULT_CITY];
  });
  
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newLedger, setNewLedger] = useState({ name: '', era: '', cycle: '' });

  const activeLedger = useMemo(() => ledgers.find(l => l.id === activeLedgerId) || null, [ledgers, activeLedgerId]);
  const chartedCitiesInLedger = useMemo(() => savedCities.filter(c => c.ledgerId === activeLedgerId), [savedCities, activeLedgerId]);
  const selectedCity = useMemo(() => savedCities.find(c => c.id === selectedCityId) || null, [savedCities, selectedCityId]);

  const mainScrollRef = useRef<HTMLElement>(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LEDGERS, JSON.stringify(ledgers)); }, [ledgers]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CITIES, JSON.stringify(savedCities)); }, [savedCities]);
  useEffect(() => { 
    if (activeLedgerId) localStorage.setItem(STORAGE_KEYS.ACTIVE_LEDGER, activeLedgerId);
  }, [activeLedgerId]);

  useEffect(() => {
    if (!loading) setIsInscriptionExpanded(selectedCityId === null);
  }, [selectedCityId, loading]);

  const cityDataRef = useRef<CityData | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const handleGenerate = async () => {
    if (!activeLedger) return;
    setLoading(true);
    setSelectedCityId(null);
    setOverallProgress(0);
    setCurrentProcessIndex(0);
    cityDataRef.current = null;

    const apiPromise = generateCity(inputPrompt);
    let progress = 0;
    
    progressIntervalRef.current = window.setInterval(() => {
      const dataArrived = !!cityDataRef.current;
      if (!dataArrived) {
        if (progress < 40) progress += Math.random() * 2.5 + 0.8;
        else if (progress < 75) progress += Math.random() * 1.2 + 0.3;
        else if (progress < 92) progress += Math.random() * 0.4 + 0.1;
        else if (progress < 99) progress += Math.random() * 0.05;
      } else {
        progress += (100 - progress) * 0.2 + 2; 
      }

      if (progress >= 100) {
        if (dataArrived) {
          const newCity = { ...cityDataRef.current!, id: crypto.randomUUID(), ledgerId: activeLedger.id };
          setSavedCities(prev => [...prev, newCity]);
          setSelectedCityId(newCity.id);
          setViewMode(ViewMode.GEOPOLITICAL);
          setLoading(false);
          clearInterval(progressIntervalRef.current!);
        }
      }
      setOverallProgress(Math.floor(progress));
      setCurrentProcessIndex(Math.min(Math.floor((progress / 100) * LEDGER_PROCESSES.length), LEDGER_PROCESSES.length - 1));
    }, 100);

    try {
      cityDataRef.current = await apiPromise;
    } catch (error) {
      setLoading(false);
      clearInterval(progressIntervalRef.current!);
      alert("IMPERIAL PROTOCOL FAILURE: Archive link severed.");
    }
  };

  const handleAddLedger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLedger.name) return;
    const ledger: Ledger = {
      id: crypto.randomUUID(),
      name: newLedger.name.toUpperCase(),
      era: newLedger.era.toUpperCase() || '4TH ERA',
      cycle: newLedger.cycle.toUpperCase() || '01'
    };
    setLedgers(prev => [...prev, ledger]);
    setActiveLedgerId(ledger.id);
    setIsLedgerModalOpen(false);
    setNewLedger({ name: '', era: '', cycle: '' });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'city') {
      setSavedCities(prev => prev.filter(c => c.id !== deleteTarget.id));
      if (selectedCityId === deleteTarget.id) setSelectedCityId(null);
    } else if (deleteTarget.type === 'ledger') {
      const remainingLedgers = ledgers.filter(l => l.id !== deleteTarget.id);
      setLedgers(remainingLedgers);
      setSavedCities(prev => prev.filter(c => c.ledgerId !== deleteTarget.id));
      if (activeLedgerId === deleteTarget.id) {
        setActiveLedgerId(remainingLedgers.length > 0 ? remainingLedgers[0].id : null);
        setSelectedCityId(null);
      }
    }
    setDeleteTarget(null);
  };

  const cleanCoord = (coord: string) => coord.split(' (')[0];

  return (
    <div className="w-screen h-screen flex items-center justify-center p-4 relative overflow-hidden inter">
      <DynamicBackground seed={selectedCity?.name || 'initial'} loading={loading} />

      {deleteTarget && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4" onClick={() => setDeleteTarget(null)}>
           <div className="bg-[#121212] w-full max-w-[400px] p-8 border-t-4 border-[#FF2C2C] relative" onClick={e => e.stopPropagation()}>
              <div className="mb-6">
                <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-1">Archive Protocol</div>
                <div className="six-caps text-6xl text-[#F4F1EA] uppercase leading-tight">Irrevocable Erasure</div>
              </div>
              <div className="p-3 border border-white/10 bg-white/5 mb-6">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF2C2C]/50 mono mb-1">
                  {deleteTarget.type === 'ledger' ? 'Ledger' : 'City Record'}
                </div>
                <div className="text-[11px] font-black uppercase text-[#F4F1EA] mono truncate">{deleteTarget.name}</div>
                {deleteTarget.type === 'ledger' && (
                  <div className="text-[9px] text-[#F4F1EA]/30 mono mt-1 uppercase">All cities in this ledger will be purged</div>
                )}
              </div>
              <div className="space-y-3">
                 <button onClick={confirmDelete} className="w-full bg-[#FF2C2C] text-white py-3 text-[11px] font-black uppercase mono hover:bg-white hover:text-[#FF2C2C] transition-colors">Confirm Erasure</button>
                 <button onClick={() => setDeleteTarget(null)} className="w-full bg-transparent border border-white/20 text-[#F4F1EA]/60 py-3 text-[11px] font-black uppercase mono hover:border-[#F4F1EA]/40 hover:text-[#F4F1EA] transition-colors">Cancel</button>
              </div>
           </div>
        </div>
      )}

      {isLedgerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4" onClick={() => setIsLedgerModalOpen(false)}>
          <div className="bg-[#121212] w-full max-w-[360px] p-8 border-t-4 border-[#FF2C2C] relative" onClick={e => e.stopPropagation()}>
            <div className="mb-8">
              <div className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-1">Archive Protocol</div>
              <div className="flex justify-between items-end">
                <h2 className="six-caps text-7xl text-[#F4F1EA] leading-tight uppercase">New Ledger</h2>
                <button onClick={() => setIsLedgerModalOpen(false)} className="text-[#F4F1EA]/30 hover:text-[#FF2C2C] font-black uppercase text-[11px] mono transition-colors pb-1">[ ESC ]</button>
              </div>
            </div>
            <form onSubmit={handleAddLedger} className="space-y-5">
              <div>
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/30 mono block mb-2">Chronicle Identifier</label>
                <input required value={newLedger.name} onChange={e => setNewLedger({...newLedger, name: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-[11px] font-bold uppercase text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors" placeholder="NORTHERN CAMPAIGNS..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/30 mono block mb-2">Era</label>
                  <input value={newLedger.era} onChange={e => setNewLedger({...newLedger, era: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-[11px] font-bold uppercase text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors" placeholder="4TH ERA" />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/30 mono block mb-2">Cycle</label>
                  <input value={newLedger.cycle} onChange={e => setNewLedger({...newLedger, cycle: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-[11px] font-bold uppercase text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors" placeholder="01" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#FF2C2C] text-white py-4 text-[11px] font-black uppercase tracking-[0.3em] mono hover:bg-[#F4F1EA] hover:text-[#121212] transition-colors mt-2">Authorize Inscription</button>
            </form>
          </div>
        </div>
      )}

      <div className="relative max-w-[1180px] w-full">
        <CustomScrollbar scrollRef={mainScrollRef} visible={!loading} />

        <div className="w-full h-[720px] rounded-[24px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] relative z-10 ring-[8px] ring-[#121212] ring-inset bg-black transform translate-z-0 isolation-auto">
          <div className="grid grid-cols-[340px_1fr] h-full w-full">
            <aside className="flex flex-col bg-[#121212] relative border-r-2 border-[#121212] overflow-hidden rounded-l-[18px]">
              <div className="flex-1 bg-[#F4F1EA] flex flex-col pt-14 pb-8 px-10 relative rounded-tl-[18px] overflow-hidden min-h-0">
                <Marker position="tl" /> 
                <header className="mb-0 text-center relative z-10">
                  <div className="h-[100px]">
                    <h1 className="six-caps text-[8.5rem] leading-[0.75] font-normal tracking-[-2px] uppercase scale-y-[1.25] text-[#121212] text-center w-full origin-top">CHRONICLE</h1>
                  </div>
                  <LedgerSelector 
                    ledgers={ledgers} 
                    activeLedger={activeLedger} 
                    isOpen={isDropdownOpen}
                    loading={loading}
                    onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                    onSelect={(id) => { setActiveLedgerId(id); setSelectedCityId(null); setIsDropdownOpen(false); }}
                    onNew={() => { setIsLedgerModalOpen(true); setIsDropdownOpen(false); }}
                    onDelete={(l) => setDeleteTarget({ type: 'ledger', id: l.id, name: l.name })}
                  />
                </header>

                <div className="flex-1 overflow-y-auto mt-6 pr-2 relative z-0 scroll-smooth scrollbar-hide">
                  <CityList 
                    cities={chartedCitiesInLedger}
                    selectedCityId={selectedCityId}
                    viewMode={viewMode}
                    loading={loading}
                    onSelectCity={setSelectedCityId}
                    onSetViewMode={setViewMode}
                  />
                </div>
              </div>

              <div className={`relative z-40 bg-[#121212] transition-all duration-500 ease-in-out flex flex-col overflow-hidden rounded-bl-[18px] ${isInscriptionExpanded ? 'max-h-[440px]' : 'max-h-[56px]'}`}>
                 <button 
                   onClick={() => setIsInscriptionExpanded(!isInscriptionExpanded)} 
                   className="w-full flex justify-between items-center py-4 px-10 shrink-0 hover:bg-white/5 transition-colors"
                 >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${loading ? 'bg-yellow-400' : 'bg-[#FF2C2C]'}`} />
                      <div className="text-[11px] font-black uppercase text-[#F4F1EA] mono tracking-[0.2em]">Survey Inscription</div>
                    </div>
                    <span className={`text-[#FF2C2C] transition-transform duration-500 transform ${isInscriptionExpanded ? 'rotate-180' : ''}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                      </svg>
                    </span>
                 </button>

                 <div className={`px-10 py-4 space-y-4 transition-opacity duration-300 ${isInscriptionExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="space-y-2">
                       <div className="text-[10.5px] font-black text-[#FF2C2C] mono uppercase tracking-[0.2em]">Core Directive</div>
                       <textarea 
                         value={inputPrompt} 
                         onChange={(e) => setInputPrompt(e.target.value)} 
                         disabled={loading || !activeLedger} 
                         className="w-full bg-[#F4F1EA]/5 border border-[#F4F1EA]/10 p-3 text-[11px] uppercase font-bold text-[#F4F1EA] focus:outline-none h-24 resize-none mono focus:border-[#FF2C2C]/50 transition-colors" 
                         placeholder="Scribe realm survey vector..." 
                       />
                    </div>

                    <div className="space-y-3 pb-2">
                       {selectedCity && (
                         <div className="p-3 border border-white/10 bg-white/5 space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="text-[10px] font-black text-[#FF2C2C] mono uppercase tracking-widest opacity-30 tracking-[0.4em]">Reference Unit</div>
                              <div className="text-[10px] font-bold text-[#F4F1EA] opacity-30 mono uppercase tracking-widest">{selectedCity.id.slice(0,8).toUpperCase()}</div>
                            </div>
                            <div className="text-[11px] font-black text-[#F4F1EA] uppercase mono truncate">{selectedCity.name}</div>
                            <div className="flex justify-between items-center pt-1 border-t border-white/5">
                              <div className="text-[10px] font-bold text-[#F4F1EA] opacity-40 mono uppercase tracking-tight">Sync_Coord</div>
                              <div className="text-[10px] font-bold text-[#FF2C2C] mono">{cleanCoord(selectedCity.latitude)} // {cleanCoord(selectedCity.longitude)}</div>
                            </div>
                         </div>
                       )}

                       <button 
                         onClick={handleGenerate} 
                         disabled={loading || !activeLedger} 
                         className="w-full bg-[#FF2C2C] text-white py-4 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#F4F1EA] hover:text-[#121212] disabled:opacity-30 mono transition-all shadow-xl active:scale-95"
                       >
                         {loading ? 'COMPILING REALM...' : 'EXECUTE INSCRIPTION'}
                       </button>
                    </div>
                 </div>
              </div>
            </aside>

            <main 
              ref={mainScrollRef}
              className={`bg-[#121212] text-[#F4F1EA] pt-14 pb-14 px-12 relative rounded-r-[18px] scroll-smooth ${loading ? 'overflow-hidden' : 'overflow-y-auto scrollbar-hide'}`}
            >
              <Marker position="tr" />
              <Marker position="br" />
              
              {loading && <LoadingOverlay currentProcessIndex={currentProcessIndex} overallProgress={overallProgress} />}

              {!selectedCity && !loading && (
                <IdleDisplay />
              )}

              {selectedCity && !loading && (
                <div className="animate-in fade-in duration-1000">
                  <header className="mb-0 flex justify-between items-start">
                    <div className="h-[100px]">
                      <h2 className="six-caps text-[8.5rem] leading-[0.75] font-normal tracking-[-2px] uppercase scale-y-[1.25] text-[#FF2C2C] origin-top-left">
                        {selectedCity.name}
                      </h2>
                    </div>

                    <div className="text-[11px] uppercase tracking-[0.3rem] font-black text-[#F4F1EA] opacity-40 mono text-right whitespace-nowrap pt-2">
                      SURVEY-ID: {selectedCity.id.slice(0, 8).toUpperCase()}
                    </div>
                  </header>

                  <div className="flex justify-between items-center mt-20 border-y border-[#FF2C2C]/40 py-3 px-0">
                    <p className="text-[11px] font-black uppercase text-[#F4F1EA] mono">{selectedCity.title}</p>
                    <span className="text-[11px] font-bold text-[#F4F1EA] opacity-40 mono">COORD: {cleanCoord(selectedCity.latitude)} / {cleanCoord(selectedCity.longitude)}</span>
                  </div>

                  <div className="mt-12">
                    {viewMode === ViewMode.GEOPOLITICAL && <GeopoliticalView city={selectedCity} />}
                    {viewMode === ViewMode.MAP && <div className="h-[550px]"><LeylineMap nodes={selectedCity.leylineNodes} magicLevel={selectedCity.magicLevel} /></div>}
                    {viewMode === ViewMode.DIVINE && <DivineSynchron theology={selectedCity.theology} />}
                    {viewMode === ViewMode.ECONOMY && <MercantileFlux mercantile={selectedCity.mercantile} />}
                    {viewMode === ViewMode.SOCIETY && <SocialDynamics society={selectedCity.society} />}
                    {viewMode === ViewMode.STEEL && <SteelGrid infrastructure={selectedCity.infrastructure} />}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
