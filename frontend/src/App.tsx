import {BrowserRouter, Route, Routes} from 'react-router-dom';

// pages
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Dashboardpage from './pages/Dashboardpage';
import Stafpage from './pages/Stafpage';
import Reportspage from './pages/Reportspage';
import GenerateReportpage from './pages/GenerateReportpage';
import PDFView from './components/pdf-viewer/PDFViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<div>Nothing here...</div>} />
        <Route path="/" element={<Homepage />} />
        <Route path="/pdfviewer" element={<PDFView />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/dashboard" element={<Dashboardpage />} />
        <Route path="/dashboard/staf" element={<Stafpage />} />
        <Route path="/dashboard/reports" element={<Reportspage />} />
        <Route
          path="/dashboard/reports/generate/:key"
          element={<GenerateReportpage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
