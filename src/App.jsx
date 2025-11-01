
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// User pages
import UserSignin from './pages/user/userSignin'
import UserSignup from './pages/user/userSignUp'
import UserHomePage from './pages/user/UserHomePage'
import UserPurchases from './pages/user/UserPurchase'

// Admin pages
import AdminSignin from './pages/admin/adminSignin'
import AdminSignup from './pages/admin/adminSignup'
import AdminHomePage from './pages/admin/adminHomePage'
import AdminCreateCourse from './pages/admin/adminCreateCourse'
import AdminEditCourse from './pages/admin/adminEditCourse'

// Other pages
import StartPage from './pages/StartPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/Home" element={<AdminHomePage />} />
          <Route path="/admin/create-course" element={<AdminCreateCourse />} />
          <Route path="/admin/edit-course/:id" element={<AdminEditCourse />} />

          <Route path="/user/Signup" element={<UserSignup />} />
          <Route path="/user/Signin" element={<UserSignin />} />
          <Route path="/user/home" element={<UserHomePage />} />
          <Route path="/user/purchases" element={<UserPurchases />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

