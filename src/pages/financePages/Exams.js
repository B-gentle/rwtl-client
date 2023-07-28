import React from 'react'
import { Link } from 'react-router-dom'
import BackArrowHeading from '../../components/BackArrowHeading'

const Exams = () => {
  return (
    <div className='buy-airtime'>
      <BackArrowHeading title="Exam Payment" link="more" />
      <h2 className='mb-[1.5rem] text-[#cba762]'>Select Examination Type</h2>
      <section className='flex flex-col gap-[1.5rem] items-center'>
        <span><Link to='/waec' className='text-[#7c7c5c] no-underline font-[600]'>WAEC e-PIN</Link></span>
        <span><Link to='/jamb' className='text-[#7c7c5c] no-underline font-[600]'>JAMB e-PIN</Link></span>
      </section>
    </div>
  )
}

export default Exams