import React, { useState } from 'react';
import Navbar from './navbar.js';
import AdCard from './adcard.js';

function App() {
  const categories = ["Nəqliyyat", "Əmlak", "Elektronika", "Xidmətlər", "İş", "Şəxsi"];
  
  const [elanlar, setElanlar] = useState([
    { 
      id: 1, price: 1250, title: 'iPhone 15 Pro Max - 256GB, Black Titanium', city: 'Bakı', date: 'Bugün, 14:20', 
      isUrgent: true, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600',
      desc: 'İdeal vəziyyətdədir. Karobkası var. Çatdırılma mümkündür.', phone: '055-123-45-67'
    },
    { 
      id: 2, price: 45000, title: 'BMW M5 F10 - Full Edition, 2020 il', city: 'Bakı', date: 'Bugün, 11:05', 
      isUrgent: false, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600',
      desc: 'Bezkraska. İdeal vəziyyətdədir. Real alıcıya endirim olacaq.', phone: '050-987-65-43'
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [selectedAd, setSelectedAd] = useState(null); 
  const [newAd, setNewAd] = useState({ title: '', price: '', city: 'Bakı', image: '', desc: '', phone: '' });

  const handlePublish = (e) => {
    e.preventDefault();
    const id = Date.now();
    setElanlar([{ ...newAd, id, date: 'İndi', isUrgent: false }, ...elanlar]);
    setIsFormOpen(false);
    setNewAd({ title: '', price: '', city: 'Bakı', image: '', desc: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <Navbar onNewAdClick={() => setIsFormOpen(true)} />

      <section className="bg-gray-950 border-b border-gray-900 overflow-x-auto py-3 px-4 sticky top-0 z-40">
        <div className="container mx-auto flex gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
          {categories.map(cat => (
            <span key={cat} className="cursor-pointer hover:text-green-500 transition-colors shrink-0">{cat}</span>
          ))}
        </div>
      </section>

      <main className="container mx-auto p-4 mt-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-8 w-2 bg-green-600 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.6)]"></div>
          <h2 className="text-3xl font-black italic uppercase italic">VİP ELANLAR</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {elanlar.map(e => (
            <div key={e.id} onClick={() => setSelectedAd(e)}>
              <AdCard {...e} />
            </div>
          ))}
        </div>
      </main>

      {/* 1. Elan Detalları Modalı */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[300] flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-green-900/30 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative">
            <button onClick={() => setSelectedAd(null)} className="absolute top-5 right-5 z-50 bg-black/50 p-2 rounded-full">✕</button>
            <div className="h-64 bg-gray-800">
              <img src={selectedAd.image} className="w-full h-full object-cover" alt="Ad" />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-4xl font-black text-green-500 italic mb-2 tracking-tighter">{selectedAd.price} AZN</h3>
                  <h4 className="text-xl font-bold">{selectedAd.title}</h4>
                </div>
                <div className="text-right text-gray-600 text-[10px] font-black uppercase tracking-widest">
                  <p>{selectedAd.city}</p><p>{selectedAd.date}</p>
                </div>
              </div>
              <p className="text-gray-400 mb-8 border-t border-gray-800/50 pt-6">{selectedAd.desc}</p>
              <a href={`tel:${selectedAd.phone}`} className="block w-full bg-green-600 text-black text-center py-5 rounded-2xl font-black uppercase tracking-widest">
                ZƏNG ET: {selectedAd.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Yeni Elan Forması Modalı */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[300] flex items-center justify-center p-4">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md border border-green-900/20">
            <h3 className="text-2xl font-black text-green-500 mb-8 italic uppercase">Yenİ Elan Paylaş</h3>
            <form onSubmit={handlePublish} className="space-y-4">
              <input type="text" placeholder="Məhsulun adı" required className="w-full bg-gray-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-600" value={newAd.title} onChange={e => setNewAd({...newAd, title: e.target.value})} />
              <input type="number" placeholder="Qiymət" required className="w-full bg-gray-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-600" value={newAd.price} onChange={e => setNewAd({...newAd, price: e.target.value})} />
              <input type="text" placeholder="Telefon" required className="w-full bg-gray-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-600" value={newAd.phone} onChange={e => setNewAd({...newAd, phone: e.target.value})} />
              <textarea placeholder="Təsvir..." className="w-full bg-gray-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-600 h-24" value={newAd.desc} onChange={e => setNewAd({...newAd, desc: e.target.value})} />
              <input type="text" placeholder="Şəkil linki" className="w-full bg-gray-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-600" value={newAd.image} onChange={e => setNewAd({...newAd, image: e.target.value})} />
              
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-grow bg-green-600 text-black font-black py-4 rounded-2xl hover:bg-green-500 uppercase">Paylaş</button>
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-4 text-gray-500 font-bold uppercase text-[10px]">Ləğv et</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
