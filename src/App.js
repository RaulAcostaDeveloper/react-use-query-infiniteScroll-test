import { CatFactsInfiniteScrolling } from './components/catFactsInfiniteScrolling';
import { Footer } from './components/footer';
import { Header } from './components/headet';
// npm install tailwindcss postcss autoprefixer --legacy-peer-deps
// reiniciar el servidor
function App() {
  return (
    <div className="mb-10">
      <Header/>
      <CatFactsInfiniteScrolling />
      <Footer/>
    </div>
  );
}

export default App;
