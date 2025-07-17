import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Architecture from './components/Architecture';
import ApiDocs from './components/ApiDocs';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import ApiTesting from './components/ApiTesting';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Architecture />
      <ApiDocs />
      <ApiTesting />
      <SignUp />
      <Footer />
    </div>
  );
}

export default App;
