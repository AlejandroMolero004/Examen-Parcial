import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function Layout({ Component}: PageProps) {
  // do something with state here
  return (
    <div class="layout">
      <p><Header/></p>
      <Component />
      <h1>Copyright Nebrija 2025</h1>
    </div>
  );
}