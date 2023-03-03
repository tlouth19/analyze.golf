import SelectFile from "@components/selectFile/SelectFile";
import Analyzer from "@components/analyzer/Analyzer";
import useVhHeight from "@hooks/useVhHeight";
import useAppSelector from "@hooks/useAppSelector";

function App() {
  useVhHeight();
  const { blob } = useAppSelector((state) => state.video);

  if (blob !== undefined) {
    return <Analyzer />;
  }

  return <SelectFile />;
}

export default App;
