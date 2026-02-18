import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import JournalSpotlight from './components/JournalSpotlight';
import PropManagementSpotlight from './components/PropManagementSpotlight';
import ProjectHive from './components/ProjectHive';
import EducationSpotlight from './components/EducationSpotlight';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-navy-950 selection:bg-emerald/30 scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Ecosystem />
        <JournalSpotlight />
        <PropManagementSpotlight />
        <ProjectHive />
        <EducationSpotlight />
      </main>
      <Footer />
    </div>
  );
}

export default App;
