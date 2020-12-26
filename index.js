import 'react-native-gesture-handler';
import App from "./src/App";
import { Provider as PaperProvider } from "react-native-paper";
import React from "react";
import { registerRootComponent } from "expo";

export const Main = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

registerRootComponent(Main);
