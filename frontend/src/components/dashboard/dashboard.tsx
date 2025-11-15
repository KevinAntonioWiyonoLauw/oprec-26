interface UserProps {
  id: string;
  NIM: string;
  username: string;
  isAdmin: string | boolean;
  enrolledSlugOti: string;
  enrolledSlugHima: string;
}

const Dashboard = (user: UserProps) => {
  return (
    <>
        {/* <Title name={user.username} /> */}
        <h1>Hello, {user.username}!</h1>
    </>
  );
};

// const Title = ({ name }: {name: string}) => (
//   <div className="mb-8">
//     <h1 className="text-2xl font-semibold sm:text-4xl">nigger {name}</h1>
//     <p className={`mb-2`}>
//         perkenalkan, saya fahmi shampoerna, dan bapak saya kopassus. saya adalah    yang membuat website ini, saya mengharapkan mendapatkan insentif dari membuat website ini dari project officer.
//     </p>
//     <p>saya ingin bercerita, ini adalah cerita saya mencapai bintang skibidi 😘❤️👹</p>
//   </div>
// )

export default Dashboard;
