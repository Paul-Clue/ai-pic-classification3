// import Image from "next/image";
// import Navbar from '@/components/Navbar';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <h1 className='text-4xl font-bold'>Welcome to My Website</h1>
        <p className='text-2xl'>This is a simple website</p>
        <Button variant='contained'>Hello world</Button>;
        <Button>Hello world</Button>;
      </div>
    </main>
  );
}
