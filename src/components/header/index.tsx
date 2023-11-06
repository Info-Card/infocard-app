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
          <DropdownButton
            title="Settings"
            drop="start"
            variant="light"
            className="ml-auto"
          >
            <Dropdown.Item href="/edit-profile">
              Edit Profile
            </Dropdown.Item>
            <Dropdown.Item href="/share">Share</Dropdown.Item>
            <Dropdown.Item href="/linked-cards">
              Linked Cards
            </Dropdown.Item>
            <Dropdown.Item href="/change-password">
              Change Password
            </Dropdown.Item>
            <Dropdown.Item onClick={logoutHandler}>
              Logout
            </Dropdown.Item>
          </DropdownButton>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;