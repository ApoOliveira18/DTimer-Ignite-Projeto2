import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/globol';
import { BrowserRouter} from 'react-router-dom';
import { Router } from './components/Router';
import { CyclesContextProvider } from './contexts/CyclesContext';

export function App() {
  return (    
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <CyclesContextProvider>
        <Router />         
      </CyclesContextProvider>        
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>  
  )
}


