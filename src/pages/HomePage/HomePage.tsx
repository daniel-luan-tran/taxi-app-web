import { useEffect } from 'react';
import {
  // checkUser,
  downloadAPKForUser,
  downloadAPKForDriver,
  // loginAD,
  // logout,
} from '../../api/axios';
import { Button } from '../../components/common';
import { Page } from '../../components/layout';
// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL;

// Get the current URL
const currentUrl = window.location.href;

// Parse the URL and extract the query parameters
const urlSearchParams = new URLSearchParams(currentUrl.split('?')[1]);

// Get the token parameter value
const invalidRole = urlSearchParams.get('invalidRole');
const userInactive = urlSearchParams.get('userInactive');
if (invalidRole) {
  alert('Invalid role!');
  window.location.href = '/';
}
if (userInactive) {
  alert('User deleted!');
  window.location.href = '/';
}

const HomePage = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };

  // const handleLogin = async () => {
  //   // Here you can implement your login logic
  //   console.log('Email:', email);
  //   console.log('Password:', password);

  //   const data = await axios.post(
  //     `${API_URL}/api/v1/auth/login`,
  //     {
  //       email: `staff@blackbook`,
  //       password: 'blackbook@1',
  //     },
  //     {
  //       withCredentials: true,
  //     },
  //   );
  //   console.log(data);
  // };

  const downloadForUser = async () => {
    await downloadAPKForUser();
  };
  const downloadForDriver = async () => {
    await downloadAPKForDriver();
  };

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  return (
    <Page customStyles={{ padding: 20 }} title="homepage">
      <h1>Home Page</h1>
      <div>
        <Button
          label="Download taxi app for users"
          onClick={downloadForUser}
          fullwidth
        />
        <Button
          label="Download taxi app for drivers"
          onClick={downloadForDriver}
          fullwidth
        />
        <hr />
        <div>
          <h3
            style={{
              marginBottom: 0,
              color: 'blue',
              textDecoration: 'underline',
            }}
          >
            System Architecture
          </h3>
          <img src="/assets/Booking app architecture.png" width="100%"></img>
        </div>
        <hr />
        <div>
          <h3
            style={{
              marginBottom: 20,
              color: 'blue',
              textDecoration: 'underline',
            }}
          >
            Authentication with Local strategy and OIDC strategy
          </h3>
          <img src="/assets/Microsoft Entry ID.svg" width="100%"></img>
        </div>
        <hr />
        <div>
          <h3
            style={{
              color: 'blue',
              textDecoration: 'underline',
            }}
          >
            Schema Diagram
          </h3>
          <img
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
            src="/assets/schema_diagram.pgerd.png"
            width="100%"
          ></img>
        </div>
        <hr />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 2 }}>
            <h3
              style={{
                color: 'blue',
                textDecoration: 'underline',
              }}
            >
              Taxi booking via mobile app
            </h3>
            <img src="/assets/Socket.svg" width="100%"></img>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 0.87 }}>
            <div>
              <h3
                style={{
                  marginBottom: 25,
                  color: 'blue',
                  textDecoration: 'underline',
                }}
              >
                Mobile app
              </h3>
              <img src="/assets/driver-app.png" width="100%"></img>
            </div>
            <div>
              <h3
                style={{
                  marginBottom: 0,
                  color: 'blue',
                  textDecoration: 'underline',
                }}
              >
                Mobile app
              </h3>
              <img src="/assets/passenger-app.png" width="100%"></img>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
