import React, { useState, useEffect } from 'react';

// --- 1. ÇOCUK BİLEŞEN: FORM ---
const OgrenciFormu = ({ onOgrenciEkle }) => {
  const [isim, setIsim] = useState("");
  const [bolum, setBolum] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isim || !bolum) return alert("Boş bırakma coni!");
    onOgrenciEkle({ isim, bolum });
    setIsim("");
    setBolum("");
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3>Öğrenci Kayıt</h3>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="İsim" 
          value={isim} 
          onChange={(e) => setIsim(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input 
          placeholder="Bölüm" 
          value={bolum} 
          onChange={(e) => setBolum(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#2ecc71', color: '#white', border: 'none' }}>
          Ekle
        </button>
      </form>
    </div>
  );
};

// --- 2. ÇOCUK BİLEŞEN: LİSTE ---
const OgrenciListesi = ({ ogrenciler, onSil }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', minWidth: '300px', backgroundColor: '#fff' }}>
      <h3>Kayıtlılar (Kalıcı Liste)</h3>
      {ogrenciler.map((o) => (
        <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
          <span>{o.isim} - {o.bolum}</span>
          <button onClick={() => onSil(o.id)} style={{ color: 'red', cursor: 'pointer' }}>Sil</button>
        </div>
      ))}
    </div>
  );
};

// --- 3. ANA BİLEŞEN: APP ---
const App = () => {
  // KRİTİK NOKTA 1: State'i başlatırken localStorage'dan veriyi çekiyoruz (JSON.parse ile!)
  const [ogrenciler, setOgrenciler] = useState(() => {
    const kaydedilmisVeri = localStorage.getItem("ogrenciListesi");
    return kaydedilmisVeri ? JSON.parse(kaydedilmisVeri) : [];
  });

  // KRİTİK NOKTA 2: Her 'ogrenciler' değiştiğinde localStorage'ı güncelle
  // useEffect kullanarak state her değiştiğinde otomatik kayıt yapıyoruz
  React.useEffect(() => {
    localStorage.setItem("ogrenciListesi", JSON.stringify(ogrenciler));
  }, [ogrenciler]);

  const ogrenciEkle = (yeniData) => {
    const yeni = { ...yeniData, id: Date.now() };
    setOgrenciler([...ogrenciler, yeni]);
  };

  const ogrenciSil = (id) => {
    setOgrenciler(ogrenciler.filter(o => o.id !== id));
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '50px', justifyContent: 'center', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <OgrenciFormu onOgrenciEkle={ogrenciEkle} />
      <OgrenciListesi ogrenciler={ogrenciler} onSil={ogrenciSil} />
    </div>
  );
};

export default App;