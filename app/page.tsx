import { EditorialHeader } from "./components/EditorialHeader";
import { SearchForm } from "./components/SearchForm";

export default function Page() {
  return (
    <main className="px-6 pt-8 max-w-md mx-auto">
      <EditorialHeader />
      <SearchForm />
    </main>
  );
}
