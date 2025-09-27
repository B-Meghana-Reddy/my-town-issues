import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c792e476764d402a81f4dcc6fba17c86',
  appName: 'my-town-issues',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://c792e476-764d-402a-81f4-dcc6fba17c86.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: true,
      spinnerColor: '#6366f1'
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1a1a2e'
    }
  }
};

export default config;