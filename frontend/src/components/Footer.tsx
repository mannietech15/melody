export const Footer = () => {
  return (
    <>
      <div className="mt-12 pt-10 flex flex-col md:flex-row justify-between gap-8 pb-20">
        <div className="flex gap-16 flex-wrap">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Company</h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">About</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Jobs</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">For the Record</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Communities</h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">For Artists</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Developers</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Advertising</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Investors</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Vendors</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Useful links</h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Support</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Free Mobile App</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-white">Spotify Plans</h4>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Individual</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Duo</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Family</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Premium Student</a>
            <a href="#" className="text-melody-text hover:text-white hover:underline">Spotify Free</a>
          </div>
        </div>
        
        <div className="flex gap-4 h-fit">
          <button className="w-10 h-10 bg-[#292929] hover:bg-[#727272] transition-colors rounded-full flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </button>
          <button className="w-10 h-10 bg-[#292929] hover:bg-[#727272] transition-colors rounded-full flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </button>
          <button className="w-10 h-10 bg-[#292929] hover:bg-[#727272] transition-colors rounded-full flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </button>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex justify-between items-center text-melody-text text-[13px] pb-8">
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-white">Legal</a>
          <a href="#" className="hover:text-white">Safety & Privacy Center</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Cookies</a>
          <a href="#" className="hover:text-white">About Ads</a>
          <a href="#" className="hover:text-white">Accessibility</a>
        </div>
        <span>© 2024 Melody AB</span>
      </div>
    </>
  );
};
