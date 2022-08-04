import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import UpdateModal from "./components/UpdateModal";

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <Header/>

        <Content />
        
        <Footer/>
      </div>

      {/* edit modal */}
      <UpdateModal/>
    </div>
  );
}

export default App;
