import SelectFile from "./components/selectFile/SelectFile";
import Analyzer from "./components/analyzer/Analyzer";
import { useAppSelector, useVhHeight } from "./hooks";

function App() {
  useVhHeight();
  const blob = useAppSelector((state) => state.video.blob);

  if (blob !== undefined) {
    return <Analyzer />;
  }

  return <SelectFile />;
}

export default App;
