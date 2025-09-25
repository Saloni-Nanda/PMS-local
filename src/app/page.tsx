import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/bookings/search'); // must match folder structure
  return null; // page itself renders nothing
}

export default Page;
