import { useMemo } from "react"
import { themeSettings } from "./theme"
import { Box, CssBaseline, createTheme } from "@mui/material"
import {ThemeProvider} from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./scenes/Navbar";
import Dashboard from "./scenes/dashboard/Dashboard"
import Prediction from "./scenes/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  
 
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route
          path="/predictions"
          element={<Prediction />}
          />
        </Routes>
        </Box>
      </ThemeProvider>
      </BrowserRouter>
     
      </div>
  )
}

export default App
