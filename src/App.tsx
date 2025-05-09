import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TutoringPage from './pages/TutoringPage';
import CybersecurityPage from './pages/CybersecurityPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import EducationPhilosophyBlog from './pages/blogs/EducationPhilosophy';
import StudyTipsBlog from './pages/blogs/StudyTips';
import CybersecurityBlog from './pages/blogs/Cybersecurity';
import MathematicsBlog from './pages/blogs/Mathematics';
import LiteracyBlog from './pages/blogs/Literacy';
import EncryptionBasicsBlog from './pages/blogs/EncryptionBasics';
import CollegePrepBlog from './pages/blogs/CollegePrep';
import ScienceExperimentsBlog from './pages/blogs/ScienceExperiments';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tutoring" element={<TutoringPage />} />
            <Route path="/cybersecurity" element={<CybersecurityPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/education-philosophy" element={<EducationPhilosophyBlog />} />
            <Route path="/blog/study-tips" element={<StudyTipsBlog />} />
            <Route path="/blog/cybersecurity-guide" element={<CybersecurityBlog />} />
            <Route path="/blog/mathematics" element={<MathematicsBlog />} />
            <Route path="/blog/literacy" element={<LiteracyBlog />} />
            <Route path="/blog/encryption-basics" element={<EncryptionBasicsBlog />} />
            <Route path="/blog/college-prep" element={<CollegePrepBlog />} />
            <Route path="/blog/science-experiments" element={<ScienceExperimentsBlog />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
