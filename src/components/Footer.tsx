
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-lightest border-t border-neutral-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo className="h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-saffron">Gyaan Kaksha</span>
              <span className="text-xs text-neutral">Digital Gurukul Platform</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center space-x-6">
            <Link to="/" className="text-neutral-dark hover:text-saffron text-sm">
              Home
            </Link>
            <Link to="/about" className="text-neutral-dark hover:text-saffron text-sm">
              About
            </Link>
            <Link to="/privacy" className="text-neutral-dark hover:text-saffron text-sm">
              Privacy
            </Link>
            <Link to="/terms" className="text-neutral-dark hover:text-saffron text-sm">
              Terms
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-neutral">
          <p>&copy; {new Date().getFullYear()} Gyaan Kaksha. All rights reserved.</p>
          <p className="mt-1">
            Promoting the ancient wisdom of Gurukul in the digital era
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
