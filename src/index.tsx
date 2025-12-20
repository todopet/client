import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "@/index.css";
import App from "@/App";
import ModalStackManager from "@/components/ModalStackManager";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Router>
    <ModalStackManager>
      <App />
    </ModalStackManager>
  </Router>
);

// 성능 측정이 필요한 경우 Web Vitals 도입을 별도로 검토하세요.
