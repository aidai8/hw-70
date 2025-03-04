import './App.css'
import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./Containers/Home/Home.tsx";
import EditContact from "./Containers/EditContact/EditContact.tsx";
import NewContact from "./Containers/NewContact/NewContact.tsx";

const App = () => {

  return (
      <Layout>
          <Routes>
              <Route
                  path="/"
                  element={(
                      <Home/>)}
              />
              <Route
                  path="/new-contact"
                  element={(<NewContact/>)}
              />
              <Route
                  path="/contacts"
                  element={(<Home/>)}
              />
              <Route path='edit-contact/:idContact' element={<EditContact/>}/>
              <Route path="*" element={(<h1>Not page found</h1>)}/>
          </Routes>
      </Layout>
  )
};

export default App
