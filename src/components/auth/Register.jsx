import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

function Register() {
  const [isMobile, setIsMobile] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    try {

      /* Make sure to use port 8000 or change to your port, my port is 8000 */

      const response = await axios.post('http://localhost:8000/auth/', {
        username: username,
        email: email,
        password: password,
      });
      console.log('Signup successful', response.data);
      /*This verification will be included later */
     /*  if (response.data.verification_link) {
        await axios.post('http://localhost:8000/auth/send-verification-email', {
          email: email,
          verification_link: response.data.verification_link, 
        });
      } */
  
      /* navigate('/UserVerification'); */

      /* once the admin page is set up, we can navigate to the UserVerification, for now navigate to the Login */
      navigate('/Login');
    } catch (error) {
      console.error('Signup failed', error.response.data);
      if (error.response.status === 400 && error.response.data.email) {
        setRegistrationError('A user with this email already exists.');
      } else {
        setRegistrationError('A user with this email already exists.');
      }
    }
  };
  

  const navigatetoLogin = () => {
    console.log('Navigating to login page...');
    navigate('/login');
  };

  return (
    <div className="bg-quaternary h-screen">
      {isMobile && (
        <div className="h-screen">
          <img src="src/assets/common/topframe.svg" className="w-screen absolute" />
          <img src="src/assets/common/mascot.svg" className="absolute top-11 right-7" />
          <img
            src="src/assets/verification/backbutton.svg"
            className="absolute mt-14 ml-8"
            onClick={() => {
              navigate('/login');
            }}
          />
          <p className="text-white text-4xl font-bold absolute text-left top-32 left-14 ">
            {' '}
            Create <br /> Account
          </p>
          <Card>
            <div className="text-left ml-16 mt-11">
              <label htmlFor="fullname" className="text-primary font-medium">
                {' '}
                Full Name <br />
              </label>
              <input
                className="border border-gray-300 rounded-md w-5/6 px-3 py-1.5 bg-quinary"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="text-left ml-16 mt-5">
              <label htmlFor="email" className="text-primary font-medium">
                {' '}
                Email <br />
              </label>
              <input
                className={`border border-gray-300 rounded-md w-5/6 px-3 py-1.5 bg-quinary ${
                  registrationError && 'border-red-500'
                }`}
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {registrationError && <p className="text-red-500 mt-1">{registrationError}</p>}
            </div>
            <div className="text-left ml-16 mt-5">
              <label htmlFor="password" className="text-primary font-medium">
                Password <br />
              </label>
              <input
                type="password"
                className="border border-gray-300 rounded-md w-5/6 px-3 py-1.5 bg-quinary"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-8">
              <button
                className="rounded-full bg-secondary text-white font-bold px-4 py-2 w-36 btn-login"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
            <div className="flex justify-center items-center mt-7">
              <img src="src/assets/common/component.svg" className="w-3/4" />
            </div>
            <div className="flex items-center mt-5 justify-center gap-6">
              <img src="src/assets/common/fb.svg" />
              <img src="src/assets/common/apple.svg" />
              <img src="src/assets/common/google.svg" />
            </div>
            {/* Navigate to login section */}
            <div className="text-xs flex items-center justify-center gap-1 mt-5">
              <p> Already have an account? </p>
              <p className="text-primary font-bold underline" onClick={navigatetoLogin}>
                Login here
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Register;
