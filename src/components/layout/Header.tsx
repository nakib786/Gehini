import { Navbar1 } from '../blocks/navbar1';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const { isDarkMode } = useTheme();

  return (
    <header className="bg-transparent z-50 absolute top-0 left-0 right-0 w-full">
      <Navbar1 
        logo={{
          url: "/",
          src: "/Gehini_Gurukul_Logo-removebg-preview.png",
          alt: "Gehini Gurukul Logo",
          title: "Gehini Gurukul"
        }}
        menu={[
          { title: "Home", url: "/" },
          { title: "About Us", url: "/about" },
          {
            title: "Services",
            url: "#",
            items: [
              {
                title: "K-12 Tutoring",
                description: "Personalized tutoring for K-12 students",
                url: "/tutoring",
              },
              {
                title: "Cybersecurity",
                description: "Cybersecurity education and training",
                url: "/cybersecurity",
              },
            ],
          },
          { title: "Pricing", url: "/pricing" },
          { title: "Blog", url: "/blog" },
          { title: "Contact", url: "/contact" },
        ]}
        auth={{
          login: { text: "Log in", url: "/login" },
          signup: { text: "Get Started", url: "/contact" },
        }}
        isDarkMode={isDarkMode}
      />
    </header>
  );
};

export default Header; 