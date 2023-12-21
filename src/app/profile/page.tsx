
import { getUser } from "../(database-queries)/user-queries";
import { ClientProfilePage } from "./(components)/ClientProfilePage";
import { DesignerProfilePage } from "./(components)/DesignerProfilePage";

export default async function Page() {
  const user = await getUser();
  return (
    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
      {user?.role === "CLIENT" ? (
        <ClientProfilePage />
      ) : (
        <DesignerProfilePage />
      )}
    </section>
  );
}
