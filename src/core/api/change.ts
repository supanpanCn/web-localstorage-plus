import type { This } from "./index";
import { getNamespace, useCallback } from "./index";

type Callback = (p: {
  oldValue: any;
  newValue: any;
  key: string;
  namespace?: string;
}) => void;

function change(this: This, key: string, callback: Callback): void;
function change(
  this: This,
  key: string,
  callback: Callback,
  namespace?: string
): void;
function change(
  this: This,
  key: string,
  callback: Callback,
  namespace?: string
) {
  const spacename = getNamespace(namespace);
  const [change, setChange] = useCallback("change");
  change.push({
    key,
    namespace: spacename,
    callback,
  });
  setChange(change);
}
export default change;
