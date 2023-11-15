import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import logo from '@/assets/images/logo.png';
import { useRouter } from 'next/router';

const HeaderLink = ({ href, text }: any) => (
  <Nav.Link href={href}>{text}</Nav.Link>
);

const Header = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const navLinks = [
    { href: '/edit-profile', text: 'Edit Profile' },
    { href: '/share', text: 'Share' },
    { href: '/linked-cards', text: 'Linked Cards' },
    { href: '/change-password', text: 'Change Password' },
  ];

  return (
    <header>
      <Navbar bg="light">
        <Container>
          <Link href="/">
            <Navbar.Brand>
              <Image src={logo} alt="InfoCard" width={80} />
            </Navbar.Brand>
          </Link>
          <NavDropdown title="Settings" className="ml-auto mr-0">
            {navLinks.map((link, index) => (
              <NavDropdown.Item key={index} href={link.href}>
                {link.text}
              </NavDropdown.Item>
            ))}
            <NavDropdown.Item onClick={logout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
