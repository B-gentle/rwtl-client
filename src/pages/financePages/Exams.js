import React from 'react'
import { Link } from 'react-router-dom'
import BackArrowHeading from '../../components/BackArrowHeading'

const Exams = () => {
  return (
    <div className='buy-airtime h-full'>
      <BackArrowHeading title="Exam Payment" link="more" />
      <h2 className='mb-[1.5rem] text-[#33a533]'>Select Examination Type</h2>
      <section className='flex flex-col gap-[1.5rem] items-center'>
        <span><Link to='/waec' className='text-[#33aa33] no-underline font-[600]'>WAEC e-PIN</Link></span>
        <span><Link to='/jamb' className='text-[#33aa33] no-underline font-[600]'>JAMB e-PIN</Link></span>
      </section>
    </div>
  )
}

export default Exams