import { useEffect, useState } from "react";
import './App.css';

function App() {

  const [yeniGorev, setYeniGorev] = useState("");
  const [gorevler, setGorevler] = useState([]);
  const [duzenlemeModu, setDuzenlemeModu] = useState(false);
  const [duzenlenecekIndex, setDuzenlenecekIndex] = useState(null);

  useEffect(() => {
    const kayitli = localStorage.getItem("gorevler");
    if (kayitli) {
      setGorevler(JSON.parse(kayitli));
    }
  }, [])

  useEffect(() => {
    localStorage.getItem("gorevler", JSON.stringify(gorevler));
  }, [gorevler])

  const yeni = {
    text: yeniGorev,
    tamamlandi: false
  }

  const gorevTamamla = (index) => {
    const yeniListe = gorevler.map((gorev, i) =>
      i === index ? { ...gorev, tamamlandi: !gorev.tamamlandi } : gorev);
    setGorevler(yeniListe);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (yeniGorev === "") {
      return;
    }
    if (duzenlemeModu) {
      const guncellenmis = gorevler.map((gorev, i) =>
        i == duzenlenecekIndex ? { ...gorev, text: yeniGorev } : gorev);
      setGorevler(guncellenmis);
      setDuzenlenecekIndex(null);
      setDuzenlemeModu(false);
    }

    else {
      setGorevler([...gorevler, { text: yeniGorev, tamamlandi: false }]);
    }
    setYeniGorev("");

  }
  const gorevDuzenle = (index) => {
    setYeniGorev(gorevler[index].text);
    setDuzenlemeModu(true);
    setDuzenlenecekIndex(index);
  }

  const gorevSil = (index) => {
    const yeniListe = gorevler.filter((_, i) => i !== index);
    setGorevler(yeniListe);
  };

  return (
    <div className="App">
      <h1>to do app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={yeniGorev}
          onChange={(e) => setYeniGorev(e.target.value)}
          placeholder="yeni görev ekle"
        />
        <button type="submit">Ekle</button>
      </form>
      <ul>
        {gorevler.map((gorev, index) =>
        (
          <li key={index}>
            <span style={{
              textDecoration: gorev.tamamlandi ? "line-through" : "none"
            }}>
              {gorev.text}
            </span>
            <button onClick={() => gorevDuzenle(index)}>Düzenle</button>
            <button onClick={() => gorevTamamla(index)}>Tamamlandi</button>
            <button onClick={() => gorevSil(index)}>Çikar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;