import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider
} from "@mui/material/styles";
import AppRoute from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { stateProvider } from "./_providers";
import { AuthProvider } from "./_hooks/auth";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const defaultTheme = createTheme({
  palette: {
    white: `linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05))`
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: 20,
          "&:hover": {
            boxShadow: "0 2px 8px 0 #7e868c",
            transform: "translateY(-1px)"
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: 20,
          "&:hover": {
            boxShadow: "0 2px 4px 0 #7e868c",
            transform: "translateY(-1px)",
            backgroundColor: "#FFF"
          }
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          textTransform: "capitalize"
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: "#FFF"
            },
            backgroundColor: "#FFF",
            boxShadow: "0 2px 24px rgb(104 112 118 / 0.15)"
          },
          "&:hover": {
            borderRadius: 50,
            boxShadow: "0 8px 12px rgb(104 112 118 / 0.15)",
            backgroundColor: "#FFF",
            transform: "translateY(-1px)"
          },
          borderRadius: 50
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 12px 24px rgb(104 112 118 / 0.15)",
          "&:hover": {
            boxShadow: "0 25px 34px rgb(104 112 118 / 0.35)",
            transform: "translateY(-1px)"
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 12px 24px rgb(104 112 118 / 0.15)",
          "&:hover": {
            boxShadow: "0 22px 34px rgb(104 112 118 / 0.35)",
            transform: "translateY(-1px)"
          }
        }
      }
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          borderRadius: 20,
          boxShadow: 0,
          "&:hover": {
            boxShadow: "0 2px 8px 0 #7e868c",
            transform: "translateY(-1px)"
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            boxShadow: "0 8px 12px rgb(104 112 118 / 0.15)",
            transform: "translateY(-1px)"
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&:hover": {
            // boxShadow: "0 8px 12px rgb(104 112 118 / 0.15)",
            transform: "translateY(-1px)"
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={stateProvider}>
        <CookiesProvider>
          <AuthProvider>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={defaultTheme}>
                <AppRoute />
              </ThemeProvider>
            </StyledEngineProvider>
          </AuthProvider>
        </CookiesProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
