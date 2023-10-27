import {
  Navbar,
  Container,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/auth';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      dispatch(logout({}));
      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="light">
        <Container>
          <Link href="/">
            <Navbar.Brand>
              <Image src={logo} alt="InfoCard" width={80} />
            </Navbar.Brand>
          </Link>
          <div className="ml-auto">
            <DropdownButton
              title="Settings"
              drop="start"
              variant="light"
            >
              <Link href="/my-qr">
                <Dropdown.Item>My QR</Dropdown.Item>
              </Link>
              <Link href="/profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Link href="/change-password">
                <Dropdown.Item>Change Password</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={logoutHandler}>
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
