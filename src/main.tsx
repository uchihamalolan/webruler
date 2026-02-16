import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";

// biome-ignore lint/style/noNonNullAssertion: its okay
render(<App />, document.getElementById("app")!);
