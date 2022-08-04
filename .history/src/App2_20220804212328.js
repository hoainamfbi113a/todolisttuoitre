import "./App.css";
import { Button, Form, Input, Table, Modal, message, Progress, Select, Spin,} from "antd";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import UpdateModal from "./components/UpdateModal";

function App2() {

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

export default App2;
