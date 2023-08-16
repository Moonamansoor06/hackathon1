"use client"
import React from 'react';
import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SignInToken } from '@clerk/nextjs/dist/types/server';


const HeroSection = ()=> {
  const router =useRouter()

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Background"
          priority={true}
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/4 -translate-y-1/4 text-center">
        <h1 className="text-4xl font-head1Main  font-bold text-white mb-4 mt-2">
          <Typewriter
            options={{
              strings: [
                'Welcome to Zainiee Fashion Store',
                'Choose Amazing Fashion Items According to Your Style',
                'Wide Range of Clothes and Accessories '
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        </div>
      <div className="absolute left-1/2 top-60  transform -translate-x-1/2 mt-8">
        <button   onClick={(()=>{router.push(`/product`)})}       
        className=" mx-4 px-4 py-2 bg-white font-head2Main text-lg font-bold  text-blue-900 rounded">
          Enter Store
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
