
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-lightest to-saffron-light py-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-cover bg-center opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-saffron">Gyaan Kaksha</span>
                <span className="block mt-2">Ancient Wisdom, Modern Learning</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-dark max-w-lg">
                Experience the timeless tradition of Gurukul education in a digital age. 
                Connect with gurus, learn sacred knowledge, and grow in wisdom.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/register')}
                  size="lg"
                  className="bg-saffron hover:bg-saffron-dark text-white"
                >
                  Begin Your Journey as Student
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  size="lg"
                  variant="outline"
                  className="border-saffron text-saffron hover:bg-saffron-light"
                >
                  Become a Guru
                </Button>
              </div>
            </div>

            <div className="relative h-96 animate-slide-in">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full max-w-md rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white/90">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-saffron/80 to-purple/80" />
                    <div className="relative h-full flex items-center justify-center text-center p-8">
                      <div>
                        <div className="w-24 h-24 rounded-full bg-white mx-auto mb-6 flex items-center justify-center">
                          <span className="text-saffron text-3xl font-bold">ज्ञान</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Digital Gurukul Platform</h3>
                        <p className="text-white/90">
                          Where ancient wisdom meets modern technology
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experience Gurukul Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gyaan-card">
              <div className="h-12 w-12 bg-saffron-light rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Sacred Knowledge</h3>
              <p className="text-neutral-dark">
                Access timeless wisdom and traditional teachings in a modern digital format.
              </p>
            </div>

            <div className="gyaan-card">
              <div className="h-12 w-12 bg-purple-light rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Learning</h3>
              <p className="text-neutral-dark">
                Join interactive sessions with gurus through our digital classroom platform.
              </p>
            </div>

            <div className="gyaan-card">
              <div className="h-12 w-12 bg-guru-light rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-guru" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Modern Tools</h3>
              <p className="text-neutral-dark">
                Advanced teaching tools that blend traditional methods with digital innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-saffron-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Begin Your Learning Journey</h2>
          <p className="text-lg text-neutral-dark max-w-xl mx-auto mb-8">
            Join our digital gurukul today and experience the perfect blend of ancient wisdom and modern learning.
          </p>
          <Button
            onClick={() => navigate('/register')}
            size="lg"
            className="bg-saffron hover:bg-saffron-dark text-white"
          >
            Start Learning Now
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
