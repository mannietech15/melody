import { Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <>
      <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between gap-8 pb-20">
        <div className="flex gap-16 flex-wrap">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Company <!-- section --></h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">About</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Jobs</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">For the Record</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Communities <!-- section --></h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">For Artists</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Developers</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Advertising</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Investors</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Vendors</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Useful links <!-- section --></h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Support</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Free Mobile App</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Spotify Plans <!-- section --></h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Individual</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Duo</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Family</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Student</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Spotify Free</a>
          </div>
        </div>
        
        <div className="flex gap-4 h-fit">
          <button className="w-10 h-10 bg-[#292929] hover:bg-[#727272] rounded-full flex items-center justify-center text-white transition-colors">
            <Instagram size={20} />
          </button>
          <button className="w-10 h-10 bg-[#292929] hover:bg-[#727272] rounded-full flex items-center justify-center text-white transition-colors">
            <Twitter size={20} />
          </button>
          <button className="w-10 h-10 bg-[#292929] hover:bg-[#727272] rounded-full flex items-center justify-center text-white transition-colors">
            <Facebook size={20} />
          </button>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex justify-between items-center text-melody-text text-sm pb-8">
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-white">Legal</a>
          <a href="#" className="hover:text-white">Safety & Privacy Center</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Cookies</a>
          <a href="#" className="hover:text-white">About Ads</a>
          <a href="#" className="hover:text-white">Accessibility</a>
        </div>
        <span>© 2026 Melody AB</span>
      </div>
    </>
  );
};
