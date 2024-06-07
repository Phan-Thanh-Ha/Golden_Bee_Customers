import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useInset = () => {
  const inset = useSafeAreaInsets();
  return inset;
};
