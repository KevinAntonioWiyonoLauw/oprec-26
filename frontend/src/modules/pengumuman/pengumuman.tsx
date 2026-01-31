import { Smile } from "lucide-react";
import PopupPengumuman from "./components/PopupPengumuman";
import { getPenerimaanUser } from "@/utils/fetch";
import { cookies } from "next/headers";
import { formatDate } from "@/lib/utils";

const Pengumuman = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const { diterimaDi } = await getPenerimaanUser(accessToken as string);
  
  // Set your announcement release date here - 1 February 2026, 07:00 WIB
  const releaseDate = new Date("2026-02-01T07:00:00+07:00"); // 1 February 2026, 07:00 WIB
  const currentDate = new Date();
  console.log(`pengumuman.tsx: releaseDate: ${releaseDate}, currentDate: ${currentDate}`);

  const isAnnouncementAvailable = currentDate >= releaseDate;
  // const isAnnouncementAvailable = true; // Uncomment to always show

  return (
    <main className="space-y-8">
      <Title
        isAnnouncementAvailable={isAnnouncementAvailable}
        releaseDate={releaseDate}
      />

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
  releaseDate,
}: {
  isAnnouncementAvailable: boolean;
  releaseDate: Date;
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
          <span className="font-semibold">Open recruitment</span> akan dibuka pada{" "}
          <span className="font-semibold">
            {releaseDate.toLocaleDateString("id-ID", { 
              day: "numeric", 
              month: "long", 
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Jakarta"
            })}
          </span>
        </p>
      </section>
    )}
  </>
);

export default Pengumuman;
