import { useTheme } from "./context";

export default function UseContextHook() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <p>The current theme is {theme}.</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
