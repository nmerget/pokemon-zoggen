import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'merget.nicolas.pkmzoggen',
  appName: 'pokemon-zoggen',
  webDir: 'build',
  bundledWebRuntime: false,

  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['google.com'],
    },
  },
};

export default config;
