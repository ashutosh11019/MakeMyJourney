import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { LogIn, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginDialog from './LoginDialog'

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [openDialog, setOpenDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const userFromStorage = localStorage.getItem('user');
      setUser(userFromStorage ? JSON.parse(userFromStorage) : null);
    };

    // Custom event to handle login/logout from other components in the same tab
    window.addEventListener('user-changed', handleStorageChange);

    return () => {
      window.removeEventListener('user-changed', handleStorageChange);
    };
  }, []);

  // Google Login
  const userLogin = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (err) => console.log(err)
  });

  // Get User Profile
  const GetUserProfile = (response) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.access_token}`, {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
        Accept: 'application/json',
      }
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      window.dispatchEvent(new Event('user-changed'));
    })
  }

  const userLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('user-changed'));
    navigate('/');
  }

  return (
    <div className="p-4 shadow-md flex justify-between items-center px-6 bg-white w-full z-10">
      {/* Logo */}
      <Link to="/">
        <div className='flex items-center gap-2'>
          <img className="w-16 h-12" src="/logo.png" alt="Logo" />
          <h2 className='font-geist font-bold text-2xl'>MakeMyJourney.ai</h2>
        </div>
      </Link>
      {/* User authentication area */}
      <div className="flex items-center gap-4">
        {user ?
          <>

            {location.pathname !== '/my-trips' ? (
              <Link to="/my-trips">
                <Button className="text-sm md:text-base py-2 px-6 rounded-lg text-gray-800 bg-[#007aff] hover:shadow-lg transition duration-300">
                  My Trips
                </Button>
              </Link>
            ) :
              <Link to="/create-trip">
                <Button className="text-sm md:text-base py-2 px-6 rounded-lg text-gray-800 bg-[#007aff] hover:shadow-lg transition duration-300">
                  + Create Trip
                </Button>
              </Link>
            }

            <DropdownMenu>
              <DropdownMenuTrigger>
                <img src={user?.picture} className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition duration-300" alt="User Profile" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-2">
                <DropdownMenuLabel className="text-gray-700">Hi, {user.given_name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={userLogout} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
          :
          <>
            <Button onClick={() => setOpenDialog(true)} className="text-sm md:text-base py-2 px-6 rounded-lg text-gray-800 bg-[#007aff] hover:shadow-lg transition duration-300">
              <LogIn className="text-xl" /> Sign In
            </Button>
            <LoginDialog openDialog={openDialog} setOpenDialog={setOpenDialog} login={userLogin} />
          </>
        }
      </div>
    </div>
  )
}

export default Header;