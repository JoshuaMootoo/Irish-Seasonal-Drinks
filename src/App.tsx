/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Calendar, 
  RefreshCw, 
  Heart, 
  MapPin, 
  Info,
  Moon,
  SunMedium,
  Beer,
  Wine,
  Coffee,
  GlassWater,
  Trash2,
  ChefHat,
  GlassWater as GlassIcon,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Season, Weather, Temperature, Drink, WeatherData } from './types';
import { drinks } from './data/drinks';
import { getIrishSeason, getSeasonFestival } from './utils/seasonal';

// Celtic Knot SVG Component for decoration
const CelticKnot = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50 10 C 30 10, 10 30, 10 50 C 10 70, 30 90, 50 90 C 70 90, 90 70, 90 50 C 90 30, 70 10, 50 10 Z M50 20 C 65 20, 80 35, 80 50 C 80 65, 65 80, 50 80 C 35 80, 20 65, 20 50 C 20 35, 35 20, 50 20 Z" />
    <path d="M30 30 L70 70 M70 30 L30 70" />
  </svg>
);

export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDrink, setCurrentDrink] = useState<Drink | null>(null);
  const [favourites, setFavourites] = useState<Drink[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'recipe'>('info');

  // Load favourites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('irish_drinks_favourites');
    if (saved) {
      try {
        setFavourites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favourites', e);
      }
    }
  }, []);

  // Save favourites to local storage
  useEffect(() => {
    localStorage.setItem('irish_drinks_favourites', JSON.stringify(favourites));
  }, [favourites]);

  const mapWeatherCode = (code: number): Weather => {
    if (code === 0) return 'clear';
    if ([1, 2, 3, 45, 48].includes(code)) return 'cloudy';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) return 'rainy';
    return 'any';
  };

  const getTemperatureCategory = (temp: number): Temperature => {
    if (temp < 10) return 'cold';
    if (temp < 20) return 'mild';
    return 'warm';
  };

  const recommendDrink = useCallback((season: Season, temp: Temperature, condition: Weather) => {
    let filtered = drinks.filter(d => d.seasons.includes(season));
    const tempFiltered = filtered.filter(d => d.temperatures.includes(temp));
    if (tempFiltered.length > 0) filtered = tempFiltered;
    const weatherFiltered = filtered.filter(d => d.weathers.includes(condition) || d.weathers.includes('any'));
    if (weatherFiltered.length > 0) filtered = weatherFiltered;
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setCurrentDrink(filtered[randomIndex] || drinks[0]);
    setActiveTab('info');
  }, []);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      
      const weatherData: WeatherData = {
        temp: data.current_weather.temperature,
        condition: mapWeatherCode(data.current_weather.weathercode),
        city: 'Current Location'
      };
      
      setWeather(weatherData);
      const season = getIrishSeason();
      const tempCat = getTemperatureCategory(weatherData.temp);
      recommendDrink(season, tempCat, weatherData.condition);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [recommendDrink]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(53.3498, -6.2603)
      );
    } else {
      fetchWeather(53.3498, -6.2603);
    }
  }, [fetchWeather]);

  const toggleFavourite = (drink: Drink) => {
    if (favourites.some(f => f.id === drink.id)) {
      setFavourites(favourites.filter(f => f.id !== drink.id));
    } else {
      setFavourites([...favourites, drink]);
    }
  };

  const surpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * drinks.length);
    setCurrentDrink(drinks[randomIndex]);
    setActiveTab('info');
  };

  const currentSeason = getIrishSeason();
  const seasonFestival = getSeasonFestival(currentSeason);

  const WeatherIcon = ({ condition }: { condition: Weather }) => {
    switch (condition) {
      case 'clear': return <Sun className="text-amber-400" />;
      case 'cloudy': return <Cloud className="text-slate-400" />;
      case 'rainy': return <CloudRain className="text-blue-400" />;
      default: return <SunMedium className="text-amber-400" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${isDarkMode ? 'bg-[#0a1a0a] text-emerald-50' : 'bg-[#f4f9f4] text-slate-900'}`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-20 p-10">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i}>
              <CelticKnot className="w-full h-auto text-emerald-900" />
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 py-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-800 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-950/30 border-2 border-amber-400/30">
            <Beer className="text-amber-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-emerald-900 dark:text-emerald-400">Irish Seasonal Drinks</h1>
            <p className="text-xs opacity-70 font-bold uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-500">Traditional Celtic Wisdom</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-2xl transition-all border ${isDarkMode ? 'bg-slate-900 border-emerald-800 text-amber-400' : 'bg-white border-emerald-100 text-emerald-800 shadow-sm'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setShowFavourites(!showFavourites)}
            className={`p-3 rounded-2xl transition-all border relative ${isDarkMode ? 'bg-slate-900 border-emerald-800 text-amber-400' : 'bg-white border-emerald-100 text-emerald-800 shadow-sm'}`}
          >
            <Heart size={20} className={favourites.length > 0 ? 'fill-rose-500 text-rose-500 border-none' : ''} />
            {favourites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-emerald-950 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-emerald-50">
                {favourites.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <RefreshCw className="animate-spin text-emerald-700" size={50} />
              <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={20} />
            </div>
            <p className="font-serif text-xl italic text-emerald-800 dark:text-emerald-400">Consulting the ancient weather spirits...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 p-10 rounded-[2.5rem] text-center shadow-xl">
            <p className="text-rose-600 dark:text-rose-400 font-serif text-xl mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-emerald-800 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-950/20"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Context Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-[2.5rem] border-2 ${isDarkMode ? 'bg-slate-900/80 border-emerald-900/50' : 'bg-white border-emerald-100 shadow-xl shadow-emerald-900/5'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                    <Calendar className="text-emerald-700 dark:text-emerald-400" size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-500">The Season</span>
                </div>
                <h2 className="text-4xl font-serif font-bold mb-2 text-emerald-950 dark:text-emerald-100">{currentSeason}</h2>
                <p className="text-lg font-serif italic text-amber-600 dark:text-amber-400 mb-6">Festival of {seasonFestival}</p>
                <div className="h-2 w-full bg-emerald-100 dark:bg-emerald-950 rounded-full overflow-hidden border border-emerald-200 dark:border-emerald-900">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: currentSeason === 'Spring' ? '25%' : currentSeason === 'Summer' ? '50%' : currentSeason === 'Autumn' ? '75%' : '100%' }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" 
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className={`p-8 rounded-[2.5rem] border-2 ${isDarkMode ? 'bg-slate-900/80 border-emerald-900/50' : 'bg-white border-emerald-100 shadow-xl shadow-emerald-900/5'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                    <MapPin className="text-emerald-700 dark:text-emerald-400" size={20} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.15em] text-emerald-800 dark:text-emerald-500">Local Skies</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-5xl font-serif font-bold text-emerald-950 dark:text-emerald-100">{Math.round(weather?.temp || 0)}°C</div>
                    <p className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mt-1">{weather?.condition}</p>
                  </div>
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/50 rounded-[1.5rem] flex items-center justify-center border border-emerald-100 dark:border-emerald-900">
                    {weather && <WeatherIcon condition={weather.condition} />}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {currentDrink && (
                  <motion.div
                    key={currentDrink.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    className={`relative overflow-hidden rounded-[3rem] border-2 min-h-[600px] flex flex-col ${isDarkMode ? 'bg-slate-900/90 border-emerald-800/50' : 'bg-white border-emerald-100 shadow-2xl shadow-emerald-950/10'}`}
                  >
                    {/* Header Tabs */}
                    <div className="flex border-b border-emerald-100 dark:border-emerald-900">
                      <button 
                        onClick={() => setActiveTab('info')}
                        className={`flex-1 py-6 font-serif text-lg font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'info' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border-b-4 border-amber-400' : 'opacity-40 hover:opacity-100'}`}
                      >
                        <Info size={20} />
                        The Drink
                      </button>
                      <button 
                        onClick={() => setActiveTab('recipe')}
                        className={`flex-1 py-6 font-serif text-lg font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'recipe' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border-b-4 border-amber-400' : 'opacity-40 hover:opacity-100'}`}
                      >
                        <ChefHat size={20} />
                        How to Make
                      </button>
                    </div>

                    <div className="p-10 flex-grow">
                      {activeTab === 'info' ? (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="space-y-8"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="text-7xl mb-6 drop-shadow-lg">{currentDrink.icon}</div>
                              <h3 className="text-5xl font-serif font-bold mb-2 tracking-tight text-emerald-950 dark:text-emerald-50">{currentDrink.name}</h3>
                              <p className="text-xl font-serif italic text-emerald-600 dark:text-emerald-400">{currentDrink.type}</p>
                            </div>
                            <button 
                              onClick={() => toggleFavourite(currentDrink)}
                              className={`p-4 rounded-2xl transition-all shadow-lg ${favourites.some(f => f.id === currentDrink.id) ? 'bg-rose-500 text-white shadow-rose-900/20' : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 hover:scale-110'}`}
                            >
                              <Heart size={24} className={favourites.some(f => f.id === currentDrink.id) ? 'fill-white' : ''} />
                            </button>
                          </div>

                          <p className="text-xl font-serif leading-relaxed text-slate-700 dark:text-slate-300 italic">
                            "{currentDrink.description}"
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-emerald-950/20 border-emerald-900/50' : 'bg-emerald-50/50 border-emerald-100'}`}>
                              <div className="flex items-center gap-3 mb-3 text-emerald-700 dark:text-emerald-400">
                                <Sparkles size={20} />
                                <span className="text-xs font-black uppercase tracking-widest">Why Today?</span>
                              </div>
                              <p className="text-sm font-medium leading-relaxed opacity-80">{currentDrink.why}</p>
                            </div>

                            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-amber-950/10 border-amber-900/30' : 'bg-amber-50/30 border-amber-100'}`}>
                              <div className="flex items-center gap-3 mb-3 text-amber-700 dark:text-amber-500">
                                <GlassIcon size={20} />
                                <span className="text-xs font-black uppercase tracking-widest">Suggested Container</span>
                              </div>
                              <p className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-1">{currentDrink.container.name}</p>
                              <p className="text-xs font-medium opacity-70 leading-relaxed">{currentDrink.container.reason}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                          className="space-y-8"
                        >
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                              <ChefHat className="text-amber-700 dark:text-amber-500" size={24} />
                            </div>
                            <h4 className="text-2xl font-serif font-bold">Preparation Steps</h4>
                          </div>

                          <div className="space-y-4">
                            {currentDrink.howToMake.map((step, index) => (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={index} 
                                className={`flex gap-5 p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-800/40 border-emerald-900/30' : 'bg-white border-emerald-50 shadow-sm'}`}
                              >
                                <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-black shrink-0">
                                  {index + 1}
                                </div>
                                <p className="text-sm font-medium leading-relaxed opacity-90">{step}</p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-10 pt-0 mt-auto">
                      <button 
                        onClick={surpriseMe}
                        className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-5 rounded-[1.5rem] transition-all shadow-xl shadow-emerald-950/30 flex items-center justify-center gap-3 group"
                      >
                        <RefreshCw size={22} className="group-hover:rotate-180 transition-transform duration-500" />
                        Explore Another Recommendation
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Favourites Side Drawer */}
        <AnimatePresence>
          {showFavourites && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFavourites(false)}
                className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-[100]"
              />
              
              {/* Drawer */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed inset-y-0 right-0 w-full max-w-md z-[101] shadow-2xl flex flex-col ${isDarkMode ? 'bg-[#0a1a0a] border-l border-emerald-900' : 'bg-[#f4f9f4] border-l border-emerald-100'}`}
              >
                <div className="p-8 border-b border-emerald-100 dark:border-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center">
                      <Heart className="text-rose-600" size={20} fill="currentColor" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold">Saved Drinks</h2>
                  </div>
                  <button 
                    onClick={() => setShowFavourites(false)}
                    className="p-2 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full transition-colors"
                  >
                    <Trash2 size={20} className="text-emerald-800 dark:text-emerald-400" />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 space-y-6">
                  {favourites.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <Heart size={60} className="mb-6" />
                      <p className="font-serif text-xl italic">Your collection is empty...</p>
                      <p className="text-sm mt-2">Save some drinks to see them here!</p>
                    </div>
                  ) : (
                    favourites.map(drink => (
                      <motion.div 
                        layout
                        key={drink.id}
                        className={`p-6 rounded-[2rem] relative group border-2 transition-all hover:scale-[1.02] ${isDarkMode ? 'bg-slate-900 border-emerald-900/50' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-950/5'}`}
                      >
                        <button 
                          onClick={() => toggleFavourite(drink)}
                          className="absolute top-4 right-4 p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex gap-4 items-center mb-4">
                          <div className="text-4xl">{drink.icon}</div>
                          <div>
                            <h4 className="font-serif font-bold text-xl text-emerald-950 dark:text-emerald-50">{drink.name}</h4>
                            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">{drink.type}</p>
                          </div>
                        </div>
                        <p className="text-xs font-medium opacity-60 line-clamp-2 italic leading-relaxed mb-4">"{drink.description}"</p>
                        <button 
                          onClick={() => { setCurrentDrink(drink); setActiveTab('info'); setShowFavourites(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="w-full py-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
                        >
                          View Details <ChevronRight size={12} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="p-8 border-t border-emerald-100 dark:border-emerald-900">
                  <button 
                    onClick={() => setShowFavourites(false)}
                    className="w-full py-4 bg-emerald-800 text-white rounded-2xl font-bold shadow-lg shadow-emerald-950/20"
                  >
                    Back to Recommender
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 max-w-5xl mx-auto px-6 py-20 border-t border-emerald-100 dark:border-emerald-900 text-center">
        <div className="flex justify-center gap-4 mb-8 opacity-20">
          <CelticKnot className="w-8 h-8" />
          <CelticKnot className="w-8 h-8" />
          <CelticKnot className="w-8 h-8" />
        </div>
        <p className="text-sm opacity-50 font-medium tracking-wide">
          Sláinte chugat! Always drink responsibly. <br />
          <span className="text-xs uppercase tracking-widest mt-2 block">© 2026 Irish Seasonal Drink Recommender</span>
        </p>
      </footer>
    </div>
  );
}
