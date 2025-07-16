import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Architecture from './components/Architecture';
import ApiDocs from './components/ApiDocs';
import SignUp from './components/SignUp';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Architecture />
      <ApiDocs />
      <SignUp />
      <Footer />
    </div>
  );
}

export default App;
