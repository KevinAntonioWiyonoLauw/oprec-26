import { Smile } from "lucide-react";
import PopupPengumuman from "./components/PopupPengumuman";
import { getPenerimaanUser } from "@/utils/fetch";
import { cookies } from "next/headers";
import { formatDate } from "@/lib/utils";

const Pengumuman = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const { diterimaDi } = await getPenerimaanUser(accessToken as string);
  
  // COMING SOON MODE - Set to false to show coming soon
  // Change to true when announcement is ready to be opened
  const isAnnouncementAvailable = false;
  // const isAnnouncementAvailable = true; // Uncomment this line to open announcement

  return (
    <main className="space-y-8">
      <Title isAnnouncementAvailable={isAnnouncementAvailable} />

      <div className="flex h-96 flex-col items-center justify-center gap-4 rounded-xl bg-custom-gray-dark p-6">
        <Smile size={100} />
        {isAnnouncementAvailable ? (
          <>
            <h1 className="text-center text-xl font-medium">
              Kamu dapat membuka pengumuman
            </h1>
            <PopupPengumuman diterimaDi={diterimaDi} />
          </>
        ) : (
          <h1 className="text-center text-xl font-medium">
            Pengumuman akan segera dibuka. <br />
            Mohon ditunggu ya! 🎉
          </h1>
        )}
      </div>
    </main>
  );
};

// title
const Title = ({
  isAnnouncementAvailable,
}: {
  isAnnouncementAvailable: boolean;
}) => (
  <>
    {isAnnouncementAvailable ? (
      <section>
        <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
        <p>
          Kamu dapat membuka hasil pengumuman{" "}
          <span className="font-semibold">Open recruitment</span>
        </p>
      </section>
    ) : (
      <section>
        <h1 className="text-2xl font-semibold sm:text-4xl">Pengumuman</h1>
        <p>
          Hasil pengumuman{" "}
          <span className="font-semibold">Open recruitment</span> akan segera dibuka
        </p>
      </section>
    )}
  </>
);

export default Pengumuman;
