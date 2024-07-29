import '../globals.css';
const Footer=()=>{
    return (
      <footer className=" relative bg-footer-custome border-t-2 border-gray-300 py-10 px-4">
        <div className='bg-footer-top'></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-semibold text-lg mb-3">About Us</h3>
            <ul className="space-y-2">
              <li>Project</li>
              <li>Track Record</li>
              <li>Pricing</li>
              <li>Services</li>
              <li>Professional Worker</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Pricing</h3>
            <ul className="space-y-2">
              <li>About Product</li>
              <li>Management</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Media</h3>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Development</li>
              <li>Terms & Service</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <p>(077) 092 33 53</p>
          </div>
        </div>
        <div className='border-y border-[#f7cbaa] p-3 mt-2'>
      <p className='text-[#ffffff] text-center text-[14px]'> Copyright © 2024 ShriSudhdhi, All Rights Reserved</p>
        </div>
      </footer>
    );
}
export default Footer;