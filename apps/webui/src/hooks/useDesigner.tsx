import { useContext } from "react";
import { DesignerContext } from "@/Context/DesignerContext";

function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used within a DesignerContext");
  }

  return context;
}

export default useDesigner;
