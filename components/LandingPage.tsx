
import React, { useState } from 'react';

interface LandingPageProps {
  onApply: () => void;
}
interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 bg-white rounded-md  overflow-hidden border border-slate-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center rounded-md justify-between text-left border-2 border-transparent boder-l-1 hover:border-l-3 hover:border-slate-900 transition-colors"
      >
        <span className="font-bold text-slate-800 flex gap-4">
          <span className="text-slate-400">{index}.</span> {question}
        </span>
        <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 text-slate-600 border-t border-slate-50">
          {answer}
        </div>
      </div>
    </div>
  );
};
const LandingPage: React.FC<LandingPageProps> = ({ onApply }) => {
  const steps = ['Selection', 'Training', 'Certification', 'Onboarding', 'Support', 'Monitor & Grow'];

  const stepDetails: { title: string; desc: string; imgSeed: string; imgSrc: string }[] = [
    {
      title: 'Candidates Are Selected Based on Interest and Potential.',
      desc:
        "During the selection phase, we carefully review your application and make sure you're the right fit for the role. Our team looks at your background, interests, and motivation to become an Umrah Consultant. We provide clear information about what to expect.",
      imgSeed: 'selection',
      imgSrc: 'assets/images/process1.png',
    },
    {
      title: 'Training Provides the Knowledge Needed to get Started',
      desc: 'During the Training phase, we equip you with the skills and knowledge needed to guide Umrah pilgrims. You’ll go through courses and practical exercises covering travel planning, understanding cultural differences, and excellent customer service. Trainers and experienced consultants will support you throughout this phase, so you can ask questions and practice what you learn. By the end of training, you’ll feel ready to move on to the next phase: Certification.',
      imgSeed: 'training',
      imgSrc: 'assets/images/process2.jpeg',

    },
    {
      title: 'Certification Confirms Readiness to Take on the Role',
      desc: 'During the Certification phase, you’ll take a final assessment to confirm your readiness. Instructors will review key points with you and ensure you feel prepared. Once you pass the exam, you’ll receive a certificate showing that you’re qualified to serve as an Umrah Consultant. This step proves your knowledge and builds trust, making clear that you are prepared for this important role. After earning your certificate, you’ll move on to the next phase: Onboarding.',
      imgSeed: 'certification',
      imgSrc: 'assets/images/process3.jpeg',

    },
    {
      title: 'Onboarding Sets Up Tools and Access to the System.',
      desc: 'During the Onboarding phase, you’ll join our team and get set up with all the systems and tools you need. We give you access to our booking and management tools and show you how they work. You’ll also meet the support staff and mentors who will assist you, so you know exactly who to turn to for help. By the end of onboarding, you’ll have everything you need to begin consulting with confidence.',
      imgSeed: 'onboarding',
      imgSrc: 'assets/images/process4.jpeg',

    },
    {
      title: 'Ongoing Support is Provided At Every Stage.',
      desc: 'During the Support phase, our focus is on helping you succeed. As you begin working with clients, you’ll receive guidance and assistance to help you feel confident. This support could include regular check-ins, group meetings, or one-on-one mentoring. We make sure you’re never alone in your work and that help is always available when you need it.',
      imgSeed: 'support',
      imgSrc: 'assets/images/process5.jpeg',

    },
    {
      title: 'Progress Is Monitored With Opportunities To Grow.',
      desc: 'During the Monitor & Grow phase, we keep track of your progress and encourage your development. We review your work and offer feedback to help you improve. You will have opportunities for advanced training, leadership roles, or new responsibilities as you gain experience. Our goal is to help you continue growing in your role and advance in your consulting career.',
      imgSeed: 'grow',
      imgSrc: 'assets/images/process6.jpeg',

    },
  ];

  const [activeStep, setActiveStep] = useState<number>(0);

  const prev = () => setActiveStep((s) => Math.max(0, s - 1));
  const next = () => setActiveStep((s) => Math.min(steps.length - 1, s + 1));
  return (
    <div className="flex flex-col bg-white">
      {/* Top Section Container */}
      <div className="flex flex-col min-h-[700px]" style={{ backgroundImage: "url('/assets/images/Frame-3.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'contain' }}>

        {/* Left Sidebar (Desktop) / Top Bar (Mobile) */}
        <div className="flex ">
          <div className="w-[30%]  flex flex-col items-center py-8 flex-shrink-0 z-20">
            <div className="relative z-10 flex flex-col items-center gap-2 mb-auto px-4 text-center">
              <div className="rounded-lg flex items-center justify-center">
                <img src="/assets/images/logo-light.png" alt="Logo" className="w-20 h-20" />
              </div>
            </div>
          </div>
          <div className=" w-[99%] bg-white flex justify-between lg:justify-end items-center px-8 lg:pr-12">
            {/* Mobile Logic: Logo could go here if sidebar is hidden, but keeping it simple for now */}
            <button
              onClick={onApply}
              className="bg-[#24B3BA] hover:bg-[#0d9488] text-white font-bold py-2 px-8 rounded  transition-colors ml-auto"
            >
              Register as a Consultant
            </button>
          </div>
        </div>


        {/* Right Content Area */}
        <div className="flex-1 h-[700px] w-full flex flex-col bg-transparent overflow-hidden">

          {/* Top Navigation */}


          {/* Hero Content */}
          <div style={{ transform: 'translateX(100px)' }} className="relative  flex-1 bg-slate-900 lg:rounded-tl-[4rem] overflow-hidden  mx-0 lg:ml-0">
            <img
              src="assets/images/umrah-consultant.png"
              alt="Hero Background"
              className="absolute  w-full h-full object-cover opacity-75"
            />
            <div className="absolute  bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div> {/* Darker gradient for text contrast */}

            <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-20 py-20 max-w-4xl">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8 ">
                Join <span className="text-[#24B3BA]">Saudi Based</span><br />
                MultiNational <span className="text-[#24B3BA]">Umrah</span><br />
                <span className="text-[#24B3BA]">Consultant</span> Network
              </h1>

              <div>
                <button
                  onClick={onApply}
                  className="bg-[#1E3A6C] hover:bg-[#334155] border border-[#24B3BA] text-white font-bold text-lg px-10 py-4 rounded transition-all  hover:shadow-[#24B3BA]/20"
                >
                  Register as a Consultant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Section */}
      <section className="py-32 " style={{ backgroundImage: "url('/assets/images/image2.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="container mx-auto px-6 text-center w-11/12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E3A6D]">Choose Rewarding Career</h2>
          <p className="text-slate-600 mb-12 max-w-xl mx-auto">Get started on your path to success with our structured program.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200  hover:shadow-lg transition-shadow text-left">
              <div className="mb-6 h-48 bg-slate-200 rounded-lg overflow-hidden">
                <img src="assets/images/umrah-consultant-1.jpg" className="w-full h-full object-cover" alt="Consultant" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E3A6D]">Start Your Journey as a Certified Consultant</h3>
              <p className="text-slate-600 mb-6">Build a purposeful career with flexibility and trust. Earn competitive commissions.</p>
              <button className="text-cyan-600 font-bold border-b-2 border-cyan-600 pb-1 hover:text-cyan-700 transition-colors">Watch Now</button>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200  hover:shadow-lg transition-shadow text-left">
              <div className="mb-6 h-48 bg-slate-200 rounded-lg overflow-hidden">
                <img src="assets/images/Umrah-Consultant-22.jpg" className="w-full h-full object-cover" alt="Consultant" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E3A6D]">Become a Professional Umrah Consultant</h3>
              <p className="text-slate-600 mb-6">Join our 2nd Batch | Earn $3,000 - $4,000 / Month. Get the training you need.</p>
              <button className="text-cyan-600 font-bold border-b-2 border-cyan-600 pb-1 hover:text-cyan-700 transition-colors">Watch Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto w-11/12 px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <span className="text-cyan-600 font-bold uppercase text-sm tracking-widest">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-[#1E3A6D]">Your Pathway to Purpose & Profession</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Join our exclusive Umrah Consultant program designed for individuals with sales confidence, community mindset, and tech knowledge.
                We're building a global network of dedicated Umrah consultants to serve pilgrims with excellence and integrity.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-cyan-600 text-xs"></i>
                  </div>
                  <span className="text-slate-700">Aspiring Entrepreneurs looking to establish their career in Umrah services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-cyan-600 text-xs"></i>
                  </div>
                  <span className="text-slate-700">Islamic Leaders & Educators seeking to guide pilgrims.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-cyan-600 text-xs"></i>
                  </div>
                  <span className="text-slate-700">Graduates who want to affiliate with a strong brand.</span>
                </li>
              </ul>
              <button onClick={onApply} className="bg-[#1E3A6D] text-white px-8 py-3 rounded-md font-bold hover:bg-slate-800 transition-colors ">Apply Now</button>
            </div>
            <div className="md:w-1/2 relative group">
              <div className="relative rounded-2xl overflow-hidden ">
                <img src="assets/images/image4.jpg" alt="Consultant Video Placeholder" className="w-full" />
                <div className="absolute inset-0 flex items-center justify-center ">
                  <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center  hover:scale-110 transition-transform">
                    <i className="fa-solid fa-play text-cyan-600 text-3xl ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto w-11/12 px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-bold uppercase text-sm tracking-widest">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#1E3A6D]">How it Works</h2>
          </div>
          <div className="bg-white flex flex-wrap justify-between gap-6 mb-16 px-16">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${idx === activeStep ? 'bg-slate-100 scale-110 border border-cyan-200' : 'opacity-60 hover:opacity-100'}`}
                onClick={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveStep(idx)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${idx === activeStep ? 'bg-cyan-500 text-white ' : 'bg-slate-200 text-slate-500'}`}>
                  <img src={`assets/svgs/${step.split(' ')[0].toLowerCase()}.svg`} alt="" />
                </div>
                <span className="font-bold text-sm">{step}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 gap-12 items-center border border-slate-100 ">
            <div className=" flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="w-10 h-10 bg-[#1E3A6D] text-white rounded-full flex items-center justify-center font-bold mb-6">{activeStep + 1}</div>
                <h3 className="text-3xl font-bold mb-6 text-[#1E3A6D]">{stepDetails[activeStep].title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">{stepDetails[activeStep].desc}</p>

              </div>
              <div className="md:w-1/2">
                <img src={stepDetails[activeStep].imgSrc} alt={`${steps[activeStep]} Phase`} className="rounded-2xl  w-full" />
              </div>

            </div>

            <div className="flex gap-4 py-4 justify-between">
              <button
                onClick={prev}
                disabled={activeStep === 0}
                className={`px-6 py-2 rounded-md font-bold flex items-center gap-2 border ${activeStep === 0 ? 'bg-white border-slate-200 text-[#1E3A6D] cursor-not-allowed' : 'bg-white border-slate-200 text-slate-700 hover:shadow-sm'}`}>
                <i className="fa-solid fa-arrow-left"></i> Previous
              </button>
              <button
                onClick={next}
                disabled={activeStep === steps.length - 1}
                className={`px-8 py-2 rounded-md font-bold flex items-center gap-2 ${activeStep === steps.length - 1 ? 'bg-[#1E3A6D] text-white cursor-not-allowed' : 'bg-[#1E3A6D] text-white hover:bg-slate-800 transition-colors'}`}>
                Next <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation & Growth */}
      <section className="py-20 ">
        <div className="container mx-auto w-11/12 px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1E3A6D]">Compensation & Growth</h2>
            <p className="text-slate-600">Build a rewarding career with clear advancement opportunities.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Commission Based", icon: "fa-chart-line", desc: "Start with a base commission on each confirmed sale, providing you with immediate income." },
              { title: "Performance Tiers", icon: "fa-rocket", desc: "Advance through our tiered system and enjoy upgraded commissions and exclusive recognition." },
              { title: "Awards & Incentives", icon: "fa-award", desc: "Excellence stands out. We acknowledge those who consistently perform at the highest level." },
              { title: "Reinvestment Options", icon: "fa-arrows-rotate", desc: "Start with a base commission on each confirmed sale, providing you with immediate income as you build." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100  hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <i className={`fa-solid ${item.icon} text-cyan-600 text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A6D]">{item.title}</h3>
                </div>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Blogs Section */}
      <section className="py-20 bg-white">
        <div className="container w-11/12 mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-bold uppercase text-sm tracking-widest">Our News</span>

            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">Read Our Latest News Blogs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* Main Feature */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl">
              <img
                src="assets/images/image-4.png"
                alt="Mecca View"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">New Agents find attending TTAND Conference Invaluable</h3>
              </div>
            </div>
            {/* Sidebar Items */}
            <div className="flex flex-col gap-6">
              <div className="relative group overflow-hidden rounded-2xl flex-1 h-[287px]">
                <img
                  src="assets/images/image-5.png"
                  alt="Mosque"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h4 className="font-bold">On Location: "Inspiring": TTAND conference wraps up in Mexico with awards; Celebrity to host next year</h4>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl  flex-1 h-[287px]">
                <img
                  src="assets/images/image-6.png"
                  alt="Umrah"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h4 className="font-bold">On Location: "Inspiring": TTAND conference wraps up in Mexico with awards; Celebrity to host next year</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={onApply}
              className="bg-[#1E3A6C] hover:bg-[#334155]  text-white font-bold text-lg px-10 py-4 rounded transition-all  hover:shadow-[#24B3BA]/20"
            >
              Read More
            </button>
          </div>

        </div>
      </section>
      {/* Accepting Applications Section */}
      <section className="py-20 bg-slate-50">
        <div className="container w-11/12 mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">Now Accepting Applications</h2>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden p-8 md:p-12 flex flex-col lg:flex-row gap-12 border border-slate-100">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-[#0A2540] mb-8">Qualification Requirements</h3>
              <ul className="space-y-6 mb-12">
                {[
                  "Must have performed Umrah at least once",
                  "Must have a sales/service or public-facing background",
                  "Tech-friendly and ready to learn",
                  "Entrepreneurial mindset with a community-serving spirit"
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-[#0A2540] rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-check text-white text-[10px]"></i>
                    </div>
                    <span className="text-slate-700 font-medium">{req}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 text-[#0A2540] font-bold text-sm">
                  <i className="fa-regular fa-calendar-days text-indigo-500"></i>
                  30th May
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 text-[#0A2540] font-bold text-sm">
                  <i className="fa-regular fa-clock text-indigo-500"></i>
                  Limited Seats
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 text-[#0A2540] font-bold text-sm">
                  <i className="fa-solid fa-location-dot text-indigo-500"></i>
                  Selected Regions
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="assets/images/image-2.png"
                alt="Mecca Pilgrims"
                className="w-full h-full object-cover rounded-xl  min-h-[300px]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="text-cyan-600 font-bold uppercase text-sm tracking-widest">Consultant Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-16 text-[#1E3A6D]">Join Our Community of Success</h2>
          <div className="max-w-4xl mx-auto bg-slate-50 p-12 rounded-[3rem]  border border-slate-100 relative">
            <i className="fa-solid fa-quote-left absolute top-8 left-8 text-6xl text-cyan-100"></i>
            <img src="https://picsum.photos/seed/avatar1/150/150" alt="Sajida Abbasi" className="w-32 h-32 rounded-full border-4 border-white  mx-auto -mt-24 mb-6" />
            <p className="text-xl italic text-slate-700 leading-relaxed mb-8">
              "As a woman entrepreneur, this program gave me confidence, community, and clients. The support system is incredible, and I've been able to build a thriving business while helping families experience the spiritual journey of Umrah. The training prepared me for every aspect of this role."
            </p>
            <div className="flex justify-center text-cyan-500 mb-2">
              {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star mx-1"></i>)}
            </div>
            <h4 className="font-bold text-xl text-[#1E3A6D]">Sajida Abbasi</h4>
            <span className="text-slate-500">Sales Agent</span>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-100 rounded-full blur-[100px] -translate-x-1/2 opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#1E3A6D]/5 rounded-full blur-[120px] translate-x-1/3 opacity-30"></div>
      </section>
      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 w-11/12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {[
              { q: "What benefits will I get by working with Umrah Consultant?", a: "You get access to a Saudi-based multinational network, competitive commissions, comprehensive training, and the opportunity to serve pilgrims with high standards of professionalism." },
              { q: "What is the process after I register as a consultant?", a: "Once registered, your application undergoes review. If selected, you'll enter the training phase, followed by certification and official onboarding into our support systems." },
              { q: "Is there any registration fee to become a consultant?", a: "Details regarding fees are shared during the final selection interview. We prioritize value-driven partnerships." },
              { q: "How will I track my referrals and earnings?", a: "We provide a dedicated lead management dashboard where you can monitor your referrals, conversion statuses, and earned commissions in real-time." },
              { q: "Can I refer people from any country?", a: "Yes, our network is multinational. You can refer pilgrims from any country supported by our Saudi partners' visa and logistics services." },
              { q: "How does the commission structure work?", a: "We use a tiered commission structure. You earn a base commission per booking, which increases as you reach higher performance tiers." },
              { q: "Will I get any training or support after joining?", a: "Absolutely. We provide initial training on products and sales techniques, plus ongoing support through a dedicated community of experienced consultants." },
              { q: "Can I promote packages online or offline?", a: "Yes, you are encouraged to use both online digital marketing and offline community outreach to build your client base." }
            ].map((item, idx) => (
              <FAQItem
                key={idx}
                index={idx + 1}
                question={item.q}
                answer={item.a}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-cyan-500 relative">
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Ready to Begin your Journey?</h2>
          <button
            onClick={onApply}
            className="bg-white text-cyan-600 hover:bg-slate-100 transition-all font-bold px-12 py-4 rounded-md text-xl "
          >
            Submit your Application
          </button>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 Q 25 20 50 100 T 100 100" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A6D] py-12 text-white border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-kaaba text-white text-xl"></i>
              </div>
              <span className="font-bold text-xl tracking-tight uppercase">Umrah Companions</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-400 transition-colors text-xl"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="hover:text-cyan-400 transition-colors text-xl"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-cyan-400 transition-colors text-xl"><i className="fa-brands fa-linkedin"></i></a>
              <a href="#" className="hover:text-cyan-400 transition-colors text-xl"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </div>
          <div className="text-center text-[#1E3A6D] text-sm">
            &copy; 2025 Umrah Companions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
