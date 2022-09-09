import { Suspense } from "react";
import Loader from "../loader/Loader";

export default function PageLayout({ children }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
